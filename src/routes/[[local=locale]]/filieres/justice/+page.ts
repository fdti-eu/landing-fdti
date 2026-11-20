import { SUPPORTED_LOCALES, getUseCasesContent, type Lang } from '$lib/data';
import { buildSeoAlternatePaths } from '$lib/functions/seo';
import type { PageLoad } from './$types';
export const prerender = true;
export const entries = () => SUPPORTED_LOCALES.map((local) => ({ local }));
export const load: PageLoad = async ({ params }) => {
	const locale = (params.local as Lang) || 'fr';
	return {
		locale,
		alternatePaths: buildSeoAlternatePaths('/filieres/justice'),
		projects: (await getUseCasesContent(locale)).use_case_list.filter((p) =>
			['1', '9'].includes(p.id)
		)
	};
};
