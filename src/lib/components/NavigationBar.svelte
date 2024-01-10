<script>
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import Hamburger from './Hamburger.svelte';
	import { goto } from '$app/navigation';
	let language = false;
	function handleOpenLanguage() {
		language = !language;
	}
	let navbarOpen = false;
	function handleToggleNav() {
		navbarOpen = !navbarOpen;
	}
	function handleCloseNav() {
		navbarOpen = false;
	}

	async function handleChangeLocale() {
		$locale === 'fr' ? ($locale = 'en') : ($locale = 'fr');
		const link = $page.url.pathname.replace(/^\/[^\/]*/, '/' + $locale);
		goto(link);
	}
	$: if ($page.url) handleCloseNav();
</script>

{#if $locale}
	<div
		class=" z-40 bg-darkGrey  w-screen position fixed   px-4 md:px-20 xl:px-60 py-6 flex items-center justify-between "
	>
		<a href="/" class="flex items-center gap-3" aria-label="Go back to home page">
			<span
				class="flex overflow-hidden w-12 h-12 justify-center items-center rounded-full bg-grey-2 border border-yellow "
			>
				<img
					class="w-8"
					src="/images/fdti_vector_54px.svg"
					alt="Logo fdti"
					title="logo fdti"
					height="48px"
					width="48px"
				/>
			</span>
			<span class="text-yellow font-bold text-lg hidden lg:inline">FDTI - From Data To Insight</span
			>
		</a>
		<nav class=" fixed  left-1/2  -translate-x-1/2 hidden sm:block">
			<ul class="flex gap-2 sm:gap-5 text-white">
				<li>
					<a href="/" class={$page.url.pathname === '/' ? 'text-yellow' : ''}
						>{$locale === 'fr' ? "Page d'accueil" : 'Home'}</a
					>
				</li>
				<li>
					<a
						href="/approche-fdti"
						class={$page.url.pathname === '/approche-fdti' ? 'text-yellow' : ''}
					>
						{$locale === 'fr' ? "L'approche FDTI" : 'The FDTI approach'}</a
					>
				</li>
				<li>
					<a
						href="/adn-et-valeurs"
						class={$page.url.pathname === '/adn-et-valeurs' ? 'text-yellow' : ''}
						>{$locale === 'fr' ? 'ADN et valeurs' : 'DNA and values'}</a
					>
				</li>
			</ul>
		</nav>
		<button
			class="block sm:hidden absolute right-24 md:right-40 cursor-pointer"
			on:click={handleToggleNav}
		>
			<Hamburger />
		</button>
		<button
			class="relative group cursor-pointer  w-20 {language ? '-top-8' : '-top-2'}  z-50 "
			on:click={handleOpenLanguage}
		>
			<div class="flex flex-col space-y-2 {language ? 'p-4  pr-8' : ''} absolute z-50 ml-8">
				<button class="flex ">
					<div class="flex ">
						<img
							alt={$locale === 'fr' ? 'drapeau francais' : 'english flag'}
							src={$locale === 'fr' ? '/images/fr_flag.jpeg' : '/images/en_flag.jpeg'}
							title={$locale === 'fr' ? 'drapeau francais' : 'english flag'}
							class="h-5 "
							height="20"
							width="33"
						/>
						{#if language}
							<div class="text-white px-6 hover:underline">
								{$locale === 'fr' ? 'Français' : 'English'}
							</div>
						{/if}
					</div>
				</button>

				{#if language}
					<button on:click={handleChangeLocale} class="flex top-8">
						<div class="flex">
							<img
								alt={$locale === 'fr' ? 'drapeau anglais' : 'french flag'}
								src={$locale === 'fr' ? '/images/en_flag.jpeg' : '/images/fr_flag.jpeg'}
								class="h-5 "
								title={$locale === 'fr' ? 'drapeau anglais' : 'french flag'}
								height="20"
								width="33"
							/>
							<div class="text-white px-6 hover:underline">
								{$locale === 'fr' ? 'English' : 'Français'}
							</div>
						</div>
					</button>
				{/if}
			</div>
		</button>
		{#if navbarOpen}
			<nav
				class="absolute top-full z-50 left-0 w-full sm:hidden  bg-darkGrey flex justify-center items-center"
			>
				<ul class="flex gap-6 text-white flex-col sm:flex-row pb-6">
					<li><a href="/" class={$page.url.pathname === '/' ? 'text-yellow' : ''}>Home</a></li>
					<li>
						<a
							href="/approche-fdti"
							class={$page.url.pathname === '/approche-fdti' ? 'text-yellow' : ''}
							>{$locale === 'fr' ? "L'approche FDTI" : 'The FDTI approach'}</a
						>
					</li>
					<li>
						<a
							href="/adn-et-valeurs"
							class={$page.url.pathname === '/adn-et-valeurs' ? 'text-yellow' : ''}
							>{$locale === 'fr' ? 'ADN et valeurs' : 'DNA and values'}</a
						>
					</li>
				</ul>
			</nav>
		{/if}
	</div>
{/if}

<style>
</style>
