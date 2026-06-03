import { getHomePageContent, getUseCasesContent, type Lang } from '$lib/data';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return [{ local: 'fr' }, { local: 'en' }];
}

export const load: PageLoad = async ({ params }) => {
	const local = (params.local as Lang) || 'fr';
	const content = await getHomePageContent(local);
	const useCasesContent = await getUseCasesContent(local);

	return {
		...content,
		homepage_use_cases: useCasesContent.use_case_list?.slice(0, 3) || [],
		homepage_use_cases_title: local === 'fr' ? 'Cas concrets' : 'Concrete examples',
		homepage_use_cases_subtitle:
			local === 'fr'
				? 'Quelques projets déjà déployés en IA, applications métier et automatisation de processus.'
				: 'A few shipped projects across AI, business applications, and workflow automation.',
		locale: local
	};
};
