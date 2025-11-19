<script lang="ts">
	import Hero from './Hero.svelte';
	import FdtiSection from './FdtiSection.svelte';
	import TechnologiesSection from './TechnologiesSection.svelte';
	import ConfianceSection from './ConfianceSection.svelte';
	import ContactSection from './ContactSection.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import LdTag from '$lib/components/json-ld/LDTag.svelte';
	import { schema } from '$lib/components/json-ld/json-ld';

	export let data;

	$: pageContent = data;

	$: items = pageContent?.meta_tags?.page_tags || [];
	$: metatags = {
		url: items[0]?.url || '/',
		img: items[0]?.img?.url || '/logo.webp',
		description: items[0]?.description || '',
		title: items[0]?.title || 'FDTI'
	};
</script>

{#if metatags}
	<MetaTags
		title={metatags.title}
		description={metatags.description}
		canonical={`https://www.fdti.eu${metatags.url}`}
		openGraph={{
			type: 'website',
			url: `https://www.fdti.eu${metatags.url}`,
			title: `${metatags.title}`,
			description: `${metatags.description}`,
			images: [
				{
					url: metatags.img.startsWith('/') ? `https://www.fdti.eu${metatags.img}` : metatags.img,
					alt: `${metatags.description}`
				}
			],
			siteName: 'FDTI'
		}}
		twitter={{
			creator: '@handle',
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
	<div class="max-w-6xl mx-auto px-2 md:px-12">
		<FdtiSection content={pageContent.fdti_section} />
		<TechnologiesSection content={pageContent.technology_content} />
		<ConfianceSection content={pageContent.trust_content} cii={pageContent.CII} />
	</div>
	<ContactSection content={pageContent.contact_section} />
{/if}
