				import worker, * as OTHER_EXPORTS from "/Users/dangurney/Desktop/Dev/personal-site-remix/.wrangler/tmp/pages-Yy77xt/functionsWorker-0.35880867654261817.mjs";
				import * as __MIDDLEWARE_0__ from "/Users/dangurney/Desktop/Dev/personal-site-remix/node_modules/.pnpm/wrangler@3.22.1/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts";
				const envWrappers = [__MIDDLEWARE_0__.wrap].filter(Boolean);
				const facade = {
					...worker,
					envWrappers,
					middleware: [
						__MIDDLEWARE_0__.default,
            ...(worker.middleware ? worker.middleware : []),
					].filter(Boolean)
				}
				export * from "/Users/dangurney/Desktop/Dev/personal-site-remix/.wrangler/tmp/pages-Yy77xt/functionsWorker-0.35880867654261817.mjs";

				const maskDurableObjectDefinition = (cls) =>
					class extends cls {
						constructor(state, env) {
							let wrappedEnv = env
							for (const wrapFn of envWrappers) {
								wrappedEnv = wrapFn(wrappedEnv)
							}
							super(state, wrappedEnv);
						}
					};
				

				export default facade;