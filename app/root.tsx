import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';
import styles from './gen-styles/app.css';
import Nav from '~/components/Nav';
import { CanvasBackground } from './components/CanvasBackground';

export const meta: MetaFunction = () => [
	{
		title: 'Dan Gurney - Personal Site',
	},
	{
		property: 'og:description',
		content: 'Software, music, blog, and experiments',
	},
];

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: styles },
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			href: '/favicons/favicon-180x180.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '48x48',
			href: '/favicons/favicon-48x48.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			href: '/favicons/favicon-32x32.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			href: '/favicons/favicon-16x16.png',
		},
		{
			rel: 'icon',
			href: '/favicons/favicon.ico',
		},
		{
			rel: 'shortcut icon',
			href: '/favicons/favicon.ico',
		},
	];
};

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Nav />
				<div className="relative mt-4 flex flex-col items-center p-4 md:mt-8 md:p-8">
					<div className="w-full max-w-xl pb-48">
						<Outlet />
					</div>
				</div>

				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}

export function ErrorBoundary() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<Nav />
				<div className="mt-4 flex flex-col items-center p-4 pb-48 md:mt-8 md:p-8">
					<div className="w-full max-w-xl text-center">
						Oops! An error occurred. Please reload the page.
					</div>
				</div>

				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
