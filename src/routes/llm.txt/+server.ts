import enLocale from '$locales/en.json';

export async function GET() {
	return new Response(JSON.stringify(enLocale, null, 2), {
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
