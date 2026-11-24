import { buildSitemap } from '#lib/server/sitemap.ts';

export const prerender = true;
export const GET = () => buildSitemap('simple');
