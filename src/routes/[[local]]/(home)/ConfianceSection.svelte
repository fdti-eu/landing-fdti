<script lang="ts">
	import Underline from '$lib/components/Underline.svelte';

	export let content:
		| {
				status?: string | null;
				title?: string | null;
				company_list?: { name?: string | null; img?: { url?: string | null } | null }[];
		  }
		| null;
	export let cii:
		| {
				status?: string | null;
				description?: string | null;
				image?: { url?: string | null } | null;
		  }
		| null;
</script>

{#if content && content.status === 'published'}
	<section class="relative max-w-screen-lg space-y-8 mx-auto md:px-12 py-16 md:py-24" id="trust">
		<div class="group">
			<h2 class="text-3xl font-bold text-center md:text-4xl">
				{content.title || 'Technologies'}
			</h2>
			<Underline />
		</div>
		{#if content.company_list?.length}
			<div class="flex flex-col items-center justify-center gap-10 md:flex-row">
				{#each content.company_list as company}
					<div class="w-60 flex justify-center">
						<img
							src={company?.img?.url || '/logo.webp'}
							alt={company?.name || 'Company logo'}
							title={company?.name || 'Company logo'}
							width="240"
							height="240"
						/>
					</div>
				{/each}
			</div>
			{#if cii && cii.status === 'published'}
				<p class="text-center text-sm">{@html cii.description || ''}</p>

				<figure class="w-fit mx-auto">
					<img src={cii?.image?.url || '/logo.webp'} alt="CII" title="CII" width="150" height="100" />
				</figure>
			{/if}
		{/if}
	</section>
{/if}
