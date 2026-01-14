export type NodeCategory = "movie" | "book" | "album" | "place";

export interface ConstellationNode {
  id: string;
  label: string;
  category: NodeCategory;
  image: string;
}

export const constellationNodes: ConstellationNode[] = [
  // Movies/TV
  {
    id: "minority-report",
    label: "Minority Report",
    category: "movie",
    image: "/constellation/minority-report.jpg",
  },
  {
    id: "children-of-men",
    label: "Children of Men",
    category: "movie",
    image: "/constellation/children-of-men.jpg",
  },
  {
    id: "grizzly-man",
    label: "Grizzly Man",
    category: "movie",
    image: "/constellation/grizzly-man.jpg",
  },
  {
    id: "the-wire",
    label: "The Wire",
    category: "movie",
    image: "/constellation/the-wire.jpg",
  },
  {
    id: "mad-men",
    label: "Mad Men",
    category: "movie",
    image: "/constellation/mad-men.jpg",
  },

  // Books
  {
    id: "zen-motorcycle",
    label: "Zen and the Art of Motorcycle Maintenance",
    category: "book",
    image: "/constellation/zen-motorcycle.jpg",
  },
  {
    id: "confederacy-dunces",
    label: "A Confederacy of Dunces",
    category: "book",
    image: "/constellation/confederacy-dunces.jpg",
  },
  {
    id: "into-thin-air",
    label: "Into Thin Air",
    category: "book",
    image: "/constellation/into-thin-air.jpg",
  },
  {
    id: "enders-game",
    label: "Ender's Game",
    category: "book",
    image: "/constellation/enders-game.jpg",
  },

  // Albums
  {
    id: "22-a-million",
    label: "22, A Million",
    category: "album",
    image: "/constellation/22-a-million.jpg",
  },
  {
    id: "banks-of-shannon",
    label: "Banks of the Shannon",
    category: "album",
    image: "/constellation/banks-of-shannon.jpg",
  },
  {
    id: "iron-man",
    label: "The Iron Man",
    category: "album",
    image: "/constellation/iron-man.jpg",
  },
  {
    id: "branch-line",
    label: "The Branch Line",
    category: "album",
    image: "/constellation/branch-line.jpg",
  },
  {
    id: "random-access-memories",
    label: "Random Access Memories",
    category: "album",
    image: "/constellation/random-access-memories.jpg",
  },

  // Places
  {
    id: "rhinebeck",
    label: "Rhinebeck, NY",
    category: "place",
    image: "/constellation/rhinebeck.jpg",
  },
  {
    id: "nyc",
    label: "New York City",
    category: "place",
    image: "/constellation/nyc.jpg",
  },
  {
    id: "boston",
    label: "Boston",
    category: "place",
    image: "/constellation/boston.jpg",
  },
  {
    id: "bray",
    label: "Bray, Co. Wicklow",
    category: "place",
    image: "/constellation/bray.jpg",
  },
];

// Category colors for edges (matching site theme)
export const categoryColors: Record<NodeCategory, string> = {
  movie: "rgba(96, 165, 250, 0.15)", // blue-400
  book: "rgba(74, 222, 128, 0.15)", // green-400
  album: "rgba(192, 132, 252, 0.15)", // purple-400
  place: "rgba(251, 191, 36, 0.15)", // amber-400
};
