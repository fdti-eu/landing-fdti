import { buildLlmsText } from '$lib/llms';

export const prerender = true;

export async function GET() {
	return new Response(buildLlmsText(), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
