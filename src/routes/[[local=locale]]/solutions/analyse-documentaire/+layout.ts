import { getData, type Lang } from '$lib/data';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, depends }) => {
	depends('app:locale');
	const locale = (params.local as Lang) || 'fr';
	return { content: (await getData(locale)).DocumentAnalysis, locale };
};
