import { getUseCasesContent, SUPPORTED_LOCALES, type Lang } from '$lib/data';
import { buildSeoAlternatePaths } from '$lib/functions/seo';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return SUPPORTED_LOCALES.map((local) => ({ local }));
}

export const load: PageLoad = async ({ params, depends }) => {
	depends('app:locale');
	const local = (params.local as Lang) || 'fr';
	const content = await getUseCasesContent(local);

	return {
		content,
		locale: local,
		alternatePaths: buildSeoAlternatePaths('/realisations')
	};
};
