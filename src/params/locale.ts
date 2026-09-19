import { isSupportedLocale } from '$lib/data';

export const match = (param: string) => isSupportedLocale(param);
