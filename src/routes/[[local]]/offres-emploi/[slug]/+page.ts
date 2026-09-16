import { error } from '@sveltejs/kit';
import type { Lang } from '$lib/data';
import { getJobOffer, getJobOffers } from '$lib/jobs';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return (['fr', 'en'] as Lang[]).flatMap((local) =>
		getJobOffers(local).flatMap((job) => [
			{ local, slug: job.slug },
			...(local === 'fr' ? [{ slug: job.slug }] : [])
		])
	);
}

export const load: PageLoad = async ({ params }) => {
	if (params.local && params.local !== 'fr' && params.local !== 'en') {
		throw error(404, 'Job offer not found');
	}

	const locale = (params.local || 'fr') as Lang;
	const job = getJobOffer(locale, params.slug);

	if (!job) {
		throw error(404, 'Job offer not found');
	}

	return {
		job,
		locale,
		alternatePaths: {
			fr: `/offres-emploi/${job.slug}`,
			en: `/offres-emploi/${job.slug}`
		}
	};
};
