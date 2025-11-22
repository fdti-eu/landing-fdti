import fr from '$locales/fr.json';
import en from '$locales/en.json';

export type Lang = 'fr' | 'en';
export type LocaleData = typeof fr;
export type HomePageContent = LocaleData['GetHomePageContent'];
export type CGUContent = LocaleData['GetCGUContent'];
export type DNAContent = LocaleData['GetDNAPageContent'];
export type PrivacyContent = LocaleData['GetPrivacyContent'];
export type UseCasesContent = LocaleData['GetUseCasesContent'];

const data: Record<Lang, LocaleData> = {
	fr,
	en
};

export function getData(lang: Lang): LocaleData {
	return data[lang] || data.fr;
}

export function getHomePageContent(lang: Lang): HomePageContent {
	return getData(lang).GetHomePageContent;
}

export function getCGUContent(lang: Lang): CGUContent {
	return getData(lang).GetCGUContent;
}

export function getDNAPageContent(lang: Lang): DNAContent {
	return getData(lang).GetDNAPageContent;
}

export function getPrivacyContent(lang: Lang): PrivacyContent {
	return getData(lang).GetPrivacyContent;
}

export function getUseCasesContent(lang: Lang): UseCasesContent {
	return getData(lang).GetUseCasesContent;
}

