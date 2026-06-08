import { getUseCasesContent, type Lang } from '$lib/data';
import { buildLocalizedUrl } from '$lib/functions/seo';
import { jobOffers } from '$lib/jobs';

type SitemapPage = {
	path: string;
	changefreq: string;
	priority: string;
};

const locales: Lang[] = ['fr', 'en'];

const staticPages: SitemapPage[] = [
	{ path: '/', changefreq: 'weekly', priority: '1.00' },
	{ path: '/adn-et-valeurs', changefreq: 'weekly', priority: '0.90' },
	{ path: '/cas-d-usage', changefreq: 'weekly', priority: '0.95' },
	{ path: '/confidentialite', changefreq: 'monthly', priority: '0.60' },
	{ path: '/condition-utilisation', changefreq: 'monthly', priority: '0.60' }
];

const getUseCaseSlugs = async () => {
	const content = await getUseCasesContent('fr');
	const frUseCases = content.use_case_list ?? [];
	return frUseCases.map((useCase) => useCase.slug).filter((slug): slug is string => Boolean(slug));
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

	const useCaseSlugs = await getUseCaseSlugs();
	for (const slug of useCaseSlugs) {
		for (const locale of locales) {
			urls.push(
				buildUrlEntry(buildLocalizedUrl(`/cas-d-usage/${slug}`, locale), 'monthly', '0.80')
			);
		}
	}

	urls.push(buildUrlEntry(buildLocalizedUrl('/offres-emploi', 'fr'), 'weekly', '0.80'));
	for (const job of jobOffers) {
		urls.push(
			buildUrlEntry(buildLocalizedUrl(`/offres-emploi/${job.slug}`, 'fr'), 'weekly', '0.75')
		);
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
