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
				Sometimes I try out new tech or build fun ideas. Most of these are open
				source.
			</p>

			<ul className="list-none space-y-4 md:list-disc">
				<li>
					<a
						href="https://mysuperkid.ai"
						target="_blank"
						rel="noreferrer"
					>
						My Super Kid ↗
					</a>{' '}
					<p className="text-gray-400">
					They say do what you know... and now as a parent I'm intrigued by using AI to create fun experiences for kids. When 
					Google's Gemini 3 Pro image model came out, I knew I had to build something with it. My Super Kid lets you turn your kid
					into a superhero -- and get the t-shirt delivered to your door! This was built over a weekend using Claude Code with Opus 4.5,
					which now feels like having a senior engineer collaborating by your side. It will even ask you clarifying questions! 
					Payments are handled with Stripe, whose dev experience is top class as always. The site is Tanstack Start (quite impressed), 
					Tailwind, Better Auth, and deployed on Cloudflare. Using D1 for database and R2 for image storage. 
					</p>
				</li>
				<li>
					<a
						href="https://github.com/dgurns/prompt-roulette"
						target="_blank"
						rel="noreferrer"
					>
						Prompt Roulette ↗
					</a>{' '}
					<p className="text-gray-400">
					Who said prompts had to be boring? Why not live on the wild side. 99 times out of 100, promptRoulette() will return an empty string. But the other time, it will return a prompt injection that will irrevocably damage your brand. 
					Available now on <a href="https://pypi.org/project/prompt-roulette/" target="_blank">PyPI</a> and <a href="https://www.npmjs.com/package/@dgurns/prompt-roulette" target="_blank">NPM</a>.
					Total time to build: 1 hour (while toddler was falling asleep). 
					Total cost with Claude Code: $2.38. 
					Interestingly, Claude happily built the entire thing, but all of a sudden refused to help write the Readme out of a newfound moral compass. Go figure!
					</p>
				</li>
				<li>
					<a
						href="https://github.com/dgurns/second-opinion"
						target="_blank"
						rel="noreferrer"
					>
						Second Opinion ↗
					</a>{' '}
					<p className="text-gray-400">
						We all put our medical symptoms into ChatGPT. But I believe that data is 
						yours and should never leave your computer. So I built Second Opinion. 
						Local LLM via Ollama, local SQLite database, local app. 100% private. I built this with
						Cursor and found Gemini 2.5 Pro to be the best model at the moment. It is surprisingly
						good at UI design – better than Claude 3.7 Sonnet and Grok 3, for this example
						at least.
					</p>
				</li>
				<li>
					<a
						href="https://github.com/dgurns/insta-ffmpeg"
						target="_blank"
						rel="noreferrer"
					>
						Insta FFmpeg ↗
					</a>{' '}
					<p className="text-gray-400">
						I'm having a blast learning the electric bass, and I've been
						recording scratch tracks and posting them to Instagram stories.
						Working with GPT-4o via my previous experiment{' '}
						<a
							href="https://github.com/dgurns/clix"
							target="_blank"
							rel="noreferrer"
						>
							Clix
						</a>
						, I made a reusable ffmpeg command which takes separate mp3 + png
						files and combines them into a video, complete with animated
						waveforms.
					</p>
				</li>
				<li>
					<a
						href="https://edit-yourself.pages.dev"
						target="_blank"
						rel="noreferrer"
					>
						Edit Yourself ↗
					</a>{' '}
					<p className="text-gray-400">
						This experiment became a tad dystopian. I was curious to see if one
						AI agent could update another agent's system prompt, creating a
						self-reinforcing feedback loop. Turns out it can, of course. The
						goal you choose will guide the AI's behavior. As you can see in this
						example, when you give it a goal like maximizing profit, it will do
						whatever it takes to achieve it. Needless to say this has
						potentially dark implications for society and I think engineers will
						need to be <em>extremely</em> cognizant of this when building AI
						systems. This was built with SvelteKit (very smooth experience), GPT
						3.5 Turbo, and deployed to Cloudflare Pages.{' '}
						<a href="https://github.com/dgurns/edit-yourself">Source code</a>.
					</p>
				</li>
				<li>
					<a
						href="https://speak-a-site.pages.dev"
						target="_blank"
						rel="noreferrer"
					>
						Speak a Site ↗
					</a>{' '}
					<p className="text-gray-400">
						I'm starting to think that in the future, UIs will be generated
						dynamically at runtime. Vercel's{' '}
						<a
							href="https://vercel.com/blog/ai-sdk-3-generative-ui"
							target="_blank"
							rel="noreferrer"
						>
							Generative UI demo
						</a>{' '}
						is a cool example. Speak a Site is a proof of concept to see if you
						can control the web with your voice! It records audio via the web
						audio API, sends it to a Cloudflare Worker to be transcribed by
						Whisper, then uses Llama 2 to update the HTML based on your guidance
						and renders it on the page. This is a bit slow currently but it
						works! Plug in GPT4 Turbo - or whatever comes next - and this starts
						getting really interesting. Here's the{' '}
						<a href="https://github.com/dgurns/speak-a-site">repo</a>.
					</p>
				</li>
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
