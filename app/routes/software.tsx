import { type MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = () => [
	{
		title: 'Dan Gurney - Software',
	},
];

export default function Software() {
	return (
		<div>
			<h1 className="mb-6">Software</h1>
			<p>
				I'm a Staff Software Engineer at{' '}
				<a href="https://inscribe.ai" target="_blank" rel="noreferrer">
					Inscribe AI ↗
				</a>
				, building LLM-powered AI agents to automate manual tasks and help catch
				financial fraud. Inscribe's customers include some of the biggest names
				in fintech like Ramp and Plaid.
			</p>
			<p>
				Before that, I built a new AI product line at PredictionHealth, worked
				at CarTrawler and UBiqube, ran a freelance consultancy, and founded a
				startup called Concert Window.
			</p>
			<p>
				I love open source and enjoy working on side projects when time permits.
			</p>
			<p>
				I often use TypeScript, Go, Python, React, Node, REST, GraphQL, CSS,
				Tailwind, NextJS, Remix, Figma, React Testing Library, Playwright,
				Postgres, MySQL, all manner of AWS and GCP services, OpenAI, Cloudflare,
				Vercel, Planetscale, Docker, Kubernetes, and CI/CD.
			</p>
			<p>
				Have a question or idea? Please feel free to{' '}
				<a href="mailto:dan@dangurney.net">get in touch</a>.
			</p>
			<p>
				<a href="/files/Dan_Gurney_CV.pdf" download>
					Download my CV
				</a>
			</p>

			<h2 className="mt-8">Recent Projects</h2>
			<ul className="mt-6 list-none space-y-4 md:list-disc">
				<li>
					<a href="https://inscribe.ai" target="_blank" rel="noreferrer">
						Inscribe AI ↗
					</a>{' '}
					<span className="text-gray-400">(Staff Software Engineer, AI Agents)</span>
					<div>
						Lately I've built a generative AI team which is creating a new product line for the company. Leading a talented group of fullstack and ML engineers, I've been
						implementing scalable processes including customer feedback loops,
						agile planning, LLM-agnostic system architecture, automated evals,
						and continuous product delivery.
					</div>
				</li>
				<li>
					<a
						href="https://predictionhealth.com"
						target="_blank"
						rel="noreferrer"
					>
						PredictionHealth ↗
					</a>{' '}
					<span className="text-gray-400">(Engineering Team Lead)</span>
					<div>
						I helped PredictionHealth build a new product line, now doing
						millions in revenue, which applies AI to medical care to improve
						outcomes and efficiency. I worked with ML models and LLMs,
						rearchitected legacy React, Go, and Python apps, set up scalable dev
						processes with automated CI/CD, and mentored engineers, among many
						other things. Some tools I used are React, NextJS, TypeScript,
						Playwright, Go, Python, gRPC, Docker, AWS Lambda, BigQuery,
						Kubernetes, Vercel, and GitHub Actions.
					</div>
				</li>
			</ul>

			<h2 className="mt-8">Testimonials</h2>
			<ul className="mt-6 list-none space-y-4">
				<li>
					<div>
						Dan is an extraordinary leader and engineer who has profoundly shaped how I think about building technology. His bias for action and ability to energize teams is unmatched - he doesn't just plan, he executes, and brings everyone along with him. What makes Dan special is his combination of technical sophistication and collaborative spirit. He's always at the cutting edge of technology while maintaining an unwavering focus on shipping real solutions. I've seen firsthand how his optimism about technology, matched with incredible tenacity, turns ambitious visions into reality. Dan's leadership raises the bar for everyone around him, creating an environment where teams excel and deliver their best work. Any company would be fortunate to have his drive, technical acumen, and ability to consistently turn challenges into opportunities.
					</div>
					<span className="text-gray-400">
						- Ray Fitzgerald, Senior Product Engineer at Inscribe AI
					</span>
				</li>
				<li>
					<div>
						"Dan has been wonderful to work with and I would recommend him to
						anyone. He has been a fantastic manager and mentor, and helped me
						and our team grow as engineers. He has helped keep our codebase
						clean, well organized, and performant. He makes insightful comments
						during project planning, and always delivers on time. He is
						knowledgeable about all of the best practices for both frontend and
						backend code. He has an excellent eye for UI design, and has made
						some of the best interfaces I've ever used."
					</div>
					<span className="text-gray-400">
						- Jack Kelly, Software Engineer at PredictionHealth
					</span>
				</li>
				<li>
					<div>
						"Dan Gurney has the ability to see the big picture and the skills to
						get there. Dan uses his expertise to build quality features at
						lightning speed... It's apparent that he values a positive company
						culture. He takes the time to get to know his team members, which
						results in a cohesive team that is able to accomplish complex
						projects. As both a team member and leader, Dan has my highest
						recommendation."
					</div>
					<span className="text-gray-400">
						- Terry Gleckler, Operations Manager at PredictionHealth
					</span>
				</li>
				<li>
					<div>
						"Dan is a fantastic coder and teacher. He plans things meticulously.
						His code is clean, readable and easy to review. He stays up to date
						with the emerging libraries and technologies... He implemented our
						entire CI/CD pipeline, with automated tests, while communicating
						with other teams to ensure consistency across the board. Can't
						recommend him enough as a co-worker and programmer. I have learned a
						huge amount working alongside him. He is always happy to lend a hand
						in a constructive way."
					</div>
					<span className="text-gray-400">
						- Emer Mooney, Product Engineer at Intercom
					</span>
				</li>
				<li>
					<div>
						"It's very rare to see someone come into a team and become a key
						member so quickly. I was really impressed with how Dan approached
						his work and ensured it was delivered on time and with the highest
						quality. Dan is ridiculously efficient, you don't need to tell him
						anything twice and he immerses himself in his work soaking up
						everything. It was an absolute pleasure to work with Dan, his work
						ethic and coffee making skills are top class. Thanks, Dan!"
					</div>
					<span className="text-gray-400">
						- Phil Kearney, Lead Software Engineer at Personio
					</span>
				</li>
				<li>
					<a
						target="_blank"
						rel="noreferrer"
						href="https://www.linkedin.com/in/dangurney/details/recommendations/?detailScreenTabIndex=0"
					>
						Read more testimonials on LinkedIn ↗
					</a>
				</li>
			</ul>
		</div>
	);
}
