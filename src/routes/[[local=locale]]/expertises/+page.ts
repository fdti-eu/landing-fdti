import { getUseCasesContent, SUPPORTED_LOCALES, type Lang } from '$lib/data';
import { buildSeoAlternatePaths } from '$lib/functions/seo';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return SUPPORTED_LOCALES.map((local) => ({ local }));
}

export const load: PageLoad = async ({ params }) => {
	const locale = (params.local as Lang) || 'fr';
	const work = await getUseCasesContent(locale);
	return {
		locale,
		alternatePaths: buildSeoAlternatePaths('/expertises'),
		projects: work.use_case_list.map(({ id, title, slug }) => ({ id, title, slug }))
	};
};
