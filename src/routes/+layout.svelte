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

{#if !$isLoading}
	<div class="min-h-screen flex flex-col font-quattrocento ">
		<Navbar />
		<main class="flex-1">
			<slot />
		</main>
		<Footer />
	</div>
{/if}

