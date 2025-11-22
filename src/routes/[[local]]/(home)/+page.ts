import { getHomePageContent, type Lang } from '$lib/data';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    const local = (params.local as Lang) || 'fr';
    const content = getHomePageContent(local);
    
    return {
        ...content,
        locale: local
    };
};
