import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
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
