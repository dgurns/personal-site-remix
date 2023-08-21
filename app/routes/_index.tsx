import { Link } from '@remix-run/react';
import { useState } from 'react';
import { posts } from 'app/routes/blog._index';

export const meta = () => ({
	title: 'Dan Gurney - Personal Site',
});

const mostRecentPost = posts[0];

export default function Index() {
	const [showYears, setShowYears] = useState(false);

	return (
		<div className="mt-8 flex flex-col items-center justify-center text-center md:mt-16">
			<img
				src="/images/DanGurneyPhotoCircle.png"
				alt="Dan Gurney"
				className="h-36"
			/>
			<h1 className="mt-4">👋🏻 Hi, I'm Dan</h1>

			<ul className="mt-12 space-y-2">
				<li>
					I'm a <Link to="/software">senior software engineer</Link> at Inscribe
					AI
				</li>
				<li>
					I play the <Link to="/music">accordion</Link>
				</li>
				<li className="h-4" />
				{/* {mostRecentPost && (
					<li>
						Latest blog post:{' '}
						<Link to={`/blog/${mostRecentPost.slug}`}>
							{mostRecentPost.title}
						</Link>
					</li>
				)} */}
				<li>
					Latest experiment:{' '}
					<a href="https://chat.jamesgurney.com">James Gurney Knowledge Base</a>
				</li>
			</ul>

			<footer className="mt-10 flex flex-row items-center space-x-4">
				<a href="https://www.linkedin.com/in/dangurney/">
					<img
						src="/images/LinkedIn-White-96.png"
						height={24}
						width={24}
						alt="LinkedIn"
						className="md:transition-all md:hover:scale-125"
					/>
				</a>
				<a href="https://github.com/dgurns">
					<img
						src="/images/GitHub-White-120.png"
						height={24}
						width={24}
						alt="GitHub"
						className="md:transition-all md:hover:scale-125"
					/>
				</a>
				<a
					href="mailto:dan@dangurney.net"
					className="text-3xl text-gray-600 md:transition-all md:hover:scale-125 md:hover:no-underline"
				>
					✉️
				</a>
			</footer>

			<div className="mt-2 text-center text-sm text-gray-400">
				<button
					className="bg-transparent p-0 text-gray-400 hover:bg-transparent"
					onClick={() => setShowYears(!showYears)}
				>
					<ul>
						<li>2023{showYears && ': Year of Friction'}</li>
						{showYears && (
							<>
								<li>2022: Year of the Comeback</li>
								<li>2021: Year of the Upside</li>
								<li>2020: Year of the Launch</li>
								<li>2019: Year of the Unexpected</li>
								<li>2018: Year of No Filter</li>
								<li>2017: Year of the Wild</li>
								<li>2016: Year of the High Life</li>
								<li>2015: Year of the Big Picture</li>
								<li>2014: Year of the Nuance</li>
							</>
						)}
					</ul>
				</button>
			</div>
		</div>
	);
}
