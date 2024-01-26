<script lang="ts">
	import type { GetHomePageContent$result } from '$houdini';
	import Underline from '$lib/components/Underline.svelte';

	export let content: GetHomePageContent$result['trust_content'];
	export let cii: GetHomePageContent$result['CII'];

	$: translatedContent = content?.translations?.length ? content?.translations[0] : null;
</script>

{#if content && translatedContent && content.status === 'published'}
	<section class="group/section max-w-screen-lg space-y-8 mx-auto md:px-12 py-16 md:py-24" id="trust">
		<div>
			<h2 class="text-3xl font-bold text-center md:text-4xl">
				{translatedContent.title || 'Technologies'}
			</h2>
			<Underline />
		</div>
		{#if content.company_list?.length}
			<div class="flex flex-wrap items-center justify-center gap-8">
				{#each content.company_list as company}
					<div class="flex justify-center w-20 md:w-24">
						<img
							src="https://cms.fdti.eu/assets/{company?.img?.id}"
							alt={company?.name || 'Company logo'}
							title={company?.name || 'Company logo'}
							width="240"
							height="240"
						/>
					</div>
				{/each}
			</div>
			{#if cii && cii.translations?.length && cii.status === 'published'}
					<p class="text-center text-sm">{@html cii.translations[0]?.description}</p>

					<figure class="w-fit mx-auto">
						<img
							src="https://cms.fdti.eu/assets/{cii?.image?.id}"
							alt="CII"
							title="CII"
							width="150"
							height="100"
						/>
					</figure>
				{/if}
		{/if}
	</section>
{/if}
