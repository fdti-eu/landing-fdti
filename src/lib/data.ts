export const SUPPORTED_LOCALES = ['fr', 'en', 'es', 'de', 'it'] as const;
export type Lang = (typeof SUPPORTED_LOCALES)[number];

export const isSupportedLocale = (locale: string | null | undefined): locale is Lang =>
	SUPPORTED_LOCALES.includes(locale as Lang);

// Import de type seulement pour l'inférence
import type FrData from '../locales/fr.json';
import type DocumentAnalysisFrData from '../locales/document-analysis/fr.json';
export type DocumentAnalysisContent = typeof DocumentAnalysisFrData;
export type LocaleData = typeof FrData & { DocumentAnalysis: DocumentAnalysisContent };

export type HomePageContent = LocaleData['GetHomePageContent'];
export type CGUContent = LocaleData['GetCGUContent'];
export type PrivacyContent = LocaleData['GetPrivacyContent'];
export type UseCasesContent = LocaleData['GetUseCasesContent'];

const loaders: Record<Lang, () => Promise<LocaleData>> = {
	fr: async () => ({
		...(await import('../locales/fr.json')).default,
		DocumentAnalysis: (await import('../locales/document-analysis/fr.json')).default
	}),
	en: async () => ({
		...(await import('../locales/en.json')).default,
		DocumentAnalysis: (await import('../locales/document-analysis/en.json')).default
	}),
	es: async () => ({
		...(await import('../locales/es.json')).default,
		DocumentAnalysis: (await import('../locales/document-analysis/es.json')).default
	}),
	de: async () => ({
		...(await import('../locales/de.json')).default,
		DocumentAnalysis: (await import('../locales/document-analysis/de.json')).default
	}),
	it: async () => ({
		...(await import('../locales/it.json')).default,
		DocumentAnalysis: (await import('../locales/document-analysis/it.json')).default
	})
};

export async function getData(lang: Lang): Promise<LocaleData> {
	const loader = loaders[lang] || loaders.fr;
	return await loader();
}

export async function getHomePageContent(lang: Lang): Promise<HomePageContent> {
	const data = await getData(lang);
	return data.GetHomePageContent;
}

export async function getCGUContent(lang: Lang): Promise<CGUContent> {
	const data = await getData(lang);
	return data.GetCGUContent;
}

export async function getPrivacyContent(lang: Lang): Promise<PrivacyContent> {
	const data = await getData(lang);
	return data.GetPrivacyContent;
}

export async function getUseCasesContent(lang: Lang): Promise<UseCasesContent> {
	const data = await getData(lang);
	return data.GetUseCasesContent;
}
