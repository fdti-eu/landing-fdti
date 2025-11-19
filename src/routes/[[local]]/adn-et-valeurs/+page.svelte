<script lang="ts">
	import AdNcard from './ADNcard.svelte';
	import type { PageData } from './$types';
	import { MetaTags } from 'svelte-meta-tags';
	import Underline from '$lib/components/Underline.svelte';
	import { fade } from 'svelte/transition';
	import LdTag from '$lib/components/json-ld/LDTag.svelte';
	import { schema } from '$lib/components/json-ld/json-ld';
	import { locale } from 'svelte-i18n';
	import { browser } from '$app/environment';
	import { getDNAPageContent, type Lang } from '$lib/data';

	export let data: PageData;

	const { initialContent, initialLocale } = data;

	$: currentLocale = (browser ? ($locale as Lang) : initialLocale) || initialLocale;
	$: pageContent = browser ? getDNAPageContent(currentLocale) : initialContent;

	$: dnaContent = pageContent?.DNA_content;
	$: cardList = dnaContent?.card_list || [];
	$: metaSource = pageContent?.meta_tags?.page_tags?.[0];
	$: metatags = {
		url: metaSource?.url || '/',
		img: metaSource?.img?.url || '/logo.webp',
		description: metaSource?.description || '',
		title: metaSource?.title || 'FDTI'
	};

	const absoluteImage = (path: string) =>
		path?.startsWith('/') ? `https://www.fdti.eu${path}` : path || 'https://www.fdti.eu/logo.webp';
</script>

{#if metatags}
	<MetaTags
		title={metatags.title}
		description={metatags.description}
		canonical={`https://www.fdti.eu${metatags.url}`}
		openGraph={{
			type: 'website',
			url: `https://www.fdti.eu${metatags.url}`,
			title: metatags.title,
			description: metatags.description,
			images: [
				{
					url: absoluteImage(metatags.img),
					alt: metatags.description
				}
			],
			siteName: 'FDTI'
		}}
		twitter={{
			creator: '@handle',
			site: '@site',
			cardType: 'summary_large_image',
			title: metatags.title,
			description: metatags.description,
			image: `https://www.fdti.eu/images/fdti_vector_54px.svg`,
			imageAlt: metatags.description
		}}
	/>
{/if}

<svelte:head>
	<LdTag
		schema={schema('WebPage', metatags.title, absoluteImage(metatags.img), metatags.description, metatags.url)}
	/>
</svelte:head>

{#if dnaContent && cardList?.length && dnaContent.status === 'published'}
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
