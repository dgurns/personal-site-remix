import { 
	type LoaderArgs as RemixLoaderArgs, 
	type ActionArgs as RemixActionArgs 
} from "@remix-run/cloudflare";

declare global {
	const YOUTUBE_API_KEY: string;
}

export default global;

type Context = {
	YOUTUBE_API_KEY: string;
	KV: KVNamespace;
};

export type LoaderArgs = RemixLoaderArgs & {
	context: Context
}

export type ActionArgs = RemixActionArgs & {
	context: Context
}