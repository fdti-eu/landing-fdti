import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		output: {
			// The client init hook verifies these modules before hydration can replace the HTML.
			preloadStrategy: 'modulepreload'
		},
		serviceWorker: {
			register: false
		},
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: true,
			strict: true
		}),
		alias: {
			$locales: 'src/locales'
		},
		env: {
			dir: 'env'
		},
		prerender: {
			crawl: true,
			entries: ['*']
		}
	}
};

export default config;
