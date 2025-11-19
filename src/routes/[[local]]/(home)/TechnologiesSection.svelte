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
						img?: { url?: string | null; width?: number | null; height?: number | null } | null;
					}[];
				}[];
		  }
		| null;

	$: technologyList = content?.technology_category_list || [];

	let openIndex: number | null = null;
	let hoverIndex: number | null = null;

	const DEFAULT_IMG_WIDTH = 140;
	const DEFAULT_IMG_HEIGHT = 56;

	function handleToggle(index: number) {
		openIndex = openIndex === index ? null : index;
	}

	function handleMouseEnter(index: number) {
		hoverIndex = index;
	}

	function handleMouseLeave() {
		hoverIndex = null;
	}
</script>

{#if technologyList && content?.status === 'published'}
	<section class="relative max-w-5xl space-y-8 mx-auto md:px-12 py-16 md:py-24" id="technologies">
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
			{#each technologyList as category, index}
				{@const isOpen = openIndex === index || hoverIndex === index}
				<TechnoList
					title={category?.title || ''}
					description={category?.description || ''}
					iconLink={category?.category_icon?.url || ''}
					{isOpen}
					onToggle={() => handleToggle(index)}
					onMouseEnter={() => handleMouseEnter(index)}
					onMouseLeave={handleMouseLeave}
				>
					{#if category?.technology_list && category?.technology_list.length}
						{#each category.technology_list as technology}
							<TechnoItem
								link={technology?.url || ''}
								imgUrl={technology?.img?.url || null}
								imgWidth={technology?.img?.width ?? DEFAULT_IMG_WIDTH}
								imgHeight={technology?.img?.height ?? DEFAULT_IMG_HEIGHT}
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
