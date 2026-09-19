import { getPrivacyContent, SUPPORTED_LOCALES, type Lang } from '$lib/data';
import { buildSeoAlternatePaths } from '$lib/functions/seo';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return [{ local: undefined }, ...SUPPORTED_LOCALES.map((local) => ({ local }))];
}

export const load: PageLoad = async ({ params }) => {
	const locale = (params.local as Lang) || 'fr';

	return {
		initialLocale: locale,
		initialContent: await getPrivacyContent(locale),
		alternatePaths: buildSeoAlternatePaths('/confidentialite')
	};
};
