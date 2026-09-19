import { getData, getUseCasesContent, SUPPORTED_LOCALES, type Lang } from '$lib/data';
import { buildLocalizedUrl, type SeoAlternatePaths } from '$lib/functions/seo';
import { getJobOffers, type JobOffer } from '$lib/jobs';

type SitemapPage = {
	path: string;
	changefreq: string;
	priority: string;
};

type UseCase = Awaited<ReturnType<typeof getUseCasesContent>>['use_case_list'][number];

const staticPages: SitemapPage[] = [
	{ path: '/', changefreq: 'weekly', priority: '1.00' },
	{ path: '/expertises', changefreq: 'weekly', priority: '0.95' },
	{ path: '/realisations', changefreq: 'weekly', priority: '0.95' },
	{ path: '/expertises/economie-circulaire', changefreq: 'monthly', priority: '0.90' },
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

export const prerender = true;

export async function GET() {
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
				`/expertises/economie-circulaire/${localizedDossiers[localeIndex]!.slug}`
			])
		) as SeoAlternatePaths;
		addLocalizedEntries(paths, 'monthly', '0.75');
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...urls.values()].join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
