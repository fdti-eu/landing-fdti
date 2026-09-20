import { SUPPORTED_LOCALES } from '$lib/data';
import { buildSeoAlternatePaths } from '$lib/functions/seo';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return SUPPORTED_LOCALES.map((local) => ({ local }));
}

export const load: PageLoad = () => ({
	alternatePaths: buildSeoAlternatePaths('/expertises/analyse-documentaire')
});
