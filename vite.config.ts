import { sveltekit } from '@sveltejs/kit/vite';
import houdini from 'houdini/vite';
import { defineConfig, loadEnv, type UserConfigExport } from "vite";


const config: UserConfigExport = defineConfig(({ mode }) => {

	const env = loadEnv(mode, process.cwd())
	return {
		plugins: [houdini({
			apiUrl: `https://${env.VITE_CLIENT_URL}`
		}),
		sveltekit()]
	}
})

export default config;
