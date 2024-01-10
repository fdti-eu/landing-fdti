<script lang="ts">
	import { locale } from 'svelte-i18n';
	import { getDNAPageContentStore } from '$houdini';
	import AdNcard from './ADNcard.svelte';
	import type { PageData } from './$houdini';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';

	export let data: PageData;
	let translatedContent;
	let metatags;
	let translatedMetatags;
	$: ({ getDNAPageContent } = data);
	$: pageContent = $getDNAPageContent?.data;
	$: if (browser && $locale) refreshContent();

	async function refreshContent() {
		let store = new getDNAPageContentStore();
		let result = await store.fetch({
			variables: { name: $locale === 'fr' ? 'French' : 'English', url: $page.url.pathname }
		});
		pageContent = result.data;
	}

	$: if (pageContent?.DNA_content?.translations?.length)
		translatedContent = pageContent?.DNA_content?.translations[0];
	$: cardList = pageContent?.DNA_content?.card_list;
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
{#if pageContent && translatedContent && cardList && pageContent.DNA_content?.status === 'published'}
	<section class="relative pb-10 container mx-auto">
		<div>
			<div class="max-w-screen-wrap mx-auto px-3 wrap:px-5 py-20">
				<!-- ADN -->
				<div class="">
					<div class="max-w-screen-mv mx-auto">
						<h2 class="text-3xl md:text-4xl font-bold text-center ">
							{translatedContent.title}
						</h2>
						<div class="flex justify-center my-2 relative h-4">
							<span class="bg-yellow h-2 w-20  absolute top-1/2 -translate-y-1/2 z-10" />
							<span
								class="bg-black w-80 h-px absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
							/>
						</div>
					</div>

					<div class="grid md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-6 md:p-8 wrap:px-0 ">
						{#each cardList as card}
							<AdNcard content={card} />
						{/each}
					</div>
					<div class="pt-5">
						<p class="text-center px-4 sm:px-24">{@html translatedContent.description}</p>
						<div class="pt-8 flex justify-center">
							<img
								src={'https://cms.fdti.eu/assets/' + pageContent?.DNA_content?.RGPD_img.id}
								alt="RGPD"
								title="RGPD"
								width="100px"
								height="100px"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
{/if}
