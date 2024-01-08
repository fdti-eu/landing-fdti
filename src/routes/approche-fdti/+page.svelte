<script lang="ts">
	import { locale } from 'svelte-i18n';
	import { getApproachPageContentStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { browser } from '$app/environment';
	import ApproachCategory from './ApproachCategory.svelte';
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';

	export let data: PageData;
	let translatedIntro;
	let metatags;
	let translatedMetatags;

	async function refreshContent() {
		let store = new getApproachPageContentStore();
		let result = await store.fetch({
			variables: { name: $locale === 'fr' ? 'French' : 'English', url: $page.url.pathname }
		});
		pageContent = result.data;
	}

	$: ({ getApproachPageContent } = data);
	$: pageContent = $getApproachPageContent?.data;
	$: if (browser && $locale) refreshContent();
	$: if (pageContent?.approach_intro?.translations?.length)
		translatedIntro = pageContent?.approach_intro?.translations[0];
	$: categories = pageContent?.approach_category;
	$: if (pageContent?.meta_tags?.page_tags?.length) metatags = pageContent?.meta_tags?.page_tags[0];
	$: if (metatags?.translations?.length) translatedMetatags = metatags.translations[0];
</script>

{#if translatedMetatags && metatags}
	<MetaTags
		title={translatedMetatags.title}
		description={translatedMetatags.description}
		canonical="https://www.fdti.eu{metatags.url}"
		openGraph={{
			type: 'website',
			url: `${metatags.url}`,
			title: `${translatedMetatags.title}`,
			description: `${translatedMetatags.description}`,
			images: [
				{
					url: `https://cms.fdti.eu/assets/${metatags?.img?.id}`,

					alt: `${translatedMetatags.description}`
				}
			],
			site_name: 'FDTI'
		}}
		twitter={{
			handle: '@handle',
			site: '@site',
			cardType: 'summary_large_image',
			title: `${translatedMetatags.title}`,
			description: `${translatedMetatags.description}`,
			image: `https://www.fdti.eu/images/fdti_vector_54px.svg`,
			imageAlt: `${translatedMetatags.description}`
		}}
	/>
{/if}
<!-- FDTI Consulting -->
{#if pageContent && translatedIntro}
	<section class="relative pb-16 px-6 max-w-6xl mx-auto">
		<div class="max-w-screen-wrap mx-auto px-3 wrap:px-5 py-20">
			{#if pageContent.approach_intro.status === 'published'}
				<div class="">
					<div class="max-w-screen-mv mx-auto">
						<h1 class="text-3xl md:text-4xl font-bold text-center">{translatedIntro.title}</h1>
						<div class="flex justify-center my-2 relative h-4">
							<span class="bg-yellow h-2 w-20  absolute top-1/2 -translate-y-1/2 z-10" />
							<span
								class="bg-black w-80 h-px absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
							/>
						</div>
					</div>
					<div>
						<p class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold py-8 text-center">
							{@html translatedIntro.description}
						</p>
						<p class="text-xl sm:text-2xl py-8 text-center">
							{@html translatedIntro.description_2}
						</p>
					</div>
				</div>
			{/if}
			<div class="flex flex-col pt-16 md:pt-24 w-full space-y-14">
				{#each categories as category}
					<ApproachCategory content={category} />
				{/each}
			</div>
		</div>
	</section>
{/if}
