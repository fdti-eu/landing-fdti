import { error } from '@sveltejs/kit';
import { getUseCasesContent, type Lang } from '$lib/data';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, depends }) => {
	depends('app:locale');
	const local = (params.local as Lang) || 'fr';
	const content = await getUseCasesContent(local);
	const useCase = content?.use_case_list?.find((item) => item?.slug === params.slug) || null;

	if (!useCase) {
		throw error(404, 'Use case not found');
	}

	return {
		content,
		useCase,
		locale: local
	};
};
