import {
	getData,
	getHomePageContent,
	getUseCasesContent,
	SUPPORTED_LOCALES,
	type Lang
} from '$lib/data';
import { buildSeoAlternatePaths } from '$lib/functions/seo';
import { sortCaseCards } from '$lib/case-studies';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return SUPPORTED_LOCALES.map((local) => ({ local }));
}

export const load: PageLoad = async ({ params }) => {
	const local = (params.local as Lang) || 'fr';
	const content = await getHomePageContent(local);
	const useCasesContent = await getUseCasesContent(local);
	const [vehicles, batteries] = (await getData(local)).CircularEconomy.dossiers;

	const useCasesLabels: Record<Lang, { title: string; subtitle: string }> = {
		fr: {
			title: 'Cas concrets',
			subtitle: 'Projets déployés en IA, applications métier et automatisation de processus.'
		},
		en: {
			title: 'Concrete examples',
			subtitle: 'Projects deployed across AI, business applications, and workflow automation.'
		},
		es: {
			title: 'Casos concretos',
			subtitle:
				'Proyectos desplegados en IA, aplicaciones empresariales y automatización de procesos.'
		},
		de: {
			title: 'Praxisbeispiele',
			subtitle:
				'Produktiv eingesetzte Projekte in den Bereichen KI, Geschäftsanwendungen und Prozessautomatisierung.'
		},
		it: {
			title: 'Casi concreti',
			subtitle:
				'Progetti operativi in ambito IA, applicazioni aziendali e automazione dei processi.'
		}
	};

	return {
		...content,
		homepage_use_cases: sortCaseCards(useCasesContent.use_case_list ?? []).slice(0, 3),
		sector_summaries: { vehicles: vehicles?.summary, batteries: batteries?.summary },
		homepage_use_cases_title: useCasesLabels[local].title,
		homepage_use_cases_subtitle: useCasesLabels[local].subtitle,
		locale: local,
		alternatePaths: buildSeoAlternatePaths('/')
	};
};
