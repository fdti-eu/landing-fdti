import { SUPPORTED_LOCALES, type Lang } from '#lib/data.ts';
import { buildSeoAlternatePaths } from '#lib/functions/seo.ts';
import { getJobOffers } from '#lib/jobs.ts';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return SUPPORTED_LOCALES.map((local) => ({ local }));
}

export const load: PageLoad = async ({ params }) => {
	const locale = (params.local as Lang) || 'fr';

	return {
		jobs: getJobOffers(locale),
		locale,
		alternatePaths: buildSeoAlternatePaths('/offres-emploi')
	};
};
