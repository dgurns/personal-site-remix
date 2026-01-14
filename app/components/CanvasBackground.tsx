import { useEffect, useRef, useCallback } from "react";
import {
  constellationNodes,
  type ConstellationNode,
  type NodeCategory,
} from "~/data/constellation";

interface NodeState extends ConstellationNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  phase: number; // for subtle pulsing
  depth: number; // for parallax-like depth
  imageLoaded: boolean;
  imageElement: HTMLImageElement | null;
}

const NODE_BASE_SIZE = 55;
const NODE_SIZE_VARIANCE = 15;
const EDGE_BASE_OPACITY = 0.08;
const NODE_BASE_OPACITY = 0.3;
const DAMPING = 0.92;
const SPRING_STRENGTH = 0.015;
const MAX_VELOCITY = 3;
const MOUSE_ATTRACTION_STRENGTH = 0.15;
const MOUSE_ATTRACTION_RADIUS = 200;
const MOUSE_ATTRACTION_FACTOR = 0.45; // How far toward mouse (0-1), lower = subtler pull
const PULSE_SPEED = 0.01;
const PULSE_AMOUNT = 0.04;
const GLOW_BLUR = 20;

// Content exclusion zone (centered rectangle where nodes should avoid)
const EXCLUSION_ZONE_WIDTH = 550; // desktop width
const EXCLUSION_ZONE_HEIGHT = 550; // covers profile to social links
const EXCLUSION_ZONE_WIDTH_MOBILE = 350;
const EXCLUSION_ZONE_HEIGHT_MOBILE = 500;
const EXCLUSION_BUFFER = 20; // soft buffer around zone
const EXCLUSION_REPULSION_STRENGTH = 0.03;
const MIN_NODE_SPACING = 120; // minimum distance between nodes on init
const SPACING_ATTEMPTS = 10; // attempts to find a well-spaced position

// Category colors with more saturation for glow effects
const categoryGlowColors: Record<NodeCategory, string> = {
  movie: "rgba(96, 165, 250, 0.3)",
  book: "rgba(74, 222, 128, 0.3)",
  album: "rgba(192, 132, 252, 0.3)",
  place: "rgba(251, 191, 36, 0.3)",
};

const categoryEdgeColors: Record<NodeCategory, string> = {
  movie: "rgba(96, 165, 250, 0.12)",
  book: "rgba(74, 222, 128, 0.12)",
  album: "rgba(192, 132, 252, 0.12)",
  place: "rgba(251, 191, 36, 0.12)",
};

export function CanvasBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<NodeState[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const isMobileRef = useRef(false);
  const reducedMotionRef = useRef(false);

  // Helper to check if point is inside exclusion zone
  const isInExclusionZone = useCallback(
    (
      x: number,
      y: number,
      centerX: number,
      centerY: number,
      zoneWidth: number,
      zoneHeight: number
    ): boolean => {
      const halfW = zoneWidth / 2 + EXCLUSION_BUFFER;
      const halfH = zoneHeight / 2 + EXCLUSION_BUFFER;
      return (
        x > centerX - halfW &&
        x < centerX + halfW &&
        y > centerY - halfH &&
        y < centerY + halfH
      );
    },
    []
  );

  // Generate position outside exclusion zone
  const generatePositionOutsideZone = useCallback(
    (
      width: number,
      height: number,
      centerX: number,
      centerY: number,
      zoneWidth: number,
      zoneHeight: number,
      padding: number
    ): { x: number; y: number } => {
      const halfW = zoneWidth / 2 + EXCLUSION_BUFFER;
      const halfH = zoneHeight / 2 + EXCLUSION_BUFFER;

      // Define the 4 valid regions (left, right, top, bottom of exclusion zone)
      const regions = [
        // Left region
        {
          minX: padding,
          maxX: centerX - halfW,
          minY: padding,
          maxY: height - padding,
        },
        // Right region
        {
          minX: centerX + halfW,
          maxX: width - padding,
          minY: padding,
          maxY: height - padding,
        },
        // Top region (between left and right)
        {
          minX: centerX - halfW,
          maxX: centerX + halfW,
          minY: padding,
          maxY: centerY - halfH,
        },
        // Bottom region (between left and right)
        {
          minX: centerX - halfW,
          maxX: centerX + halfW,
          minY: centerY + halfH,
          maxY: height - padding,
        },
      ].filter((r) => r.maxX > r.minX && r.maxY > r.minY);

      // Pick a random valid region weighted by area
      const areas = regions.map((r) => (r.maxX - r.minX) * (r.maxY - r.minY));
      const totalArea = areas.reduce((sum, a) => sum + a, 0);
      let rand = Math.random() * totalArea;

      let selectedRegion = regions[0];
      for (let i = 0; i < regions.length; i++) {
        rand -= areas[i];
        if (rand <= 0) {
          selectedRegion = regions[i];
          break;
        }
      }

      return {
        x:
          selectedRegion.minX +
          Math.random() * (selectedRegion.maxX - selectedRegion.minX),
        y:
          selectedRegion.minY +
          Math.random() * (selectedRegion.maxY - selectedRegion.minY),
      };
    },
    []
  );

  // Initialize nodes with random positions outside exclusion zone, spaced apart
  const initializeNodes = useCallback(
    (width: number, height: number, isMobile: boolean) => {
      const nodesToUse = isMobile
        ? constellationNodes.slice(0, 10)
        : constellationNodes;

      const padding = NODE_BASE_SIZE * 2;
      const centerX = width / 2;
      const centerY = height / 2;
      const zoneWidth = isMobile
        ? EXCLUSION_ZONE_WIDTH_MOBILE
        : EXCLUSION_ZONE_WIDTH;
      const zoneHeight = isMobile
        ? EXCLUSION_ZONE_HEIGHT_MOBILE
        : EXCLUSION_ZONE_HEIGHT;

      const placedPositions: { x: number; y: number }[] = [];

      nodesRef.current = nodesToUse.map((node, index) => {
        // Try multiple positions and pick the one with best spacing
        let bestPos = { x: 0, y: 0 };
        let bestMinDist = -1;

        for (let attempt = 0; attempt < SPACING_ATTEMPTS; attempt++) {
          const candidate = generatePositionOutsideZone(
            width,
            height,
            centerX,
            centerY,
            zoneWidth,
            zoneHeight,
            padding
          );

          // Find minimum distance to any placed node
          let minDist = Infinity;
          for (const pos of placedPositions) {
            const dx = candidate.x - pos.x;
            const dy = candidate.y - pos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            minDist = Math.min(minDist, dist);
          }

          // First node or this position is better spaced
          if (placedPositions.length === 0 || minDist > bestMinDist) {
            bestMinDist = minDist;
            bestPos = candidate;

            // Good enough spacing, stop early
            if (minDist >= MIN_NODE_SPACING) break;
          }
        }

        placedPositions.push(bestPos);
        const { x, y } = bestPos;

        const size =
          NODE_BASE_SIZE + (Math.random() - 0.5) * NODE_SIZE_VARIANCE * 2;
        const depth = 0.5 + Math.random() * 0.5; // 0.5 to 1.0

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = node.image;

        const nodeState: NodeState = {
          ...node,
          x,
          y,
          vx: 0,
          vy: 0,
          baseX: x,
          baseY: y,
          size,
          phase: (index / nodesToUse.length) * Math.PI * 2, // stagger phases
          depth,
          imageLoaded: false,
          imageElement: img,
        };

        img.onload = () => {
          nodeState.imageLoaded = true;
        };

        return nodeState;
      });
    },
    [generatePositionOutsideZone]
  );

  // Find the nearest node to the mouse
  const findNearestNode = useCallback(
    (mouseX: number, mouseY: number): NodeState | null => {
      const nodes = nodesRef.current;
      let nearest: NodeState | null = null;
      let nearestDist = Infinity;

      nodes.forEach((node) => {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < nearestDist && dist < MOUSE_ATTRACTION_RADIUS) {
          nearestDist = dist;
          nearest = node;
        }
      });

      return nearest;
    },
    []
  );

  // Update physics
  const updatePhysics = useCallback(
    (width: number, height: number, isMobile: boolean) => {
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const padding = NODE_BASE_SIZE;

      // Exclusion zone parameters
      const centerX = width / 2;
      const centerY = height / 2;
      const zoneWidth = isMobile
        ? EXCLUSION_ZONE_WIDTH_MOBILE
        : EXCLUSION_ZONE_WIDTH;
      const zoneHeight = isMobile
        ? EXCLUSION_ZONE_HEIGHT_MOBILE
        : EXCLUSION_ZONE_HEIGHT;
      const halfW = zoneWidth / 2 + EXCLUSION_BUFFER;
      const halfH = zoneHeight / 2 + EXCLUSION_BUFFER;

      // Find the nearest node to attract to mouse
      const nearestNode =
        !isMobile && mouse.x > 0 && mouse.y > 0
          ? findNearestNode(mouse.x, mouse.y)
          : null;

      nodes.forEach((node) => {
        // If this is the nearest node, attract it toward mouse (but not all the way)
        if (node === nearestNode && mouse.x > 0 && mouse.y > 0) {
          // Target is partway between base position and mouse
          const targetX =
            node.baseX + (mouse.x - node.baseX) * MOUSE_ATTRACTION_FACTOR;
          const targetY =
            node.baseY + (mouse.y - node.baseY) * MOUSE_ATTRACTION_FACTOR;

          const dx = targetX - node.x;
          const dy = targetY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 2) {
            node.vx += (dx / dist) * MOUSE_ATTRACTION_STRENGTH * (dist / 30);
            node.vy += (dy / dist) * MOUSE_ATTRACTION_STRENGTH * (dist / 30);
          }
        } else {
          // Spring back to base position
          const dxBase = node.baseX - node.x;
          const dyBase = node.baseY - node.y;
          node.vx += dxBase * SPRING_STRENGTH;
          node.vy += dyBase * SPRING_STRENGTH;
        }

        // Exclusion zone repulsion - push nodes away from center content area
        const inZoneX = node.x > centerX - halfW && node.x < centerX + halfW;
        const inZoneY = node.y > centerY - halfH && node.y < centerY + halfH;

        if (inZoneX && inZoneY) {
          // Calculate which edge is closest and push toward it
          const distToLeft = node.x - (centerX - halfW);
          const distToRight = centerX + halfW - node.x;
          const distToTop = node.y - (centerY - halfH);
          const distToBottom = centerY + halfH - node.y;

          const minHorizontal = Math.min(distToLeft, distToRight);
          const minVertical = Math.min(distToTop, distToBottom);

          if (minHorizontal < minVertical) {
            // Push horizontally
            if (distToLeft < distToRight) {
              node.vx -=
                EXCLUSION_REPULSION_STRENGTH *
                (1 + (halfW - distToLeft) / halfW);
            } else {
              node.vx +=
                EXCLUSION_REPULSION_STRENGTH *
                (1 + (halfW - distToRight) / halfW);
            }
          } else {
            // Push vertically
            if (distToTop < distToBottom) {
              node.vy -=
                EXCLUSION_REPULSION_STRENGTH *
                (1 + (halfH - distToTop) / halfH);
            } else {
              node.vy +=
                EXCLUSION_REPULSION_STRENGTH *
                (1 + (halfH - distToBottom) / halfH);
            }
          }
        }

        // Very subtle random drift
        node.vx += (Math.random() - 0.5) * 0.01;
        node.vy += (Math.random() - 0.5) * 0.01;

        // Apply damping
        node.vx *= DAMPING;
        node.vy *= DAMPING;

        // Clamp velocity
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > MAX_VELOCITY) {
          node.vx = (node.vx / speed) * MAX_VELOCITY;
          node.vy = (node.vy / speed) * MAX_VELOCITY;
        }

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Soft boundary constraints
        if (node.x < padding) {
          node.x = padding;
          node.vx *= -0.3;
        }
        if (node.x > width - padding) {
          node.x = width - padding;
          node.vx *= -0.3;
        }
        if (node.y < padding) {
          node.y = padding;
          node.vy *= -0.3;
        }
        if (node.y > height - padding) {
          node.y = height - padding;
          node.vy *= -0.3;
        }
      });
    },
    [findNearestNode]
  );

  // Draw curved edges between nodes of the same category
  const drawEdges = useCallback(
    (ctx: CanvasRenderingContext2D, nodes: NodeState[], time: number) => {
      const nodesByCategory: Record<NodeCategory, NodeState[]> = {
        movie: [],
        book: [],
        album: [],
        place: [],
      };

      nodes.forEach((node) => {
        nodesByCategory[node.category].push(node);
      });

      Object.entries(nodesByCategory).forEach(([category, categoryNodes]) => {
        if (categoryNodes.length < 2) return;

        const baseColor = categoryEdgeColors[category as NodeCategory];

        // Draw curved connections
        for (let i = 0; i < categoryNodes.length; i++) {
          for (let j = i + 1; j < categoryNodes.length; j++) {
            const nodeA = categoryNodes[i];
            const nodeB = categoryNodes[j];

            const dx = nodeB.x - nodeA.x;
            const dy = nodeB.y - nodeA.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Only draw if nodes are reasonably close
            if (dist > 600) continue;

            // Fade based on distance
            const distanceFade = Math.max(0, 1 - dist / 600);

            // Create gradient along the edge
            const gradient = ctx.createLinearGradient(
              nodeA.x,
              nodeA.y,
              nodeB.x,
              nodeB.y
            );
            const alpha = EDGE_BASE_OPACITY * distanceFade;
            gradient.addColorStop(
              0,
              baseColor.replace("0.12", String(alpha * 0.5))
            );
            gradient.addColorStop(
              0.5,
              baseColor.replace("0.12", String(alpha))
            );
            gradient.addColorStop(
              1,
              baseColor.replace("0.12", String(alpha * 0.5))
            );

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1 + distanceFade;

            // Draw a subtle curve
            const midX = (nodeA.x + nodeB.x) / 2;
            const midY = (nodeA.y + nodeB.y) / 2;
            const perpX = -dy / dist;
            const perpY = dx / dist;
            const curveAmount = Math.sin(time * 0.3 + i + j) * 2;

            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.quadraticCurveTo(
              midX + perpX * curveAmount,
              midY + perpY * curveAmount,
              nodeB.x,
              nodeB.y
            );
            ctx.stroke();
          }
        }
      });
    },
    []
  );

  // Helper to draw rounded rectangle path
  const roundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  // Draw a node with glow effect
  const drawNode = useCallback(
    (ctx: CanvasRenderingContext2D, node: NodeState, time: number) => {
      // Calculate pulse
      const pulse = Math.sin(time * PULSE_SPEED + node.phase) * PULSE_AMOUNT;
      const currentSize = node.size * (1 + pulse);
      const x = node.x - currentSize / 2;
      const y = node.y - currentSize / 2;
      const radius = 10;

      // Calculate opacity based on depth
      const depthOpacity = NODE_BASE_OPACITY * node.depth;

      // Draw glow
      ctx.save();
      ctx.globalAlpha = depthOpacity * 0.4;
      ctx.shadowColor = categoryGlowColors[node.category];
      ctx.shadowBlur = GLOW_BLUR;
      ctx.fillStyle = categoryGlowColors[node.category];

      roundedRect(
        ctx,
        x - 4,
        y - 4,
        currentSize + 8,
        currentSize + 8,
        radius + 2
      );
      ctx.fill();
      ctx.restore();

      // Draw the image
      ctx.save();
      ctx.globalAlpha = depthOpacity;

      // Create rounded rectangle path
      roundedRect(ctx, x, y, currentSize, currentSize, radius);

      if (node.imageLoaded && node.imageElement) {
        ctx.clip();
        ctx.drawImage(node.imageElement, x, y, currentSize, currentSize);
      } else {
        // Fallback
        ctx.fillStyle = "rgba(30, 41, 59, 0.8)";
        ctx.fill();
      }

      // Subtle border
      ctx.strokeStyle = `rgba(255, 255, 255, ${depthOpacity * 0.1})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    },
    []
  );

  // Main render loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);
    const isMobile = isMobileRef.current;
    const reducedMotion = reducedMotionRef.current;

    // Update time
    timeRef.current += 1;
    const time = timeRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update physics (skip if reduced motion)
    if (!reducedMotion) {
      updatePhysics(width, height, isMobile);
    }

    const nodes = nodesRef.current;

    // Sort by depth for proper layering
    const sortedNodes = [...nodes].sort((a, b) => a.depth - b.depth);

    // Draw edges first
    drawEdges(ctx, sortedNodes, time);

    // Draw nodes
    sortedNodes.forEach((node) => {
      drawNode(ctx, node, time);
    });

    animationRef.current = requestAnimationFrame(render);
  }, [updatePhysics, drawEdges, drawNode]);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    isMobileRef.current = width < 768;

    // Reinitialize nodes on first load or significant resize
    if (nodesRef.current.length === 0) {
      initializeNodes(width, height, isMobileRef.current);
    } else {
      // Update base positions to keep nodes in bounds
      const padding = NODE_BASE_SIZE * 2;
      nodesRef.current.forEach((node) => {
        node.baseX = Math.min(Math.max(node.baseX, padding), width - padding);
        node.baseY = Math.min(Math.max(node.baseY, padding), height - padding);
      });
    }
  }, [initializeNodes]);

  // Handle mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  useEffect(() => {
    // Check for reduced motion preference
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Start animation loop
    animationRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [handleResize, handleMouseMove, handleMouseLeave, render]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
