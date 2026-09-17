import { browser } from '$app/environment';
import { isSupportedLocale, type Lang } from '$lib/data';
import { init, register, locale } from 'svelte-i18n';

const defaultLocale: Lang = 'fr';
const LOCALE_STORAGE_KEY = 'fdti_locale';

register('en', () => import('$locales/en.json'));
register('fr', () => import('$locales/fr.json'));
register('es', () => import('$locales/es.json'));

const storedLocale = browser ? localStorage.getItem(LOCALE_STORAGE_KEY) : null;
const browserLocale = browser ? window.navigator.language?.slice(0, 2).toLowerCase() : null;
const initialLocale = isSupportedLocale(storedLocale)
	? storedLocale
	: isSupportedLocale(browserLocale)
		? browserLocale
		: defaultLocale;

init({
	fallbackLocale: defaultLocale,
	initialLocale
});

if (browser) {
	locale.subscribe(($locale) => {
		if (isSupportedLocale($locale)) {
			localStorage.setItem(LOCALE_STORAGE_KEY, $locale);
		}
	});
}
