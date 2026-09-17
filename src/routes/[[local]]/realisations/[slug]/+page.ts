import { error, redirect } from '@sveltejs/kit';
import { getUseCasesContent, SUPPORTED_LOCALES, type Lang } from '$lib/data';
import { buildLocalizedPath, type SeoAlternatePaths } from '$lib/functions/seo';
import type { PageLoad } from './$types';

export const prerender = true;

export async function entries() {
	const entries: { local?: Lang; slug: string }[] = [];
	const slugs = new Set<string>();

	for (const sourceLocale of SUPPORTED_LOCALES) {
		const content = await getUseCasesContent(sourceLocale);
		for (const useCase of content.use_case_list ?? []) {
			if (useCase.slug) slugs.add(useCase.slug);
		}
	}

	for (const local of SUPPORTED_LOCALES) {
		for (const slug of slugs) entries.push({ local, slug });
	}

	const frenchContent = await getUseCasesContent('fr');
	for (const useCase of frenchContent.use_case_list ?? []) {
		if (useCase.slug) entries.push({ slug: useCase.slug });
	}

	return entries;
}

export const load: PageLoad = async ({ params, depends }) => {
	depends('app:locale');
	const local = (params.local as Lang) || 'fr';
	const content = await getUseCasesContent(local);
	let useCase = content?.use_case_list?.find((item) => item?.slug === params.slug) || null;

	if (!useCase) {
		for (const sourceLocale of SUPPORTED_LOCALES) {
			if (sourceLocale === local) continue;
			const sourceContent = await getUseCasesContent(sourceLocale);
			const sourceUseCase = sourceContent.use_case_list?.find((item) => item.slug === params.slug);
			if (!sourceUseCase) continue;
			useCase = content.use_case_list?.find((item) => item.id === sourceUseCase.id) || null;
			if (useCase?.slug) {
				throw redirect(308, buildLocalizedPath(`/realisations/${useCase.slug}`, local));
			}
		}
		throw error(404, 'Use case not found');
	}

	const alternatePaths = Object.fromEntries(
		await Promise.all(
			SUPPORTED_LOCALES.map(async (locale) => {
				const localizedContent = await getUseCasesContent(locale);
				const localizedUseCase = localizedContent.use_case_list?.find(
					(item) => item.id === useCase.id
				);
				if (!localizedUseCase?.slug) {
					throw error(500, `Missing ${locale} translation for use case ${useCase.id}`);
				}
				return [locale, `/realisations/${localizedUseCase.slug}`];
			})
		)
	) as SeoAlternatePaths;

	return {
		content,
		useCase,
		locale: local,
		alternatePaths
	};
};
