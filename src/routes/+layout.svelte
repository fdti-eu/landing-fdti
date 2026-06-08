<script lang="ts">
	import '../app.css';
	import '$lib/i18n';
	import { isLoading, locale } from 'svelte-i18n';
	import Footer from './Footer.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';
	import {
		buildAbsoluteUrl,
		buildLocalizedUrl,
		resolveLocaleFromPath,
		stripLocaleFromPath
	} from '$lib/functions/seo';

	$: detectedLocale = resolveLocaleFromPath($page.url.pathname);
	$: if ($locale !== detectedLocale) {
		$locale = detectedLocale;
	}

	// Générer les URLs hreflang pour la page actuelle
	$: currentPathWithoutLocale = stripLocaleFromPath($page.url.pathname);
	$: frUrl = buildLocalizedUrl(currentPathWithoutLocale, 'fr');
	$: enUrl = buildLocalizedUrl(currentPathWithoutLocale, 'en');
	$: xDefaultUrl = buildAbsoluteUrl(currentPathWithoutLocale);

	// Activer les view transitions tout en préservant le scroll natif de SvelteKit
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="alternate" hreflang="fr" href={frUrl} />
	<link rel="alternate" hreflang="en" href={enUrl} />
	<link rel="alternate" hreflang="x-default" href={xDefaultUrl} />
</svelte:head>

{#if !$isLoading}
	<div class="min-h-screen flex flex-col font-quattrocento">
		<Navbar />
		<main class="flex-1">
			<slot />
		</main>
		<Footer />
	</div>
{/if}
