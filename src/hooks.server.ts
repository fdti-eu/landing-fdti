import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Déterminer la langue basée sur l'URL
	const locale = event.url.pathname.includes('/fr') ? 'fr' : 'en';

	return await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('%lang%', locale).replace('<html lang="en">', `<html lang="${locale}">`);
		}
	});
};
