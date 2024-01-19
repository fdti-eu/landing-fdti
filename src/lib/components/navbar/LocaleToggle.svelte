<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import Flag from '../Flag.svelte';
	import { FLAGS } from '$lib/const';
	import { goto } from '$app/navigation';

	let isDropdownOpen = false;

	function toggleLanguageDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	async function handleChangeLocale(code: 'fr' | 'en') {
		$locale = code;
		const link = $page.url.pathname.replace(/^\/[^\/]*/, '/' + code);
		isDropdownOpen = false;
		goto(link);
	}
</script>

<div class="relative w-fit {$$props.class}">
	<button
		aria-label="toggle language"
		class="flex justify-center items-center gap-2 uppercase font-medium text-center rounded-full"
		on:click={toggleLanguageDropdown}
	>
		<Flag local={$locale} class="w-8" />
	</button>
	{#if isDropdownOpen}
		<ul class="absolute top-full -left-6 w-fit mt-1 p-1 gap-1 bg-white rounded shadow-md">
			{#each FLAGS as { code }}
				<li class="border-b border-darkGrey/20 last:border-none">
					<button
						value={code}
						class="flex items-center gap-2 px-2 py-1 rounded w-fit"
						on:click={() => handleChangeLocale(code)}
					>
						<Flag local={code} class="w-8" />
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
