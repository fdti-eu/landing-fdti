<script lang="ts">
	import AdNcard from './ADNcard.svelte';
	import type { PageData } from './$houdini';
	import { MetaTags } from 'svelte-meta-tags';
	import Underline from '$lib/components/Underline.svelte';
	import { fade } from 'svelte/transition';
	import LdTag from '$lib/components/json-ld/LDTag.svelte';
	import { schema } from '$lib/components/json-ld/json-ld';

	export let data: PageData;
	$: ({ GetDNAPageContent } = data);

	$: translatedContent = pageContent?.DNA_content?.translations?.length
		? pageContent?.DNA_content?.translations[0]
		: null;
	$: items = pageContent?.meta_tags?.page_tags || [];
	$: metatags = {
		url: items[0]?.url || '/',
		img: items[0]?.img?.id ? `https://cms.fdti.eu/assets/${items[0]?.img.id}` : '/logo.webp',
		description:
			items[0]?.translations && items[0]?.translations[0]?.description
				? items[0]?.translations[0]?.description
				: '',
		title:
			items[0]?.translations && items[0]?.translations[0]?.title
				? items[0]?.translations[0]?.title
				: 'FDTI'
	};
	$: pageContent = $GetDNAPageContent?.data;
	$: cardList = pageContent?.DNA_content?.card_list;
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

<svelte:head>
	<LdTag
		schema={schema('WebPage', metatags.title, metatags.img, metatags.description, metatags.url)}
	/>
</svelte:head>

{#if pageContent && translatedContent && cardList && pageContent.DNA_content?.status === 'published'}
	<section class="group/section relative max-w-screen-xl space-y-8 mx-auto py-16 mt-20 lg:px-12 md:py-24" in:fade>
		<div>
			<h1 class="text-3xl font-bold text-center md:text-4xl">{translatedContent.title || ''}</h1>
			<Underline />
		</div>
		<div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 px-2 lg:gap-8">
			{#each cardList as card}
				<AdNcard content={card} />
			{/each}
		</div>

		<p class="text-center px-4 pt-8">{@html translatedContent.description}</p>
		<figure class="flex justify-center">
			<img
				src={'https://cms.fdti.eu/assets/' + pageContent?.DNA_content?.RGPD_img?.id}
				alt="RGPD"
				title="RGPD"
				width="100px"
				height="100px"
			/>
		</figure>
	</section>
{/if}
