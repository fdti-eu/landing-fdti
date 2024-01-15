<script lang="ts">
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

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	@layer base {
		@font-face {
			font-family: 'Quattrocento Sans';
			src: local('Quattrocento Sans'), local('Quattrocento-Sans'), local('quattrocento sans'),
				local('quattrocento-sans'), url('/fonts/quattrocento_sans/QuattrocentoSans-Regular.ttf');
			font-weight: normal;
			font-display: swap;
		}
		@font-face {
			font-family: 'Quattrocento Sans';
			src: local('Quattrocento Sans'), local('Quattrocento-Sans'), local('quattrocento sans'),
				local('quattrocento-sans'), url('/fonts/quattrocento_sans/QuattrocentoSans-Bold.ttf');
			font-weight: bold;
			font-display: swap;
		}
	}
</style>
