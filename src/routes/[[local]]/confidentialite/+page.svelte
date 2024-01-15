<script lang="ts">
	import Underline from '$lib/components/Underline.svelte';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$houdini';

	export let data: PageData;

	$: ({ GetPrivacyContent } = data);

	$: pageContent = $GetPrivacyContent?.data;
	$: translatedContent = pageContent?.privacy?.translations?.length
		? pageContent.privacy.translations[0]
		: null;
</script>

<section
	class="group/section relative max-w-screen-xl space-y-8 mx-auto py-16 mt-20 lg:px-12 md:py-24"
	in:fade
>
	{#if translatedContent}
		<div>
			<h1 class="text-3xl font-bold text-center md:text-4xl">{translatedContent.title || ''}</h1>
			<Underline />
		</div>
		<div class="prose text-current max-w-4xl mx-auto px-2 list-disc">
			{@html translatedContent.content}
		</div>
	{/if}
</section>
