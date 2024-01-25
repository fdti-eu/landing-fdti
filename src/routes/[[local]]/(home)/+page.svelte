<script lang="ts">
	import Hero from './Hero.svelte';
	import FdtiSection from './FdtiSection.svelte';
	import TechnologiesSection from './TechnologiesSection.svelte';
	import ConfianceSection from './ConfianceSection.svelte';
	import ContactSection from './ContactSection.svelte';
	import type { PageData } from './$houdini';
	import { MetaTags } from 'svelte-meta-tags';
	import LdTag from '$lib/components/json-ld/LDTag.svelte';
	import { schema } from '$lib/components/json-ld/json-ld';

	export let data: PageData;

	$: ({ GetHomePageContent } = data);
	$: pageContent = $GetHomePageContent?.data;

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

<svelte:head>
	<LdTag
		schema={schema('WebSite', metatags.title, metatags.img, metatags.description, metatags.url)}
	/>
</svelte:head>

<Hero content={pageContent?.hero_section} />

{#if pageContent}
	{@const { fdti_section, technology_content, trust_content, CII, contact_section } = pageContent}
	<div class="max-w-6xl mx-auto px-2 md:px-12">
		<FdtiSection content={fdti_section} />
		<TechnologiesSection content={technology_content} />
		<ConfianceSection content={trust_content} cii={CII} />
	</div>
	<ContactSection content={contact_section} />
{/if}
