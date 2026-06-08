import { error } from '@sveltejs/kit';
import { getJobOffer, jobOffers } from '$lib/jobs';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return jobOffers.map((job) => ({ local: 'fr', slug: job.slug }));
}

export const load: PageLoad = async ({ params }) => {
	if (params.local !== 'fr') {
		throw error(404, 'Job offer not found');
	}

	const job = getJobOffer(params.slug);

	if (!job) {
		throw error(404, 'Job offer not found');
	}

	return { job, locale: 'fr' };
};
