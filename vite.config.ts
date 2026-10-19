import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import { realpathSync } from 'node:fs';

const config = defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd()), realpathSync('node_modules')]
		}
	}
});

export default config;
