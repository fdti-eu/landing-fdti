import { getUseCasesContent, type Lang } from '$lib/data';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return [{ local: 'fr' }, { local: 'en' }];
}

export const load: PageLoad = async ({ params, depends }) => {
	depends('app:locale');
	const local = (params.local as Lang) || 'fr';
	const content = await getUseCasesContent(local);

	return { content, locale: local };
};
