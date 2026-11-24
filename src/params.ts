import { defineParams } from '@sveltejs/kit/params';
import { isSupportedLocale } from '#lib/data.ts';
import { isSolutionPageId } from '#lib/solution-pages.ts';

const matchLocale = (param: string) => isSupportedLocale(param);

const matchSolution = (param: string) => isSolutionPageId(param);

export const params = defineParams({
	locale: (param) => (matchLocale(param) ? param : undefined),
	solution: (param) => (matchSolution(param) ? param : undefined)
});
