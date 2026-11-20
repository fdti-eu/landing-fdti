import { isSolutionPageId } from '$lib/solution-pages';

export const match = (param: string) => isSolutionPageId(param);
