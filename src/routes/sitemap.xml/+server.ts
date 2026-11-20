import { buildSitemap } from '$lib/server/sitemap';

export const prerender = true;
export const GET = () => buildSitemap('full');
