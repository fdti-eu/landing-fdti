import { getHomePageContent, getUseCasesContent, type Lang } from '$lib/data';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const local = (params.local as Lang) || 'fr';
	const content = await getHomePageContent(local);
	const useCasesContent = await getUseCasesContent(local);

	return {
		...content,
		homepage_use_cases: useCasesContent.use_case_list?.slice(0, 3) || [],
		homepage_use_cases_title: local === 'fr' ? 'Preuves terrain' : 'Field proof',
		homepage_use_cases_subtitle:
			local === 'fr'
				? 'Des problèmes déjà traités dans plusieurs environnements exigeants, sans enfermer FDTI dans une seule verticale.'
				: 'Problems already solved in demanding environments, without locking FDTI into a single vertical.',
		locale: local
	};
};
