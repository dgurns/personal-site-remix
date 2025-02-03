import { Link } from '@remix-run/react';

export default function Nav() {
	return (
		<nav className="flex flex-col space-y-1 px-4 py-2 md:flex-row md:items-center md:space-y-0 md:space-x-4">
			<div className="flex flex-row items-center space-x-3 md:space-x-4">
				<Link to="/" prefetch="render">
					Dan Gurney
				</Link>
				<span>/</span>
			</div>

			<div className="flex flex-row items-center space-x-4">
				<Link to="/software" prefetch="render">
					Software
				</Link>
				<Link to="/music" prefetch="render">
					Music
				</Link>
				<Link to="/blog" prefetch="render">
					Blog
				</Link>
				<Link to="/experiments" prefetch="render">
					Experiments
				</Link>
			</div>

			<a href="https://album.dangurney.net" style={{ color: '#fef08a' }}>New Album</a>
		</nav>
	);
}
