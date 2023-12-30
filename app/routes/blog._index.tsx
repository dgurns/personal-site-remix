import { Link } from '@remix-run/react';
import { type MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = () => [
	{
		title: 'Dan Gurney - Blog',
	},
];

interface Post {
	title: string;
	date: string;
	slug: string;
}
export const posts: Post[] = [
	{
		title: 'AI-rish Tunes',
		date: 'December 8, 2022',
		slug: 'airish-tunes',
	},
	{
		title: 'Building a Guestbook with Workers KV',
		date: 'October 20, 2022',
		slug: 'building-guestbook',
	},
	{
		title: 'Experimenting with AI Chatbots',
		date: 'October 13, 2022',
		slug: 'experimenting-with-ai-chatbots',
	},
	{
		title: 'Migrating Trad Archive from NextJS to Remix',
		date: 'August 7, 2022',
		slug: 'migrating-trad-archive-to-remix',
	},
	{
		title: 'Promo Video for "From the Bridge"',
		date: 'June 23, 2022',
		slug: 'promo-from-the-bridge',
	},
	{
		title: 'New Compositions for ITMA',
		date: 'June 2, 2022',
		slug: 'new-compositions-itma',
	},
	{
		title: 'How This Site Was Made',
		date: 'May 26, 2022',
		slug: 'making-of',
	},
];

export default function Blog() {
	return (
		<div>
			<h1 className="mb-6">Blog</h1>
			<ul className="space-y-4">
				{posts.map((p, index) => (
					<li key={index}>
						<div className="text-gray-400">{p.date}</div>
						<Link to={`/blog/${p.slug}`}>{p.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
