import { SUPPORTED_LOCALES, type Lang } from '$lib/data';
import { buildSeoAlternatePaths } from '$lib/functions/seo';
import type { PageLoad } from './$types';
export const prerender = true;
export const entries = () => SUPPORTED_LOCALES.map((local) => ({ local }));
export const load: PageLoad = async ({ params }) => {
	const locale = (params.local as Lang) || 'fr';
	return { locale, alternatePaths: buildSeoAlternatePaths('/filieres') };
};
