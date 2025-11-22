<script lang="ts">
	import '../app.css';
	import '$lib/i18n';
	import { isLoading, _, locale } from 'svelte-i18n';
	import Footer from './Footer.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';

	$: if($page.url.pathname.includes('/fr')) {
		$locale = 'fr';
	} else if($page.url.pathname.includes('/en')) {
		$locale = 'en';
	}

	// Générer les URLs hreflang pour la page actuelle
	$: currentPath = $page.url.pathname;
	$: pathWithoutLocale = currentPath.replace(/^\/(fr|en)/, '') || '/';
	$: frUrl = `https://www.fdti.eu/fr${pathWithoutLocale}`;
	$: enUrl = `https://www.fdti.eu/en${pathWithoutLocale}`;
	$: xDefaultUrl = `https://www.fdti.eu/fr${pathWithoutLocale}`; // Default to French

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
	<div class="min-h-screen flex flex-col font-quattrocento ">
		<Navbar />
		<main class="flex-1">
			<slot />
		</main>
		<Footer />
	</div>
{/if}

