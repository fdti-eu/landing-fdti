import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import { realpathSync } from 'node:fs';

const config = defineConfig({
	plugins: [sveltekit()],
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
