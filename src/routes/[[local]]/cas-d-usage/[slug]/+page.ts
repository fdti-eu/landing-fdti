import { redirect } from '@sveltejs/kit';
import { getUseCasesContent, SUPPORTED_LOCALES, type Lang } from '$lib/data';
import { buildLocalizedPath } from '$lib/functions/seo';
import type { PageLoad } from './$types';

export const prerender = true;

export async function entries() {
	const entries: { local: Lang; slug: string }[] = [];
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
	return entries;
}

export const load: PageLoad = ({ params }) => {
	const locale = (params.local as Lang) || 'fr';
	throw redirect(308, buildLocalizedPath(`/realisations/${params.slug}`, locale));
};
