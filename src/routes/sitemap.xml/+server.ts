import { getData, getUseCasesContent, type Lang } from '$lib/data';
import { buildLocalizedUrl, type SeoAlternatePaths } from '$lib/functions/seo';
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
	{ path: '/adn-et-valeurs', changefreq: 'monthly', priority: '0.75' },
	{ path: '/fdti', changefreq: 'monthly', priority: '0.85' },
	{ path: '/confidentialite', changefreq: 'monthly', priority: '0.60' },
	{ path: '/condition-utilisation', changefreq: 'monthly', priority: '0.60' }
];

const getUseCases = async (locale: Lang) => {
	const content = await getUseCasesContent(locale);
	return (content.use_case_list ?? []).filter(
		(useCase): useCase is typeof useCase & { id: string; slug: string } =>
			Boolean(useCase.id && useCase.slug)
	);
};

const buildUrlEntry = (
	paths: SeoAlternatePaths,
	locale: Lang,
	changefreq: string,
	priority: string
) => {
	const frUrl = buildLocalizedUrl(paths.fr, 'fr');
	const enUrl = buildLocalizedUrl(paths.en, 'en');
	return `
    <url>
		<loc>${locale === 'fr' ? frUrl : enUrl}</loc>
		<xhtml:link rel="alternate" hreflang="fr" href="${frUrl}" />
		<xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
		<xhtml:link rel="alternate" hreflang="x-default" href="${frUrl}" />
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
				buildUrlEntry({ fr: page.path, en: page.path }, locale, page.changefreq, page.priority)
			);
		}
	}

	const useCasesByLocale = {
		fr: await getUseCases('fr'),
		en: await getUseCases('en')
	};
	for (const locale of locales) {
		for (const useCase of useCasesByLocale[locale]) {
			const translated = useCasesByLocale[locale === 'fr' ? 'en' : 'fr'].find(
				(item) => item.id === useCase.id
			);
			if (!translated) continue;
			const paths = {
				fr: `/realisations/${locale === 'fr' ? useCase.slug : translated.slug}`,
				en: `/realisations/${locale === 'en' ? useCase.slug : translated.slug}`
			};
			urls.push(buildUrlEntry(paths, locale, 'monthly', '0.80'));
		}
	}

	for (const locale of locales) {
		urls.push(
			buildUrlEntry({ fr: '/offres-emploi', en: '/offres-emploi' }, locale, 'weekly', '0.80')
		);
		for (const job of getJobOffers(locale)) {
			urls.push(
				buildUrlEntry(
					{ fr: `/offres-emploi/${job.slug}`, en: `/offres-emploi/${job.slug}` },
					locale,
					'weekly',
					'0.75'
				)
			);
		}
	}

	for (const locale of locales) {
		const content = (await getData(locale)).CircularEconomy;
		for (const dossier of content.dossiers) {
			const path = `/expertises/economie-circulaire/${dossier.slug}`;
			urls.push(buildUrlEntry({ fr: path, en: path }, locale, 'monthly', '0.75'));
		}
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
