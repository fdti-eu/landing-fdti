<script lang="ts">
	import Hero from './Hero.svelte';
	import FdtiSection from './FdtiSection.svelte';
	import TechnologiesSection from './TechnologiesSection.svelte';
	import ConfianceSection from './ConfianceSection.svelte';
	import ContactSection from './ContactSection.svelte';
	import type { PageData } from './$houdini';
	import { browser } from '$app/environment';
	import { MetaTags } from 'svelte-meta-tags';

	export let data: PageData;

	$: ({ GetHomePageContent } = data);
	$: pageContent = $GetHomePageContent?.data;

	$: item = pageContent?.meta_tags?.page_tags || [];
	$: metatags = {
		url: item[0]?.url || '/',
		img: item[0]?.img?.id ? `https://cms.fdti.eu/assets/${item[0]?.img.id}` : '/logo.png',
		description:
			item[0]?.translations && item[0]?.translations[0]?.description
				? item[0]?.translations[0]?.description
				: '',
		title:
			item[0]?.translations && item[0]?.translations[0]?.title
				? item[0]?.translations[0]?.title
				: 'FDTI'
	};
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
					url: `https://cms.fdti.eu/assets/${metatags.img}`,

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

{#if browser && pageContent}
	<Hero content={pageContent.hero_section} />
	<div class="max-w-6xl mx-auto px-2 md:px-12">
		<FdtiSection content={pageContent.fdti_section} />
		<TechnologiesSection content={pageContent.technology_content} />
		<ConfianceSection content={pageContent.trust_content} cii={pageContent.CII} />
	</div>
	<ContactSection content={pageContent.contact_section} />
{/if}
