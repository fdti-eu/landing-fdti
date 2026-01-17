import type { Handle } from '@sveltejs/kit';
import { resolveLocaleFromPath } from '$lib/functions/seo';

const securityHeaders = {
	'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
	'X-Content-Type-Options': 'nosniff',
	'X-Frame-Options': 'DENY',
	'X-XSS-Protection': '1; mode=block',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

export const handle: Handle = async ({ event, resolve }) => {
	const locale = resolveLocaleFromPath(event.url.pathname);

	const response = await resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%lang%', locale).replace('<html lang="en">', `<html lang="${locale}">`)
	});

	for (const [header, value] of Object.entries(securityHeaders)) {
		response.headers.set(header, value);
	}

	return response;
};
