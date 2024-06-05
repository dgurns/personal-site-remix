import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { type LoaderArgs } from '~/types';
import { type MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = () => [
	{
		title: 'Dan Gurney - Music',
	},
];

export function headers() {
	// Cache for 1 hour. Then for the following 7 days, the next request will get
	// the cached version while the cache is updated in the background.
	return {
		'Cache-Control':
			'max-age=3600, s-maxage=3600, stale-while-revalidate=604800',
	};
}

interface YouTubeResponse {
	items: Array<{
		id: { videoId: string };
	}>;
}

async function fetchLatestVideoId(apiKey: string): Promise<string> {
	const channelId = 'UC-noq8EUFYOyTUc1083bLZg';
	const res = await fetch(
		`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&type=video&key=${apiKey}`
	);
	const data = await res.json<YouTubeResponse>();
	return data.items ? data.items[0].id.videoId : 'sVfTHcPqo9E';
}

export async function loader({ context }: LoaderArgs) {
	const latestVideoId = await fetchLatestVideoId(context.YOUTUBE_API_KEY);
	return json({
		latestVideoId,
	});
}

export default function Music() {
	const data = useLoaderData<typeof loader>();

	return (
		<div>
			<h1 className="mb-6">Music</h1>
			<p>
				I first picked up an accordion in a toy store in upstate New York and
				have been addicted to it ever since. It has taken me to lots of fun
				places around the world and introduced me to some great people.
			</p>
			<p>
				Lately, I've been taking up electric bass as a midlife crisis.{' '}
				<a href="https://www.instagram.com/stories/highlights/17878828656079490/">
					Check out the highlights
				</a>
				, or lowlights, depending on your perspective!
			</p>
			<p>
				Have a question? Feel free to{' '}
				<a href="mailto:dan@dangurney.net">get in touch</a>.
			</p>
			<h2 className="mt-8 mb-6">YouTube Channel</h2>
			<div className="aspect-video bg-black">
				<iframe
					title="YouTube Video"
					width="100%"
					height="100%"
					src={`https://www.youtube.com/embed/${data.latestVideoId}`}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			</div>
			<h2 className="mt-8 mb-6">Solo Albums</h2>
			<iframe
				title="Traditional Irish Music on the Button Accordion"
				height="120"
				width="100%"
				frameBorder="0"
				src="https://bandcamp.com/EmbeddedPlayer/album=1378304109/size=large/bgcol=333333/linkcol=bfdbfe/tracklist=false/artwork=small/transparent=true/"
				seamless
				className="mb-4"
			>
				<a href="https://dangurney.bandcamp.com/album/traditional-irish-music-on-the-button-accordion-2">
					Traditional Irish Music on the Button Accordion by Dan Gurney
				</a>
			</iframe>
			<iframe
				title="Ignorance Is Bliss"
				height="120"
				width="100%"
				frameBorder="0"
				src="https://bandcamp.com/EmbeddedPlayer/album=1252453085/size=large/bgcol=333333/linkcol=bfdbfe/tracklist=false/artwork=small/transparent=true/"
				seamless
			>
				<a href="https://dangurney.bandcamp.com/album/ignorance-is-bliss">
					Ignorance Is Bliss by Dan Gurney
				</a>
			</iframe>
			<h2 className="mt-8 mb-6">Duet Album</h2>
			<iframe
				title="Irish Music from the Hudson Valley"
				height="120"
				width="100%"
				frameBorder="0"
				src="https://bandcamp.com/EmbeddedPlayer/album=1139856205/size=large/bgcol=333333/linkcol=bfdbfe/tracklist=false/artwork=small/transparent=true/"
				seamless
			>
				<a href="https://dylanfoleyanddangurney.bandcamp.com/album/irish-music-from-the-hudson-valley">
					Irish Music from the Hudson Valley by Dylan Foley and Dan Gurney
				</a>
			</iframe>
			<h2 className="mt-8 mb-6">Band Albums</h2>
			<iframe
				title="The Yanks"
				height="120"
				width="100%"
				frameBorder="0"
				src="https://bandcamp.com/EmbeddedPlayer/album=1776896357/size=large/bgcol=333333/linkcol=bfdbfe/tracklist=false/artwork=small/transparent=true/"
				seamless
				className="mb-4"
			>
				<a href="https://yanksband.bandcamp.com/album/the-yanks">
					The Yanks by The Yanks
				</a>
			</iframe>
			<iframe
				title="Haymaker"
				height="120"
				width="100%"
				frameBorder="0"
				src="https://bandcamp.com/EmbeddedPlayer/album=3572515166/size=large/bgcol=333333/linkcol=bfdbfe/tracklist=false/artwork=small/transparent=true/"
				seamless
				className="mb-4"
			>
				<a href="https://yanksband.bandcamp.com/album/haymaker">
					Haymaker by The Yanks
				</a>
			</iframe>
		</div>
	);
}
