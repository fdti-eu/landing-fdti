import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return [{ local: 'fr' }, { local: 'en' }];
}

export const load: PageLoad = ({ params }) => {
	throw redirect(308, `/${params.local || 'fr'}/realisations`);
};
