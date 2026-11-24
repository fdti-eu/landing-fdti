import type { ClientInit, HandleClientError } from '@sveltejs/kit/hooks';
import { dev } from '$app/env';
import { getData, SUPPORTED_LOCALES } from '#lib/data.ts';
import { resolveLocaleFromPath, stripLocaleFromPath } from '#lib/functions/seo.ts';

export const init: ClientInit = async () => {
	if (dev) return;

	// A failed route import during hydration makes SvelteKit discard the valid HTML.
	// Evaluate the build-generated preloads first, while aborting startup is still safe.
	const modules = Array.from(
		document.head.querySelectorAll<HTMLLinkElement>('link[rel="modulepreload"]'),
		(link) => link.href
	).filter((url) => new URL(url).origin === location.origin);

	// Detail loaders also import other languages to resolve translated canonical paths.
	const path = stripLocaleFromPath(location.pathname);

	const needsAlternates =
		/^\/(?:solutions\/analyse-documentaire|filieres\/economie-circulaire|realisations)\/[^/]+\/?$/.test(
			path
		);

	const locales = needsAlternates ? SUPPORTED_LOCALES : [resolveLocaleFromPath(location.pathname)];

	await Promise.all([
		...modules.map((url) => import(/* @vite-ignore */ url)),
		...locales.map((locale) => getData(locale))
	]);
};

export const handleError: HandleClientError = ({ error, event, kind }) => {
	if (kind === 'unknown') console.error(error);

	// A document navigation gets fresh HTML after a missing/stale navigation chunk.
	// Never retry during initial startup: the new document must not enter a reload loop.
	if (
		document.documentElement.dataset.fdtiHydrated &&
		error instanceof TypeError &&
		/Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i.test(
			error.message
		)
	) {
		location.assign(event.url.href);
	}
};
