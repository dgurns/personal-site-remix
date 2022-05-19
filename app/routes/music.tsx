export function meta() {
	return {
		title: 'Dan Gurney - Music',
	};
}

export default function Music() {
	return (
		<div className="p-4 md:p-8 mt-4 md:mt-8 flex flex-col items-center mb-48">
			<div className="max-w-xl">
				<h1 className="mb-6">Music</h1>
				<p>
					I first picked up an accordion in a toy store in upstate New York and
					have been addicted to it ever since. It has taken me to lots of fun
					places, including to Dublin, Ireland where I live now with my wife and
					daughter.
				</p>
				<p>
					Have a question? Feel free to{' '}
					<a href="mailto:dan@dangurney.net">get in touch</a>.
				</p>

				<h2 className="mt-8 mb-6">YouTube Channel</h2>
				<iframe
					title="YouTube Video"
					width="100%"
					height="350"
					src="https://www.youtube.com/embed/eSqKa_M5vXw"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>

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
		</div>
	);
}