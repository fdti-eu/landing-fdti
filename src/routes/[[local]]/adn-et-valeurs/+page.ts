import { getDNAPageContent, type Lang } from '$lib/data';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const locale = (params.local as Lang) || 'fr';

	return {
		initialLocale: locale,
		initialContent: await getDNAPageContent(locale)
	};
};
