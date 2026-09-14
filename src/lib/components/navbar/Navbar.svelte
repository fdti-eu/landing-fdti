<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import { afterNavigate } from '$app/navigation';
	import Hamburger from './Hamburger.svelte';
	import LocaleToggle from './LocaleToggle.svelte';

	let isNavbarOpen = false;
	let menuButton: HTMLButtonElement;
	$: links = [
		{
			href: `/${$locale}`,
			label: $locale === 'fr' ? "Page d'accueil" : 'Home',
			active: $page.url.pathname === '/' || $page.url.pathname === `/${$locale}`
		},
		{
			href: `/${$locale}/adn-et-valeurs`,
			label: $locale === 'fr' ? 'ADN et valeurs' : 'DNA and values',
			active: $page.url.pathname.includes('/adn-et-valeurs')
		},
		{
			href: `/${$locale}/cas-d-usage`,
			label: $locale === 'fr' ? 'Cas d’usage' : 'Use cases',
			active: $page.url.pathname.includes('/cas-d-usage')
		}
	];
	function closeOnEscape(event: KeyboardEvent) {
		if (event.key === 'Escape' && isNavbarOpen) {
			isNavbarOpen = false;
			menuButton?.focus();
		}
	}
	afterNavigate(() => {
		isNavbarOpen = false;
	});
</script>

<svelte:window on:keydown={closeOnEscape} />
<nav class="fdti-nav" style="view-transition-name: navbar;">
	<div class="nav-shell">
		<a href="/{$locale}" class="nav-brand">
			<figure>
				<img
					src="/images/fdti_vector_54px.svg"
					alt="Logo fdti"
					title="logo fdti"
					height="48px"
					width="48px"
				/>
			</figure>
			<span>FDTI - From Data To Insights</span>
		</a>
		<ul id="fdti-navigation" class="nav-links" class:open={isNavbarOpen}>
			{#each links as link}<li>
					<a
						href={link.href}
						class:active={link.active}
						aria-current={link.active ? 'page' : undefined}
						on:click={() => (isNavbarOpen = false)}>{link.label}</a
					>
				</li>{/each}
		</ul>
		<LocaleToggle class="nav-locale" />
		<button
			bind:this={menuButton}
			class="nav-menu-button"
			on:click={() => (isNavbarOpen = !isNavbarOpen)}
			aria-label="hamburger menu"
			aria-expanded={isNavbarOpen}
			aria-controls="fdti-navigation"><Hamburger isOpen={isNavbarOpen} /></button
		>
	</div>
</nav>
