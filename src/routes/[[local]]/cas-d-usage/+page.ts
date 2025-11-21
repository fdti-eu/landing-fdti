import { getUseCasesContent, type Lang } from '$lib/data';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, depends }) => {
	depends('app:locale');
	const local = (params.local as Lang) || 'fr';
	const content = getUseCasesContent(local);

	return { content };
};
