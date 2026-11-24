import { getData, getUseCasesContent, SUPPORTED_LOCALES, type Lang } from '#lib/data.ts';
import { buildLocalizedUrl, type SeoAlternatePaths } from '#lib/functions/seo.ts';
import { getJobOffers, type JobOffer } from '#lib/jobs.ts';
import { offerPaths } from '#lib/expertise-offers.ts';
import { solutionPageIds, solutionPageLocales, solutionPagePath } from '#lib/solution-pages.ts';

type SitemapPage = {
	path: string;
	changefreq: string;
	priority: string;
};

type UseCase = Awaited<ReturnType<typeof getUseCasesContent>>['use_case_list'][number];

const staticPages: SitemapPage[] = [
	...Object.values(offerPaths).map((path) => ({ path, changefreq: 'monthly', priority: '0.90' })),
	{ path: '/', changefreq: 'weekly', priority: '1.00' },
	{ path: '/filieres', changefreq: 'monthly', priority: '0.95' },
	{ path: '/filieres/justice', changefreq: 'monthly', priority: '0.90' },
	{ path: '/solutions', changefreq: 'weekly', priority: '0.95' },
	{ path: '/realisations', changefreq: 'weekly', priority: '0.95' },
	{ path: '/filieres/economie-circulaire', changefreq: 'monthly', priority: '0.90' },
	{ path: '/solutions/analyse-documentaire', changefreq: 'monthly', priority: '0.90' },
	{ path: '/confidentialite', changefreq: 'monthly', priority: '0.60' },
	{ path: '/condition-utilisation', changefreq: 'monthly', priority: '0.60' }
];

const buildSharedPaths = (path: string): SeoAlternatePaths =>
	Object.fromEntries(SUPPORTED_LOCALES.map((locale) => [locale, path])) as SeoAlternatePaths;

const buildUrlEntry = (
	paths: SeoAlternatePaths,
	locale: Lang,
	changefreq: string,
	priority: string
) => {
	const localizedUrls = Object.fromEntries(
		SUPPORTED_LOCALES.map((supportedLocale) => [
			supportedLocale,
			buildLocalizedUrl(paths[supportedLocale], supportedLocale)
		])
	) as Record<Lang, string>;

	return `<url>
		<loc>${localizedUrls[locale]}</loc>
${SUPPORTED_LOCALES.map(
	(locale) =>
		`\t\t<xhtml:link rel="alternate" hreflang="${locale}" href="${localizedUrls[locale]}" />`
).join('\n')}
		<xhtml:link rel="alternate" hreflang="x-default" href="${localizedUrls.fr}" />
		<changefreq>${changefreq}</changefreq>
		<priority>${priority}</priority>
	</url>`;
};

export async function buildSitemap(format: 'full' | 'simple') {
	const urls = new Map<string, string>();
	const addLocalizedEntries = (paths: SeoAlternatePaths, changefreq: string, priority: string) => {
		for (const locale of SUPPORTED_LOCALES) {
			const location = buildLocalizedUrl(paths[locale], locale);
			urls.set(location, buildUrlEntry(paths, locale, changefreq, priority));
		}
	};

	for (const page of staticPages) {
		addLocalizedEntries(buildSharedPaths(page.path), page.changefreq, page.priority);
	}

	const useCasesByLocale = Object.fromEntries(
		await Promise.all(
			SUPPORTED_LOCALES.map(async (locale) => {
				const content = await getUseCasesContent(locale);
				const useCases = (content.use_case_list ?? []).filter(
					(useCase): useCase is UseCase & { id: string; slug: string } =>
						Boolean(useCase.id && useCase.slug)
				);
				return [locale, useCases];
			})
		)
	) as Record<Lang, Array<UseCase & { id: string; slug: string }>>;

	for (const useCase of useCasesByLocale.fr) {
		const localizedUseCases = SUPPORTED_LOCALES.map((locale) =>
			useCasesByLocale[locale].find((candidate) => candidate.id === useCase.id)
		);
		if (localizedUseCases.some((candidate) => !candidate)) continue;
		const paths = Object.fromEntries(
			SUPPORTED_LOCALES.map((locale, index) => [
				locale,
				`/realisations/${localizedUseCases[index]!.slug}`
			])
		) as SeoAlternatePaths;
		addLocalizedEntries(paths, 'monthly', '0.80');
	}

	addLocalizedEntries(buildSharedPaths('/offres-emploi'), 'weekly', '0.80');
	const jobsByLocale = Object.fromEntries(
		SUPPORTED_LOCALES.map((locale) => [locale, getJobOffers(locale)])
	) as Record<Lang, JobOffer[]>;
	for (const job of jobsByLocale.fr) {
		const paths = Object.fromEntries(
			SUPPORTED_LOCALES.map((locale) => {
				const localizedJob =
					jobsByLocale[locale].find((candidate) => candidate.id === job.id) ?? job;
				return [locale, `/offres-emploi/${localizedJob.slug}`];
			})
		) as SeoAlternatePaths;
		addLocalizedEntries(paths, 'weekly', '0.75');
	}

	const circularEconomyByLocale = Object.fromEntries(
		await Promise.all(
			SUPPORTED_LOCALES.map(async (locale) => [locale, (await getData(locale)).CircularEconomy])
		)
	) as Record<Lang, Awaited<ReturnType<typeof getData>>['CircularEconomy']>;
	for (const [index] of circularEconomyByLocale.fr.dossiers.entries()) {
		const localizedDossiers = SUPPORTED_LOCALES.map(
			(locale) => circularEconomyByLocale[locale].dossiers[index]
		);
		if (localizedDossiers.some((dossier) => !dossier?.slug)) continue;
		const paths = Object.fromEntries(
			SUPPORTED_LOCALES.map((locale, localeIndex) => [
				locale,
				`/filieres/economie-circulaire/${localizedDossiers[localeIndex]!.slug}`
			])
		) as SeoAlternatePaths;
		addLocalizedEntries(paths, 'monthly', '0.75');
	}

	const documentAnalysisByLocale = Object.fromEntries(
		await Promise.all(
			SUPPORTED_LOCALES.map(async (locale) => [locale, (await getData(locale)).DocumentAnalysis])
		)
	) as Record<Lang, Awaited<ReturnType<typeof getData>>['DocumentAnalysis']>;
	for (const [index] of documentAnalysisByLocale.fr.guides.entries()) {
		const localizedGuides = SUPPORTED_LOCALES.map(
			(locale) => documentAnalysisByLocale[locale].guides[index]
		);
		if (localizedGuides.some((guide) => !guide?.slug)) continue;
		const paths = Object.fromEntries(
			SUPPORTED_LOCALES.map((locale, localeIndex) => [
				locale,
				`/solutions/analyse-documentaire/${localizedGuides[localeIndex]!.slug}`
			])
		) as SeoAlternatePaths;
		addLocalizedEntries(paths, 'monthly', '0.75');
	}

	// Family pages are listed only for the locales in which they are published.
	for (const id of solutionPageIds) {
		const path = solutionPagePath(id);
		const alternates = solutionPageLocales
			.map(
				(locale) =>
					`\t\t<xhtml:link rel="alternate" hreflang="${locale}" href="${buildLocalizedUrl(path, locale)}" />`
			)
			.join('\n');
		for (const locale of solutionPageLocales) {
			const location = buildLocalizedUrl(path, locale);
			urls.set(
				location,
				`<url>
		<loc>${location}</loc>
${alternates}
		<xhtml:link rel="alternate" hreflang="x-default" href="${buildLocalizedUrl(path, 'fr')}" />
		<changefreq>monthly</changefreq>
		<priority>0.90</priority>
	</url>`
			);
		}
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${(format === 'simple' ? [...urls.keys()].map((url) => `<url><loc>${url}</loc></url>`) : [...urls.values()]).join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
