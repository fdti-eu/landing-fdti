import type { Lang } from '$lib/data';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return [{ local: 'fr' }, { local: 'en' }];
}

export const load: PageLoad = ({ params }) => ({
	locale: (params.local as Lang) || 'fr'
});
