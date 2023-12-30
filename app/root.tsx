import type { MetaFunction } from '@remix-run/cloudflare';
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

export const meta: MetaFunction = () => [
	{
		charset: 'utf-8',
	},
	{
		title: 'Dan Gurney - Personal Site',
	},
	{ viewport: 'width=device-width,initial-scale=1' },
	{ 'og:description': 'Software, music, blog, and experiments' },
];

export function links() {
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
			rel: 'shortcut icon',
			href: '/favicons/favicon.ico',
		},
	];
}

export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<Nav />
				<div className="mt-4 flex flex-col items-center p-4 md:mt-8 md:p-8">
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
