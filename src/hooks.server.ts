import type { Handle } from '@sveltejs/kit/hooks';
import { resolveLocaleFromPath } from '#lib/functions/seo.ts';

export const handle: Handle = async ({ event, resolve }) => {
	const locale = resolveLocaleFromPath(event.url.pathname);

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%lang%', locale).replace('<html lang="en">', `<html lang="${locale}">`)
	});
};
