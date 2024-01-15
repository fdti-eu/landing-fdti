<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import Hamburger from './Hamburger.svelte';
	import LocaleToggle from './LocaleToggle.svelte';

	let isNavbarOpen = false;

	let windowY: number;
	let windowHeight: number;

	function handleToggleNav() {
		isNavbarOpen = !isNavbarOpen;
	}
</script>

<svelte:window bind:scrollY={windowY} bind:innerHeight={windowHeight} />

<nav
	class="{$page.url.pathname === '/' ||
	($page.url.pathname === `/${$locale}` && windowY < windowHeight)
		? 'absolute transition-all duration-300'
		: ($page.url.pathname === '/' || ($page.url.pathname === `/${$locale}` && windowY > windowHeight))
		? 'fixed bg-darkGrey transition-all duration-300'
		: 'fixed bg-darkGrey'} top-0 left-0 w-full p-4 z-50 xl:p-8 "
>
	<div
		class="w-full max-w-screen-xl flex justify-between items-center gap-4 mx-auto md:grid md:grid-cols-5 xl:grid-cols-3 md:justify-items-center"
	>
		<a href="/{$locale}" class="flex items-center gap-4 mr-auto lg:col-span-2 xl:col-span-1">
			<figure
				class="w-12 aspect-square flex justify-center items-center rounded-full border border-yellow"
			>
				<img
					class="w-8"
					src="/images/fdti_vector_54px.svg"
					alt="Logo fdti"
					title="logo fdti"
					height="48px"
					width="48px"
				/>
			</figure>
			<span class="text-yellow font-bold text-lg hidden lg:inline">FDTI - From Data To Insight</span
			>
		</a>
		<ul
			class="{isNavbarOpen
				? 'absolute top-20 z-50 left-0 flex flex-col bg-darkGrey pl-16 md:static md:bg-transparent md:flex-row md:p-0'
				: 'static hidden md:flex md:p-0'} whitespace-nowrap w-full gap-4 p-8 text-white md:col-span-3 lg:col-span-2 lg:gap-8 xl:col-span-1"
		>
			<li>
				<a
					href="/{$locale}"
					class={$page.url.pathname === '/' || $page.url.pathname === `/${$locale}`
						? 'text-yellow'
						: ''}
					on:click={handleToggleNav}
				>
					{$locale === 'fr' ? "Page d'accueil" : 'Home'}
				</a>
			</li>
			<li>
				<a
					href="/{$locale}/approche-fdti"
					class={$page.url.pathname.includes('/approche-fdti') ? 'text-yellow' : ''}
					on:click={handleToggleNav}
				>
					{$locale === 'fr' ? "L'approche FDTI" : 'The FDTI approach'}
				</a>
			</li>
			<li>
				<a
					href="/{$locale}/adn-et-valeurs"
					class={$page.url.pathname.includes('/adn-et-valeurs') ? 'text-yellow' : ''}
					on:click={handleToggleNav}
				>
					{$locale === 'fr' ? 'ADN et valeurs' : 'DNA and values'}
				</a>
			</li>
		</ul>
		<LocaleToggle class="md:justify-self-end" />
		<button class="md:hidden" on:click={handleToggleNav} aria-label="hamburger menu">
			<Hamburger />
		</button>
	</div>
</nav>
