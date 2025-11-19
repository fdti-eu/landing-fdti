<script lang="ts">
	import '../app.css';
	import '$lib/i18n';
	import { isLoading, _, locale } from 'svelte-i18n';
	import Footer from './Footer.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import { page } from '$app/stores';

	$: if($page.url.pathname.includes('/fr')) {
		$locale = 'fr';
	} else if($page.url.pathname.includes('/en')) {
		$locale = 'en';
	}
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

