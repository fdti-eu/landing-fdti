import { SUPPORTED_LOCALES, type Lang } from '$lib/data';
import { buildSeoAlternatePaths } from '$lib/functions/seo';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return SUPPORTED_LOCALES.map((local) => ({ local }));
}

export const load: PageLoad = ({ params }) => ({
	locale: (params.local as Lang) || 'fr',
	alternatePaths: buildSeoAlternatePaths('/expertises')
});
