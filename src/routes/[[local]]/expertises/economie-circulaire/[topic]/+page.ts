import { error } from '@sveltejs/kit';
import { getData, type Lang } from '$lib/data';
import type { PageLoad } from './$types';

export const prerender = true;

export async function entries() {
	const locales: Lang[] = ['fr', 'en'];
	return (
		await Promise.all(
			locales.map(async (local) => {
				const content = (await getData(local)).CircularEconomy;
				return content.dossiers.flatMap(({ slug }) => [
					{ local, topic: slug },
					...(local === 'fr' ? [{ topic: slug }] : [])
				]);
			})
		)
	).flat();
}

export const load: PageLoad = async ({ params, parent }) => {
	const { content, locale } = await parent();
	const dossier = content.dossiers.find(({ slug }) => slug === params.topic);
	if (!dossier) error(404, 'Topic not found');
	return {
		content,
		dossier,
		locale,
		alternatePaths: {
			fr: `/expertises/economie-circulaire/${dossier.slug}`,
			en: `/expertises/economie-circulaire/${dossier.slug}`
		}
	};
};
