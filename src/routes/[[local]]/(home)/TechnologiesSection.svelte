<script lang="ts">
	import type { GetHomePageContent$result } from '$houdini';
	import TechnoItem from './TechnoItem.svelte';
	import TechnoList from './TechnoList.svelte';

	export let content: GetHomePageContent$result['technology_content'];

	$: translatedContent = content?.translations?.length ? content?.translations[0] : null;

	$: technologyList = content?.technology_category_list || [];
</script>

{#if technologyList && translatedContent && content?.status === 'published'}
	<section class="relative max-w-screen-lg space-y-8 mx-auto md:px-12 py-16 md:py-24" id="technologies">
		<div>
			<h2 class="text-3xl font-bold text-center md:text-4xl">
				{translatedContent.title || 'Technologies'}
			</h2>
			<div class="relative h-4 flex justify-center my-2">
				<div class="absolute top-1/2 -translate-y-1/2 h-2 w-20 bg-yellow z-10" />
				<div
					class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-80 h-px bg-black"
				/>
			</div>
		</div>
		<h3 class="text-xl font-bold text-center sm:text-2xl md:text-3xl lg:text-4xl">
			{translatedContent.subtitle ||
				'Nous utilisons des outils modernes adaptés à chaque situation rencontrée lors du traitement de vos données'}
		</h3>
		<article class="w-full flex flex-col gap-14 md:pt-14">
			{#each technologyList as category}
				<TechnoList
					title={category?.title || ''}
					description={category?.translations?.length && category.translations[0]?.description ? category.translations[0].description : ''}
					iconLink={category?.category_icon?.id || ''}
				>
					{#if category?.technology_list && category?.technology_list.length}
						{#each category.technology_list as technology}
							<TechnoItem
								link={technology?.url || ''}
								imgUrl={technology?.img?.id ? 'https://cms.fdti.eu/assets/' + technology.img.id : null}
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


