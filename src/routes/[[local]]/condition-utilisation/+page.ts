import { getCGUContent, type Lang } from '$lib/data';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return [{ local: 'fr' }, { local: 'en' }];
}

export const load: PageLoad = async ({ params }) => {
	const locale = (params.local as Lang) || 'fr';

	return {
		initialLocale: locale,
		initialContent: await getCGUContent(locale)
	};
};
