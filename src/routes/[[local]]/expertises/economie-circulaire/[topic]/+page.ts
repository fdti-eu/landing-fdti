import { error } from '@sveltejs/kit';
import { getData, SUPPORTED_LOCALES } from '$lib/data';
import type { SeoAlternatePaths } from '$lib/functions/seo';
import type { PageLoad } from './$types';

export const prerender = true;

export async function entries() {
	return (
		await Promise.all(
			SUPPORTED_LOCALES.map(async (local) => {
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
	const dossierIndex = content.dossiers.indexOf(dossier);
	const alternatePaths = Object.fromEntries(
		await Promise.all(
			SUPPORTED_LOCALES.map(async (local) => {
				const localizedDossier = (await getData(local)).CircularEconomy.dossiers[dossierIndex];
				if (!localizedDossier?.slug) {
					throw error(500, `Missing ${local} circular economy dossier at index ${dossierIndex}`);
				}
				return [local, `/expertises/economie-circulaire/${localizedDossier.slug}`];
			})
		)
	) as SeoAlternatePaths;
	return {
		content,
		dossier,
		locale,
		alternatePaths
	};
};
