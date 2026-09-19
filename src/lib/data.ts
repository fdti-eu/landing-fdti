export const SUPPORTED_LOCALES = ['fr', 'en', 'es', 'de', 'it'] as const;
export type Lang = (typeof SUPPORTED_LOCALES)[number];

export const isSupportedLocale = (locale: string | null | undefined): locale is Lang =>
	SUPPORTED_LOCALES.includes(locale as Lang);

// Import de type seulement pour l'inférence
import type FrData from '../locales/fr.json';
export type LocaleData = typeof FrData;

export type HomePageContent = LocaleData['GetHomePageContent'];
export type CGUContent = LocaleData['GetCGUContent'];
export type PrivacyContent = LocaleData['GetPrivacyContent'];
export type UseCasesContent = LocaleData['GetUseCasesContent'];

const loaders: Record<Lang, () => Promise<LocaleData>> = {
	fr: () => import('../locales/fr.json').then((m) => m.default),
	en: () => import('../locales/en.json').then((m) => m.default),
	es: () => import('../locales/es.json').then((m) => m.default),
	de: () => import('../locales/de.json').then((m) => m.default),
	it: () => import('../locales/it.json').then((m) => m.default)
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
