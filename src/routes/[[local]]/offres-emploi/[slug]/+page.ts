import { error } from '@sveltejs/kit';
import type { Lang } from '$lib/data';
import { getJobOffer, getJobOffers } from '$lib/jobs';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return (['fr', 'en'] as Lang[]).flatMap((local) =>
		getJobOffers(local).map((job) => ({ local, slug: job.slug }))
	);
}

export const load: PageLoad = async ({ params }) => {
	if (params.local !== 'fr' && params.local !== 'en') {
		throw error(404, 'Job offer not found');
	}

	const locale = params.local;
	const job = getJobOffer(locale, params.slug);

	if (!job) {
		throw error(404, 'Job offer not found');
	}

	return { job, locale };
};
