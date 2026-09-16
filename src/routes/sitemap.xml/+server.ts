import { getUseCasesContent, type Lang } from '$lib/data';
import { buildLocalizedUrl } from '$lib/functions/seo';
import { getJobOffers } from '$lib/jobs';

type SitemapPage = {
	path: string;
	changefreq: string;
	priority: string;
};

const locales: Lang[] = ['fr', 'en'];

const staticPages: SitemapPage[] = [
	{ path: '/', changefreq: 'weekly', priority: '1.00' },
	{ path: '/expertises', changefreq: 'weekly', priority: '0.95' },
	{ path: '/realisations', changefreq: 'weekly', priority: '0.95' },
	{ path: '/expertises/economie-circulaire', changefreq: 'monthly', priority: '0.90' },
	{ path: '/fdti', changefreq: 'monthly', priority: '0.85' },
	{ path: '/confidentialite', changefreq: 'monthly', priority: '0.60' },
	{ path: '/condition-utilisation', changefreq: 'monthly', priority: '0.60' }
];

const getUseCaseSlugs = async (locale: Lang) => {
	const content = await getUseCasesContent(locale);
	return (content.use_case_list ?? [])
		.map((useCase) => useCase.slug)
		.filter((slug): slug is string => Boolean(slug));
};

const buildUrlEntry = (loc: string, changefreq: string, priority: string) => {
	return `
    <url>
        <loc>${loc}</loc>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
    </url>`;
};

export const prerender = true;

export async function GET() {
	const urls: string[] = [];

	for (const locale of locales) {
		for (const page of staticPages) {
			urls.push(
				buildUrlEntry(buildLocalizedUrl(page.path, locale), page.changefreq, page.priority)
			);
		}
	}

	for (const locale of locales) {
		for (const slug of await getUseCaseSlugs(locale)) {
			urls.push(
				buildUrlEntry(buildLocalizedUrl(`/realisations/${slug}`, locale), 'monthly', '0.80')
			);
		}
	}

	for (const locale of locales) {
		urls.push(buildUrlEntry(buildLocalizedUrl('/offres-emploi', locale), 'weekly', '0.80'));
		for (const job of getJobOffers(locale)) {
			urls.push(
				buildUrlEntry(buildLocalizedUrl(`/offres-emploi/${job.slug}`, locale), 'weekly', '0.75')
			);
		}
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
