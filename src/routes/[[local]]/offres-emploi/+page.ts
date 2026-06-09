import type { Lang } from '$lib/data';
import { getJobOffers } from '$lib/jobs';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return [{ local: 'fr' }, { local: 'en' }];
}

export const load: PageLoad = async ({ params }) => {
	const locale = params.local === 'en' ? 'en' : 'fr';

	return { jobs: getJobOffers(locale), locale: locale as Lang };
};
