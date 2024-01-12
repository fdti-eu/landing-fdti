<script lang="ts">
	import type { PageData } from './$houdini';
	import ApproachCategory from './ApproachCategory.svelte';
	import { MetaTags } from 'svelte-meta-tags';

	export let data: PageData;

	$: ({ GetApproachPageContent } = data);

	$: pageContent = $GetApproachPageContent.data;
	$: intro = pageContent?.approach_intro?.translations?.length
		? pageContent?.approach_intro?.translations[0]
		: null;
	$: items = pageContent?.meta_tags?.page_tags || [];
	$: metatags = {
		url: items[0]?.url || '/',
		img: items[0]?.img?.id ? `https://cms.fdti.eu/assets/${items[0]?.img.id}` : '/logo.png',
		description:
			items[0]?.translations && items[0]?.translations[0]?.description
				? items[0]?.translations[0]?.description
				: '',
		title:
			items[0]?.translations && items[0]?.translations[0]?.title
				? items[0]?.translations[0]?.title
				: 'FDTI'
	};
	$: categories = pageContent?.approach_category || [];
</script>

{#if metatags}
	<MetaTags
		title={metatags.title}
		description={metatags.description}
		canonical="https://www.fdti.eu{metatags.url}"
		openGraph={{
			type: 'website',
			url: `${metatags.url}`,
			title: `${metatags.title}`,
			description: `${metatags.description}`,
			images: [
				{
					url: `https://cms.fdti.eu/assets/${metatags?.img}`,

					alt: `${metatags.description}`
				}
			],
			site_name: 'FDTI'
		}}
		twitter={{
			handle: '@handle',
			site: '@site',
			cardType: 'summary_large_image',
			title: `${metatags.title}`,
			description: `${metatags.description}`,
			image: `https://www.fdti.eu/images/fdti_vector_54px.svg`,
			imageAlt: `${metatags.description}`
		}}
	/>
{/if}

<!-- FDTI Consulting -->
{#if pageContent && intro}
	<section class="relative max-w-screen-xl space-y-8 mx-auto py-16 mt-20 md:px-12 md:py-24">
		{#if pageContent.approach_intro?.status === 'published'}
			<div>
				<h1 class="text-3xl font-bold text-center md:text-4xl">{intro.title || ''}</h1>
				<div class="relative h-4 flex justify-center my-2">
					<div class="absolute top-1/2 -translate-y-1/2 h-2 w-20 bg-yellow z-10" />
					<div
						class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-80 h-px bg-black"
					/>
				</div>
				<p class="text-xl text-center font-bold py-8 sm:text-2xl md:text-3xl lg:text-4xl">
					{@html intro.description || ''}
				</p>
				<p class="text-xl text-center py-8 sm:text-2xl">
					{@html intro.description_2 || ''}
				</p>
			</div>
		{/if}
		<div class="flex flex-col w-full space-y-14">
			{#each categories as category}
				<ApproachCategory content={category} />
			{/each}
		</div>
	</section>
{/if}
