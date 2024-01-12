<script lang="ts">
	import type { PageData } from './$houdini';

	export let data: PageData;

	$: ({ GetPrivacyContent } = data);

	$: pageContent = $GetPrivacyContent?.data;
	$: translatedContent = pageContent?.privacy?.translations?.length
		? pageContent.privacy.translations[0]
		: null;
</script>

<section class="relative max-w-screen-xl space-y-8 mx-auto py-16 mt-20 lg:px-12 md:py-24">
	{#if translatedContent}
		<div>
			<h1 class="text-3xl font-bold text-center md:text-4xl">{translatedContent.title || ''}</h1>
			<div class="relative h-4 flex justify-center my-2">
				<div class="absolute top-1/2 -translate-y-1/2 h-2 w-20 bg-yellow z-10" />
				<div
					class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-80 h-px bg-black"
				/>
			</div>
		</div>
		<div class="prose max-w-4xl mx-auto px-2 list-disc">
			{@html translatedContent.content}
		</div>
	{/if}
</section>
