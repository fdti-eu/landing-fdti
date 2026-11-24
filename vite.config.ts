import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import { realpathSync } from 'node:fs';

const config = defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			preprocess: vitePreprocess(),
			serviceWorker: { register: false },
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				// GitHub Pages serves this page, with a 404 status, for unknown URLs.
				fallback: '404.html',
				precompress: true,
				strict: true
			}),
			env: { dir: 'env' },
			prerender: { crawl: true, entries: ['*'] }
		})
	],
	server: {
		proxy: {
			'^/contact$': 'http://127.0.0.1:5187',
			'^/newsletter/(subscribe|unsubscribe)$': 'http://127.0.0.1:5187'
		},
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd()), realpathSync('node_modules')]
		}
	}
});

export default config;
