import { error, redirect } from '@sveltejs/kit';
import { getData, SUPPORTED_LOCALES, type Lang } from '$lib/data';
import { solutionPageIds, solutionPageLocales } from '$lib/solution-pages';
import { buildLocalizedPath } from '$lib/functions/seo';
import type { PageLoad } from './$types';
export const prerender = true;
async function paths(locale: Lang) {
	const d = await getData(locale);
	return [
		'',
		'analyse-documentaire',
		...d.DocumentAnalysis.guides.map((g) => `analyse-documentaire/${g.slug}`),
		'economie-circulaire',
		'economie-circulaire/rep-emballages',
		...d.CircularEconomy.dossiers.map((g) => `economie-circulaire/${g.slug}`),
		...(solutionPageLocales.includes(locale) ? solutionPageIds : [])
	];
}
export async function entries() {
	return (
		await Promise.all(
			SUPPORTED_LOCALES.map(async (local) =>
				(await paths(local)).flatMap((legacy) => [
					{ local, legacy },
					...(local === 'fr' ? [{ legacy }] : [])
				])
			)
		)
	).flat();
}
export const load: PageLoad = async ({ params }) => {
	const locale = (params.local as Lang) || 'fr',
		legacy = params.legacy || '';
	if (!(await paths(locale)).includes(legacy)) error(404, 'Not found');
	redirect(
		308,
		buildLocalizedPath(
			(legacy.startsWith('economie-circulaire') ? '/filieres' : '/solutions') +
				(legacy ? `/${legacy}` : ''),
			locale
		)
	);
};
