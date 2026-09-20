import { error } from '@sveltejs/kit';
import { getData, SUPPORTED_LOCALES } from '$lib/data';
import type { SeoAlternatePaths } from '$lib/functions/seo';
import type { PageLoad } from './$types';

export const prerender = true;

export async function entries() {
	return (
		await Promise.all(
			SUPPORTED_LOCALES.map(async (local) => {
				const content = (await getData(local)).DocumentAnalysis;
				return content.guides.flatMap(({ slug }) => [
					{ local, topic: slug },
					...(local === 'fr' ? [{ topic: slug }] : [])
				]);
			})
		)
	).flat();
}

export const load: PageLoad = async ({ params, parent }) => {
	const { content, locale } = await parent();
	const guide = content.guides.find(({ slug }) => slug === params.topic);
	if (!guide) error(404, 'Topic not found');
	const guideIndex = content.guides.indexOf(guide);
	const alternatePaths = Object.fromEntries(
		await Promise.all(
			SUPPORTED_LOCALES.map(async (local) => {
				const localizedGuide = (await getData(local)).DocumentAnalysis.guides[guideIndex];
				if (!localizedGuide?.slug) {
					throw error(500, `Missing ${local} document analysis guide at index ${guideIndex}`);
				}
				return [local, `/expertises/analyse-documentaire/${localizedGuide.slug}`];
			})
		)
	) as SeoAlternatePaths;
	return {
		content,
		guide,
		locale,
		alternatePaths
	};
};
