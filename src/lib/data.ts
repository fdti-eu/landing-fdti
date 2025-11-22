export type Lang = 'fr' | 'en';

// Import de type seulement pour l'inférence
import type FrData from '../locales/fr.json';
export type LocaleData = typeof FrData;

export type HomePageContent = LocaleData['GetHomePageContent'];
export type CGUContent = LocaleData['GetCGUContent'];
export type DNAContent = LocaleData['GetDNAPageContent'];
export type PrivacyContent = LocaleData['GetPrivacyContent'];
export type UseCasesContent = LocaleData['GetUseCasesContent'];

const loaders: Record<Lang, () => Promise<LocaleData>> = {
	fr: () => import('../locales/fr.json').then((m) => m.default),
	en: () => import('../locales/en.json').then((m) => m.default)
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

export async function getDNAPageContent(lang: Lang): Promise<DNAContent> {
	const data = await getData(lang);
	return data.GetDNAPageContent;
}

export async function getPrivacyContent(lang: Lang): Promise<PrivacyContent> {
	const data = await getData(lang);
	return data.GetPrivacyContent;
}

export async function getUseCasesContent(lang: Lang): Promise<UseCasesContent> {
	const data = await getData(lang);
	return data.GetUseCasesContent;
}
