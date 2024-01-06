import { type MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = () => [
	{
		title: 'Dan Gurney - Experiments',
	},
];

export default function Experiments() {
	return (
		<div className="space-y-6">
			<h1>Experiments</h1>
			<p>
				Sometimes I try out new tech or build fun ideas. All of these are open
				source.
			</p>

			<ul className="list-none space-y-4 md:list-disc">
				<li>
					<a
						href="https://github.com/dgurns/clix"
						target="_blank"
						rel="noreferrer"
					>
						Clix ↗
					</a>{' '}
					<p className="text-gray-400">
						I'm fascinated by the idea of allowing an LLM agent to take
						real-world actions. Clix is a first experiment in that direction.
						You can type in what you want to do – for example, "Rebase this
						branch on top of the latest master" – and Clix will query an LLM and
						suggest a command for you to run. If you agree, it will actually run
						the command on your computer. It seems to be capable of chaining
						multi-step commands together. Lots of ideas for where to take this
						next.
					</p>
				</li>
				<li>
					<a
						href="https://magic-ai-box.pages.dev"
						target="_blank"
						rel="noreferrer"
					>
						Magic AI Box ↗
					</a>{' '}
					<p className="text-gray-400">
						I wanted to play around with <a href="https://htmx.org/">HTMX</a>,{' '}
						<a href="https://astro.build">Astro</a>, and{' '}
						<a href="https://developers.cloudflare.com/workers-ai/">
							Cloudflare AI
						</a>
						, so I built this simple app. HTMX is intriguing to me because it is
						a return to simplicity on the client side. The React ecosystem is
						extremely powerful but has become heavy and over-complicated. HTMX
						lets the server drive application state. For example, if you submit
						a form, it makes a POST request to the server, which returns just
						the HTML snippet for the updated UI, which HTMX then swaps in on the
						browser. Astro works well with this pattern because you can return
						partials from server endpoints. Takeaways: If I was building a
						website with mostly static content and a few forms, I would
						definitely consider Astro and HTMX. For a more interactive web app,
						for example something with various UI elements appearing/hiding
						based on user actions, or complicated loading states, I'd probably
						use Remix.
					</p>
				</li>
				<li>
					<a
						href="https://chat.jamesgurney.com"
						target="_blank"
						rel="noreferrer"
					>
						James Gurney Knowledge Base ↗
					</a>{' '}
					<p className="text-gray-400">
						My dad is an artist who has written thousands of blog posts, made
						hundreds of YouTube videos, and written two instructional books.
						With the announcement of ChatGPT Plugins and the open sourcing of
						ChatGPT Retrieval Plugin, I realized I could create a knowledgebase
						with access to all of my dad's written materials, accessible via a
						chat interface. I forked the ChatGPT Retrieval Plugin and customized
						the Python server with some data scraping scripts – with GPT-4's
						help, of course. Then I built a chat UI with NextJS, taking the
						opportunity to play around with React Server Components. In the
						future we might turn this into a ChatGPT plugin since the backend
						server can be used for that too.
					</p>
				</li>
				<li>
					<a
						href="https://github.com/dgurns/craic-ai"
						target="_blank"
						rel="noreferrer"
					>
						Craic AI ↗
					</a>{' '}
					<p className="text-gray-400">
						I thought it might be cool to use the ChatGPT API to help plan group
						events. The idea is that you could input an event name and rough
						date range, enter your invitees, and then they'd be automatically
						emailed about availability. Then the app would feed the responses
						into ChatGPT and have it pick a date that works for everyone. Not
						sure if I'll finish this one but the tech was fun: Remix, Cloudflare
						Pages, D1, ChatGPT API, and some prompt engineering.
					</p>
				</li>
				<li>
					<a
						href="https://airishtunes.pages.dev"
						target="_blank"
						rel="noreferrer"
					>
						AI-rish Tunes ↗
					</a>{' '}
					<p className="text-gray-400">
						Each day, I pick a random Irish tune and ask an AI to generate an
						image for it. Made with Cloudflare Workers and using D1, their new
						distributed SQLite product, and R2, their global object storage. All
						running on the edge.
					</p>
				</li>
				<li>
					<a
						href="https://album-cover-generator.pages.dev"
						target="_blank"
						rel="noreferrer"
					>
						Album Cover Generator ↗
					</a>{' '}
					<p className="text-gray-400">
						This app helps you get ideas for your next album cover. It uses AI
						to generate images from text via the DALL-E API. The API would be
						too expensive at scale so I've got it behind a username and password
						- "larry" and "murphy".
					</p>
				</li>
				<li>
					<a href="/guestbook" target="_blank" rel="noreferrer">
						Guestbook ↗
					</a>{' '}
					<p className="text-gray-400">
						Trying out Cloudflare Workers KV, a globally distributed key-value
						store. This site already runs on the edge via Cloudflare Workers, so
						I wanted to experiment with putting data on the edge as well. It's
						super fast.
					</p>
				</li>
				<li>
					<a href="https://pintman.pages.dev" target="_blank" rel="noreferrer">
						Have a Pint with Pintman ↗
					</a>{' '}
					<p className="text-gray-400">
						AI has been getting really good lately. This is a GPT-3 powered
						chatbot which uses the OpenAI API. If you're not familiar with
						Pintman, check out the original video after the jump.
					</p>
				</li>
				<li>
					<a
						href="https://github.com/dgurns/make-your-own-chatbot"
						target="_blank"
						rel="noreferrer"
					>
						Make Your Own Chatbot ↗
					</a>{' '}
					<p className="text-gray-400">
						It was so much fun building the Pintman chatbot that I decided to
						open-source a template so you can make your own.
					</p>
				</li>
				<li>
					<a
						href="https://talktogarth.pages.dev"
						target="_blank"
						rel="noreferrer"
					>
						Talk to Garth ↗
					</a>{' '}
					<p className="text-gray-400">
						My first attempt at a chatbot. Logo generated by Stable Diffusion -
						the prompt was something like "A cowboy in the style of Disney".
					</p>
				</li>
			</ul>
		</div>
	);
}
