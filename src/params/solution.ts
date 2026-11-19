import { isSolutionId } from '$lib/solution-pages';

export const match = (param: string) => isSolutionId(param);
