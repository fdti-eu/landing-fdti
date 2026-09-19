import { redirect } from '@sveltejs/kit';
import { SUPPORTED_LOCALES, type Lang } from '$lib/data';
import { buildLocalizedPath } from '$lib/functions/seo';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return [{ local: undefined }, ...SUPPORTED_LOCALES.map((local) => ({ local }))];
}

export const load: PageLoad = ({ params }) => {
	const locale = (params.local as Lang) || 'fr';
	throw redirect(308, buildLocalizedPath('/realisations', locale));
};
