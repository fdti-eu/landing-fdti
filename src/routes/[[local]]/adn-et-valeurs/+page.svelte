<script lang="ts">
	import AdNcard from './ADNcard.svelte';
	import type { PageData } from './$types';
	import { MetaTags } from 'svelte-meta-tags';
	import Underline from '$lib/components/Underline.svelte';
	import { fade } from 'svelte/transition';
	import LdTag from '$lib/components/json-ld/LDTag.svelte';
	import { schema } from '$lib/components/json-ld/json-ld';
	import { absoluteImageUrl, buildLocalizedUrl } from '$lib/functions/seo';

	export let data: PageData;

	$: ({ initialContent, initialLocale } = data);
	$: currentLocale = initialLocale;
	$: pageContent = initialContent;

	$: dnaContent = pageContent?.DNA_content;
	$: cardList = dnaContent?.card_list || [];
	$: metaSource = pageContent?.meta_tags?.page_tags?.[0];
	$: metatags = {
		url: metaSource?.url || '/',
		img: metaSource?.img?.url || '/logo.webp',
		description: metaSource?.description || '',
		title: metaSource?.title || 'FDTI'
	};

	$: canonicalUrl = buildLocalizedUrl(metatags.url || '/adn-et-valeurs', currentLocale);
	$: ogImage = absoluteImageUrl(metatags.img);
	$: twitterImage = absoluteImageUrl('/images/fdti_vector_54px.svg');
</script>

{#if metatags}
	<MetaTags
		title={metatags.title}
		description={metatags.description}
		canonical={canonicalUrl}
		openGraph={{
			type: 'website',
			url: canonicalUrl,
			title: metatags.title,
			description: metatags.description,
			images: [
				{
					url: ogImage,
					alt: metatags.description
				}
			],
			siteName: 'FDTI'
		}}
		twitter={{
			cardType: 'summary_large_image',
			title: metatags.title,
			description: metatags.description,
			image: twitterImage,
			imageAlt: metatags.description
		}}
	/>
{/if}

<svelte:head>
	<LdTag
		schema={schema('WebPage', {
			name: metatags.title,
			description: metatags.description,
			image: ogImage,
			url: canonicalUrl,
			inLanguage: currentLocale
		})}
	/>
</svelte:head>

{#if dnaContent && cardList?.length}
	<section class="relative max-w-screen-xl space-y-8 mx-auto py-16 mt-20 lg:px-12 md:py-24" in:fade>
		<div class="group">
			<h1 class="text-3xl font-bold text-center md:text-4xl">{dnaContent.title || ''}</h1>
			<Underline />
		</div>
		<div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 px-2 lg:gap-8">
			{#each cardList as card}
				<AdNcard content={card} />
			{/each}
		</div>

		<p class="text-center px-4 pt-8">{@html dnaContent.description || ''}</p>
		<figure class="flex justify-center">
			<img
				src={dnaContent?.RGPD_img?.url || '/logo.webp'}
				alt="RGPD"
				title="RGPD"
				width="100px"
				height="100px"
			/>
		</figure>
	</section>
{/if}
