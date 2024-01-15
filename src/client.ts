import { HoudiniClient, type RequestHandlerArgs, type SubscriptionHandler } from '$houdini';
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
	const result = await fetch(url, {
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

export default new HoudiniClient(fetchQuery, socketClient as SubscriptionHandler);
