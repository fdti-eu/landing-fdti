import { error } from '@sveltejs/kit';
import { getUseCasesContent, type Lang } from '$lib/data';
import type { PageLoad } from './$types';

export const prerender = true;

export async function entries() {
	const entries: { local?: Lang; slug: string }[] = [];

	for (const local of ['fr', 'en'] as Lang[]) {
		const content = await getUseCasesContent(local);
		for (const useCase of content.use_case_list ?? []) {
			if (!useCase.slug) continue;
			entries.push({ local, slug: useCase.slug });
			if (local === 'fr') entries.push({ slug: useCase.slug });
		}
	}

	return entries;
}

export const load: PageLoad = async ({ params, depends }) => {
	depends('app:locale');
	const local = (params.local as Lang) || 'fr';
	const content = await getUseCasesContent(local);
	const useCase = content?.use_case_list?.find((item) => item?.slug === params.slug) || null;

	if (!useCase) {
		throw error(404, 'Use case not found');
	}

	const translatedContent = await getUseCasesContent(local === 'fr' ? 'en' : 'fr');
	const translatedUseCase = translatedContent.use_case_list?.find((item) => item.id === useCase.id);

	return {
		content,
		useCase,
		locale: local,
		alternatePaths: {
			fr: `/realisations/${local === 'fr' ? useCase.slug : translatedUseCase?.slug || useCase.slug}`,
			en: `/realisations/${local === 'en' ? useCase.slug : translatedUseCase?.slug || useCase.slug}`
		}
	};
};
