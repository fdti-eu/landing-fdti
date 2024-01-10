<script lang="ts">
	import { _, locale } from 'svelte-i18n';

	import { getCGUContentStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { browser } from '$app/environment';

	export let data: PageData;
	let translatedContent;
	let pageContent;
	async function refreshContent() {
		let store = new getCGUContentStore();
		let result = await store.fetch({
			variables: { name: $locale === 'fr' ? 'French' : 'English' }
		});
		pageContent = result.data;
	}
	$: if (browser && $locale) refreshContent();

	$: if (pageContent?.CGU?.translations?.length)
		translatedContent = pageContent.CGU.translations[0];
</script>

{#if translatedContent}
	<div>
		<div class=" text-3xl mt-32 mx-6 text-center flex justify-center text-grey1 font-bold">
			{translatedContent.title}
		</div>
		<div class="prose px-8 max-w-4xl mx-auto py-20">{@html translatedContent.content}</div>
	</div>

	<style>
		li {
			list-style-type: circle;
		}
	</style>
{/if}
