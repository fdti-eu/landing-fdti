import { error } from '@sveltejs/kit';
import { getUseCasesContent, type Lang } from '$lib/data';
import { solutionIds, type SolutionId } from '$lib/navigation';
import {
	buildSolutionAlternatePaths,
	solutionPageLocales,
	solutionPages
} from '$lib/solution-pages';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return solutionPageLocales.flatMap((local) =>
		solutionIds.map((solution) => ({ local, solution }))
	);
}

export const load: PageLoad = async ({ params }) => {
	const locale = (params.local as Lang) || 'fr';
	const id = params.solution as SolutionId;
	const content = solutionPages[locale];
	if (!content) error(404, 'Not found');

	const work = await getUseCasesContent(locale);
	return {
		locale,
		id,
		content,
		alternatePaths: buildSolutionAlternatePaths(id),
		projects: work.use_case_list.map(({ id, title, slug, category }) => ({
			id,
			title,
			slug,
			category
		}))
	};
};
