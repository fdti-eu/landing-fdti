import { jobOffers } from '$lib/jobs';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return [{ local: 'fr' }];
}

export const load: PageLoad = async ({ params }) => {
	if (params.local !== 'fr') {
		return { jobs: [], locale: params.local || 'fr' };
	}

	return { jobs: jobOffers, locale: 'fr' };
};
