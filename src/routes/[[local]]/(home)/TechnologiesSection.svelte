<script lang="ts">
	import Underline from '$lib/components/Underline.svelte';
	import TechnoItem from './TechnoItem.svelte';
	import TechnoList from './TechnoList.svelte';

	export let content:
		| {
				status?: string | null;
				title?: string | null;
				subtitle?: string | null;
				technology_category_list?: {
					title?: string | null;
					description?: string | null;
					category_icon?: { url?: string | null } | null;
					technology_list?: {
						name?: string | null;
						url?: string | null;
						img?: { url?: string | null } | null;
					}[];
				}[];
		  }
		| null;

	$: technologyList = content?.technology_category_list || [];
</script>

{#if technologyList && content?.status === 'published'}
	<section class="relative max-w-screen-lg space-y-8 mx-auto md:px-12 py-16 md:py-24" id="technologies">
		<div class="group">
			<h2 class="text-3xl font-bold text-center md:text-4xl">
				{content.title || 'Technologies'}
			</h2>
			<Underline />
		</div>
		<h3 class="text-xl font-bold text-center sm:text-2xl md:text-3xl lg:text-4xl">
			{content.subtitle ||
				'Nous utilisons des outils modernes adaptés à chaque situation rencontrée lors du traitement de vos données'}
		</h3>
		<article class="w-full flex flex-col gap-14 md:pt-14">
			{#each technologyList as category}
				<TechnoList
					title={category?.title || ''}
					description={category?.description || ''}
					iconLink={category?.category_icon?.url || ''}
				>
					{#if category?.technology_list && category?.technology_list.length}
						{#each category.technology_list as technology}
							<TechnoItem
								link={technology?.url || ''}
								imgUrl={technology?.img?.url || null}
								imgWidth={100}
								imgHeight={40}
								ariaLabel={technology?.name ? `Link to ${technology.name} documentation.` : "Link to documentation."}
								name={technology?.name}
							/>
						{/each}
					{/if}
				</TechnoList>
			{/each}
		</article>
	</section>
{/if}
