import { Link } from '@remix-run/react';
import { useState } from 'react';
// import { posts } from 'app/routes/blog._index';

export const meta = () => [
	{
		title: 'Dan Gurney - Personal Site',
	},
];

// const mostRecentPost = posts[0];

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
					I'm a <Link to="/software">staff software engineer</Link> building AI agents at
					Inscribe
				</li>
				<li>
					I play the <Link to="/music">accordion</Link> and{' '}
					<Link to="/music">electric bass</Link>
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
					Latest experiment: <Link to="/experiments">Insta FFmpeg</Link>
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

				<a href="https://instagram.com/danpgurney">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="22"
						height="22"
						viewBox="0 0 26 26"
						className="md:transition-all md:hover:scale-125"
					>
						<path
							fill="white"
							d="M 7.546875 0 C 3.390625 0 0 3.390625 0 7.546875 L 0 18.453125 C 0 22.609375 3.390625 26 7.546875 26 L 18.453125 26 C 22.609375 26 26 22.609375 26 18.453125 L 26 7.546875 C 26 3.390625 22.609375 0 18.453125 0 Z M 7.546875 2 L 18.453125 2 C 21.527344 2 24 4.46875 24 7.546875 L 24 18.453125 C 24 21.527344 21.53125 24 18.453125 24 L 7.546875 24 C 4.472656 24 2 21.53125 2 18.453125 L 2 7.546875 C 2 4.472656 4.46875 2 7.546875 2 Z M 20.5 4 C 19.671875 4 19 4.671875 19 5.5 C 19 6.328125 19.671875 7 20.5 7 C 21.328125 7 22 6.328125 22 5.5 C 22 4.671875 21.328125 4 20.5 4 Z M 13 6 C 9.144531 6 6 9.144531 6 13 C 6 16.855469 9.144531 20 13 20 C 16.855469 20 20 16.855469 20 13 C 20 9.144531 16.855469 6 13 6 Z M 13 8 C 15.773438 8 18 10.226563 18 13 C 18 15.773438 15.773438 18 13 18 C 10.226563 18 8 15.773438 8 13 C 8 10.226563 10.226563 8 13 8 Z"
						></path>
					</svg>
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
						<li>
							2024
							{showYears && ': Year of the Expanse'}
						</li>
						{showYears && (
							<>
								<li>2023: Year of Friction</li>
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
