import { HoudiniClient, type RequestHandlerArgs } from '$houdini';
import { createClient } from 'graphql-ws';
import { browser } from '$app/environment';

let socketClient;
if (browser) {
	socketClient = createClient({
		url: `wss://${import.meta.env.VITE_CLIENT_URL}`
	});
}

async function fetchQuery({ fetch, text = '', variables = {}, session }: RequestHandlerArgs) {
	const url = `https://${import.meta.env.VITE_CLIENT_URL}`;
	let result;

	result = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			query: text,
			variables
		})
	});

	return await result.json();
}

//@ts-ignore
export default new HoudiniClient(fetchQuery, socketClient);
