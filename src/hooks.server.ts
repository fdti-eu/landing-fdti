import type { Handle } from '@sveltejs/kit';
import { resolveLocaleFromPath } from '$lib/functions/seo';

export const handle: Handle = async ({ event, resolve }) => {
	const locale = resolveLocaleFromPath(event.url.pathname);

	return await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', locale).replace('<html lang="en">', `<html lang="${locale}">`)
	});
};
