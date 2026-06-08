<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import Flag from '../Flag.svelte';
	import { FLAGS } from '$lib/const';
	import { goto, invalidate } from '$app/navigation';

	let isDropdownOpen = false;

	function toggleLanguageDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	async function handleChangeLocale(code: 'fr' | 'en') {
		$locale = code;
		const link = $page.url.pathname.replace(/^\/[^/]*/, '/' + code);
		isDropdownOpen = false;
		await goto(link);
		await invalidate('app:locale');
	}
</script>

<div class="relative w-fit {$$props.class}">
	<button
		aria-label="toggle language"
		class="flex justify-center items-center gap-2 text-white hover:text-yellow transition-colors duration-300"
		on:click={toggleLanguageDropdown}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S13.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
			/>
		</svg>
	</button>
	{#if isDropdownOpen}
		<ul
			class="absolute top-full right-0 mt-2 p-2 gap-1 bg-white rounded-lg shadow-xl min-w-[120px] z-50"
		>
			{#each FLAGS as { code }}
				<li class="border-b border-darkGrey/10 last:border-none">
					<button
						value={code}
						class="flex items-center gap-3 px-3 py-2 w-full hover:bg-gray-50 transition-colors rounded-md"
						on:click={() => handleChangeLocale(code)}
					>
						<Flag local={code} class="w-6 h-6 shadow-sm rounded-full object-cover" />
						<span class="uppercase font-medium text-darkGrey text-sm">{code}</span>
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
