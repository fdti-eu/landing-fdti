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

	let openIndex: number | null = null;
	let hoverIndex: number | null = null;

	const LARGE_IMG_WIDTH = 180;
	const LARGE_IMG_HEIGHT = 72;
	const COMPACT_IMG_WIDTH = 96;
	const COMPACT_IMG_HEIGHT = 40;
	const COMPACT_CATEGORY_TITLES = new Set(['web apps & api building']);
	const CATEGORY_SIZE_OVERRIDES = new Map<string, { width: number; height: number }>([
		['data warehouse', { width: 200, height: 80 }]
	]);

	function getNormalizedTitle(category: { title?: string | null } | null | undefined) {
		return category?.title?.trim().toLowerCase() || null;
	}

	function getCategorySize(category: { title?: string | null } | null | undefined) {
		const normalizedTitle = getNormalizedTitle(category);

		if (normalizedTitle && CATEGORY_SIZE_OVERRIDES.has(normalizedTitle)) {
			return CATEGORY_SIZE_OVERRIDES.get(normalizedTitle) ?? {
				width: LARGE_IMG_WIDTH,
				height: LARGE_IMG_HEIGHT
			};
		}

		if (normalizedTitle && COMPACT_CATEGORY_TITLES.has(normalizedTitle)) {
			return { width: COMPACT_IMG_WIDTH, height: COMPACT_IMG_HEIGHT };
		}

		return { width: LARGE_IMG_WIDTH, height: LARGE_IMG_HEIGHT };
	}

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
				{@const categorySize = getCategorySize(category)}
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
								imgWidth={categorySize.width}
								imgHeight={categorySize.height}
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
