import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { type LoaderArgs } from '~/types';

export function meta() {
	return {
		title: 'Dan Gurney - Guestbook',
	};
}

// export async function loader({ context }: LoaderArgs) {}

export default function Guestbook() {
	// const {} = useLoaderData<typeof loader>();

	return (
		<div>
			<h1 className="mb-6">Guestbook</h1>
		</div>
	);
}
