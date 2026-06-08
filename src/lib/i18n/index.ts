import { browser } from '$app/environment';
import { init, register, locale } from 'svelte-i18n';

const defaultLocale = 'fr';
const LOCALE_STORAGE_KEY = 'fdti_locale';

register('en', () => import('$locales/en.json'));
register('fr', () => import('$locales/fr.json'));

const initialLocale = browser
	? localStorage.getItem(LOCALE_STORAGE_KEY) || window.navigator.language?.slice(0, 2)
	: defaultLocale;

init({
	fallbackLocale: defaultLocale,
	initialLocale: initialLocale || defaultLocale
});

if (browser) {
	locale.subscribe(($locale) => {
		if ($locale) {
			localStorage.setItem(LOCALE_STORAGE_KEY, $locale);
		}
	});
}
