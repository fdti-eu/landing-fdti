import { writable } from 'svelte/store';
import type { Lang } from '#lib/data.ts';

// The root layout sets the locale from the URL before child components render.
export const locale = writable<Lang>('fr');
