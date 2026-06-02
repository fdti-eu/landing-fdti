<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import Hamburger from './Hamburger.svelte';
	import LocaleToggle from './LocaleToggle.svelte';

	import { slide } from 'svelte/transition';
	let isNavbarOpen = false;

	let windowY: number;
	let windowHeight: number;

	// Variables pour l'effet de halo
	let hoverStyle = { left: 0, width: 0, opacity: 0 };
	let navListElement: HTMLUListElement;

	function handleToggleNav() {
		isNavbarOpen = !isNavbarOpen;
	}

	function handleMouseEnter(e: MouseEvent) {
		const target = e.target as HTMLElement;
		// On s'assure de cibler le <li> ou le <a> pour récupérer les dimensions
		const li = target.closest('li'); 
		if (li && navListElement) {
			// Use offsetLeft/offsetWidth relative to the parent UL instead of getBoundingClientRect
			// because the halo is absolute positioned inside the relative UL
			hoverStyle = {
				left: li.offsetLeft,
				width: li.offsetWidth,
				opacity: 1
			};
		}
	}

	function handleMouseLeave() {
		hoverStyle = { ...hoverStyle, opacity: 0 };
	}
</script>

<svelte:window bind:scrollY={windowY} bind:innerHeight={windowHeight} />

<nav
	style="view-transition-name: navbar;"
	class="{($page.url.pathname === '/' && windowY < windowHeight - 120) ||
	($page.url.pathname === `/${$locale}` && windowY < windowHeight - 120)
		? 'md:absolute transition-all duration-300'
		: ''} fixed bg-darkGrey top-0 left-0 w-full p-4 z-50 xl:p-8"
>
	<div
		class="{($page.url.pathname === '/' && windowY < windowHeight - 120 && windowY > 120) ||
		($page.url.pathname === `/${$locale}` && windowY < windowHeight - 120 && windowY > 120)
			? 'md:opacity-0'
			: 'opacity-100'} transition-all duration-500 w-full max-w-7xl flex justify-between items-center gap-4 mx-auto md:grid md:grid-cols-5 xl:grid-cols-3 md:justify-items-center"
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
			<span class="text-yellow font-bold text-base hidden xl:inline"
				>FDTI - From Data To Insights</span
			>
		</a>

		<!-- Mobile Menu Overlay -->
		{#if isNavbarOpen}
			<div 
				class="fixed inset-0 bg-black/95 z-40 flex flex-col justify-center items-center md:hidden"
				transition:slide={{ duration: 300, axis: 'y' }}
			>
				<ul class="flex flex-col gap-8 text-center text-2xl">
					<li>
						<a
							href="/{$locale}"
							class="{$page.url.pathname === '/' || $page.url.pathname === `/${$locale}`
								? 'text-yellow'
								: 'text-white'} hover:text-yellow transition-colors"
							on:click={handleToggleNav}
						>
							{$locale === 'fr' ? "Page d'accueil" : 'Home'}
						</a>
					</li>
					<li>
						<a
							href="/{$locale}/adn-et-valeurs"
							class="{$page.url.pathname.includes('/adn-et-valeurs') ? 'text-yellow' : 'text-white'} hover:text-yellow transition-colors"
							on:click={handleToggleNav}
						>
							{$locale === 'fr' ? 'ADN et valeurs' : 'DNA and values'}
						</a>
					</li>
					<li>
						<a
							href="/{$locale}/cas-d-usage"
							class="{$page.url.pathname.includes('/cas-d-usage') ? 'text-yellow' : 'text-white'} hover:text-yellow transition-colors"
							on:click={handleToggleNav}
						>
							{$locale === 'fr' ? 'Cas d’usage' : 'Use cases'}
						</a>
					</li>
				</ul>
			</div>
		{/if}

		<!-- Desktop Menu -->
		<ul
			bind:this={navListElement}
			class="hidden md:flex md:p-0 relative whitespace-nowrap w-full gap-4 p-8 text-white text-base md:text-lg transition-all md:col-span-3 lg:col-span-2 lg:gap-8 xl:col-span-1"
			on:mouseleave={handleMouseLeave}
		>
			<!-- Halo element -->
			<div
				class="absolute h-8 bg-white/10 rounded-md pointer-events-none transition-all duration-300 ease-out hidden md:block"
				style="left: {hoverStyle.left}px; width: {hoverStyle.width}px; opacity: {hoverStyle.opacity}; top: 50%; transform: translateY(-50%);"
			></div>

			<li on:mouseenter={handleMouseEnter} class="relative z-10">
				<a
					href="/{$locale}"
					class="{$page.url.pathname === '/' || $page.url.pathname === `/${$locale}`
						? 'text-yellow'
						: ''} block px-4 py-2 hover:text-yellow transition-all duration-300"
				>
					{$locale === 'fr' ? "Page d'accueil" : 'Home'}
				</a>
			</li>
			<li on:mouseenter={handleMouseEnter} class="relative z-10">
				<a
					href="/{$locale}/adn-et-valeurs"
					class="{$page.url.pathname.includes('/adn-et-valeurs') ? 'text-yellow' : ''} block px-4 py-2 hover:text-yellow transition-all duration-300"
				>
					{$locale === 'fr' ? 'ADN et valeurs' : 'DNA and values'}
				</a>
			</li>
			<li on:mouseenter={handleMouseEnter} class="relative z-10">
				<a
					href="/{$locale}/cas-d-usage"
					class="{$page.url.pathname.includes('/cas-d-usage') ? 'text-yellow' : ''} block px-4 py-2 hover:text-yellow transition-all duration-300"
				>
					{$locale === 'fr' ? 'Cas d’usage' : 'Use cases'}
				</a>
			</li>
		</ul>
		<LocaleToggle class="md:justify-self-end z-50" />
		<button class="md:hidden z-50 relative" on:click={handleToggleNav} aria-label="hamburger menu" aria-expanded={isNavbarOpen}>
			<Hamburger isOpen={isNavbarOpen} />
		</button>
	</div>
</nav>
