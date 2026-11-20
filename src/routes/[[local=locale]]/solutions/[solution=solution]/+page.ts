import { error } from '@sveltejs/kit';
import { getUseCasesContent, type Lang } from '$lib/data';
import {
	buildSolutionAlternatePaths,
	solutionPageIds,
	solutionPageLocales,
	solutionPages,
	type SolutionPageId
} from '$lib/solution-pages';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return solutionPageLocales.flatMap((local) =>
		solutionPageIds.map((solution) => ({ local, solution }))
	);
}

export const load: PageLoad = async ({ params }) => {
	const locale = (params.local as Lang) || 'fr';
	const id = params.solution as SolutionPageId;
	const content = solutionPages[locale];
	if (!content) error(404, 'Not found');

	const work = await getUseCasesContent(locale);
	return {
		locale,
		id,
		content,
		alternatePaths: buildSolutionAlternatePaths(id),
		alternateLocales: solutionPageLocales,
		projects: work.use_case_list.map(({ id, title, slug, category }) => ({
			id,
			title,
			slug,
			category
		}))
	};
};
