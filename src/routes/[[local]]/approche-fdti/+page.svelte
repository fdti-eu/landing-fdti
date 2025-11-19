<script lang="ts">
	import Underline from '$lib/components/Underline.svelte';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import ApproachCategory from './ApproachCategory.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import LdTag from '$lib/components/json-ld/LDTag.svelte';
	import { schema } from '$lib/components/json-ld/json-ld';
	import { locale } from 'svelte-i18n';
	import { browser } from '$app/environment';
	import { getApproachPageContent, type Lang } from '$lib/data';

	export let data: PageData;

	const { initialContent, initialLocale } = data;

	$: currentLocale = (browser ? ($locale as Lang) : initialLocale) || initialLocale;
	$: pageContent = browser ? getApproachPageContent(currentLocale) : initialContent;

	$: intro = pageContent?.approach_intro;
	$: categories = pageContent?.approach_category || [];
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
		schema={schema('AboutPage', metatags.title, absoluteImage(metatags.img), metatags.description, metatags.url)}
	/>
</svelte:head>

<!-- FDTI Consulting -->
{#if intro}
	<section
		class="relative max-w-screen-xl space-y-8 mx-auto px-2 py-16 mt-20 md:px-12 md:py-24"
		in:fade
	>
		{#if intro.status === 'published' || intro.title}
			<div class="text-center">
				<div class="group">
					<h1 class="text-3xl font-bold md:text-4xl">{intro.title || ''}</h1>
					<Underline />
				</div>
				<p class="text-xl font-bold py-8 sm:text-2xl md:text-3xl lg:text-4xl">
					{@html intro.description || ''}
				</p>
				<p class="text-xl py-8 sm:text-2xl">
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
