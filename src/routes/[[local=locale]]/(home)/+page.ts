import { getHomePageContent, getUseCasesContent, SUPPORTED_LOCALES, type Lang } from '$lib/data';
import { buildSeoAlternatePaths } from '$lib/functions/seo';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return SUPPORTED_LOCALES.map((local) => ({ local }));
}

export const load: PageLoad = async ({ params }) => {
	const local = (params.local as Lang) || 'fr';
	const content = await getHomePageContent(local);
	const useCasesContent = await getUseCasesContent(local);

	const useCasesLabels: Record<Lang, { title: string; subtitle: string }> = {
		fr: {
			title: 'Cas concrets',
			subtitle:
				'Quelques projets déjà déployés en IA, applications métier et automatisation de processus.'
		},
		en: {
			title: 'Concrete examples',
			subtitle:
				'Selected projects already deployed across AI, business applications, and workflow automation.'
		},
		es: {
			title: 'Casos concretos',
			subtitle:
				'Una selección de proyectos ya desplegados en IA, aplicaciones empresariales y automatización de procesos.'
		},
		de: {
			title: 'Praxisbeispiele',
			subtitle:
				'Ausgewählte, bereits produktiv eingesetzte Projekte in den Bereichen KI, Geschäftsanwendungen und Prozessautomatisierung.'
		}
	};

	return {
		...content,
		homepage_use_cases: useCasesContent.use_case_list?.slice(0, 3) || [],
		homepage_use_cases_title: useCasesLabels[local].title,
		homepage_use_cases_subtitle: useCasesLabels[local].subtitle,
		locale: local,
		alternatePaths: buildSeoAlternatePaths('/')
	};
};
