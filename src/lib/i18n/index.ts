import { browser } from '$app/environment'
import { init } from 'svelte-i18n'

const defaultLocale = 'fr'

init({
    fallbackLocale: defaultLocale,
    initialLocale: browser ? window.navigator.language?.substring(0, 2) : defaultLocale,
})
