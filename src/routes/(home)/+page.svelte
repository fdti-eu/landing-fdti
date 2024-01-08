<script lang="ts">
	import { locale } from 'svelte-i18n';
	import CtaSection from './CTASection.svelte';
	import FdtiSection from './FdtiSection.svelte';
	import TechnologiesSection from './TechnologiesSection.svelte';
	import ConfianceSection from './ConfianceSection.svelte';
	import ContactSection from './ContactSection.svelte';
	import CaseStudy from './CaseStudy.svelte';
	import { getHomePageContentStore } from '$houdini';

	import type { PageData } from './$houdini';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';
	export let data: PageData;

	$: ({ getHomePageContent } = data);
	$: pageContent = $getHomePageContent.data;
	$: if (browser && $locale) refreshContent();

	async function refreshContent() {
		let store = new getHomePageContentStore();
		let result = await store.fetch({
			variables: { name: $locale === 'fr' ? 'French' : 'English', url: $page.url.pathname }
		});
		pageContent = result.data;
	}

	let metatags;
	let translatedMetatags;
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
<div class=" h-2 -mt-10 " id="cta" />
{#if browser && pageContent}
	<CtaSection content={pageContent.hero_section} />
	<div class="max-w-6xl mx-auto px-2 md:px-12">
		<FdtiSection content={pageContent.fdti_section} />
		<!-- <CaseStudy content={pageContent.case_study_section} /> -->
		<TechnologiesSection content={pageContent.technology_content} />
		<ConfianceSection content={pageContent.trust_content} cii={pageContent.CII} />
	</div>
	<ContactSection content={pageContent.contact_section} />
{/if}
