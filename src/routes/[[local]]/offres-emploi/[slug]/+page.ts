import { error } from '@sveltejs/kit';
import { isSupportedLocale, SUPPORTED_LOCALES, type Lang } from '$lib/data';
import type { SeoAlternatePaths } from '$lib/functions/seo';
import { getJobOffer, getJobOffers } from '$lib/jobs';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return SUPPORTED_LOCALES.flatMap((local) =>
		getJobOffers(local).flatMap((job) => [
			{ local, slug: job.slug },
			...(local === 'fr' ? [{ slug: job.slug }] : [])
		])
	);
}

export const load: PageLoad = async ({ params }) => {
	if (params.local && !isSupportedLocale(params.local)) {
		throw error(404, 'Job offer not found');
	}

	const locale = (params.local || 'fr') as Lang;
	const job = getJobOffer(locale, params.slug);

	if (!job) {
		throw error(404, 'Job offer not found');
	}

	const alternatePaths = Object.fromEntries(
		SUPPORTED_LOCALES.map((alternateLocale) => {
			const localizedJob = getJobOffers(alternateLocale).find(
				(candidate) => candidate.id === job.id
			);
			if (!localizedJob) {
				throw error(500, `Missing ${alternateLocale} translation for job offer ${job.id}`);
			}
			return [alternateLocale, `/offres-emploi/${localizedJob.slug}`];
		})
	) as SeoAlternatePaths;

	return {
		job,
		locale,
		alternatePaths
	};
};
