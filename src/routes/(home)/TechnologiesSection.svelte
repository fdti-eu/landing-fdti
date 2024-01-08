<script lang="ts">
	import TechnoItem from './TechnoItem.svelte';
	import TechnoList from './TechnoList.svelte';

	import type { getHomePageContent$result } from '$houdini';

	export let content: getHomePageContent$result['technology_content'];
	let translatedContent;
	let technologyList;
	$: if (content?.translations?.length) translatedContent = content?.translations[0];
	$: if (content) technologyList = content?.technology_category_list;
</script>

{#if technologyList && translatedContent && content?.status === 'published'}
	<section class="relative py-16 md:py-24 bg-white">
		<div>
			<div class="max-w-screen-wrap mx-auto px-3  ">
				<div>
					<div class="max-w-screen-mv mx-auto">
						<h2 class="text-3xl md:text-4xl font-bold text-center">{translatedContent?.title}</h2>
						<div class="flex justify-center my-2 relative h-4">
							<span class="bg-yellow h-2 w-20  absolute top-1/2 -translate-y-1/2 z-10" />
							<span
								class="bg-black w-80 h-px absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
							/>
						</div>
					</div>

					<p
						class="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold pt-7 text-center lg:leading-snug md:leading-snug sm:leading-snug"
					>
						{translatedContent?.subtitle}
					</p>
				</div>
				<div class="flex flex-col pt-16 md:pt-24 w-full space-y-14">
					{#each technologyList as category}
						<TechnoList
							title={category.title}
							description={category?.translations.length
								? category.translations[0].description
								: ''}
							iconLink={category?.category_icon?.id || ''}
						>
							{#each category.technology_list as technology}
								<TechnoItem
									link={technology.url}
									imgUrl={'https://cms.fdti.eu/assets/' + technology.img.id}
									imgWidth={100}
									imgHeight={40}
									ariaLabel="Link to {technology.name} documentation"
									name={technology?.name}
								/>
							{/each}
						</TechnoList>
					{/each}
				</div>
			</div>
		</div>
	</section>
{/if}
