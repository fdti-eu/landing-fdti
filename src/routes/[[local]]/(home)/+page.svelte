<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import FdtiSection from '$lib/components/sections/FdtiSection.svelte';
	import CapabilitiesSection from '$lib/components/sections/CapabilitiesSection.svelte';
	import TechnologiesSection from '$lib/components/sections/TechnologiesSection.svelte';
	import ConfianceSection from '$lib/components/sections/ConfianceSection.svelte';
	import ContactSection from '$lib/components/sections/ContactSection.svelte';
	import UseCasesPreviewSection from '$lib/components/sections/UseCasesPreviewSection.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import LdTag from '$lib/components/json-ld/LDTag.svelte';
	import { schema } from '$lib/components/json-ld/json-ld';
	import type { Lang } from '$lib/data';
	import { absoluteImageUrl, buildLocalizedUrl } from '$lib/functions/seo';

	export let data;

	$: pageContent = data;

	$: items = pageContent?.meta_tags?.page_tags || [];
	$: metatags = {
		url: items[0]?.url || '/',
		img: items[0]?.img?.url || '/logo.webp',
		description: items[0]?.description || '',
		title: items[0]?.title || 'FDTI'
	};
	$: currentLocale = (pageContent?.locale as Lang) ?? 'fr';
	$: canonicalUrl = buildLocalizedUrl(metatags.url || '/', currentLocale);
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
		schema={schema('WebSite', {
			name: metatags.title,
			description: metatags.description,
			image: ogImage,
			url: canonicalUrl
		})}
	/>
</svelte:head>

<Hero content={pageContent?.hero_section} />

{#if pageContent}
	<div class="max-w-6xl mx-auto px-2 md:px-12">
		<FdtiSection content={pageContent.fdti_section} />
		<CapabilitiesSection locale={currentLocale} />
		<UseCasesPreviewSection
			title={pageContent.homepage_use_cases_title}
			subtitle={pageContent.homepage_use_cases_subtitle}
			useCases={pageContent.homepage_use_cases}
			locale={currentLocale}
		/>
		<TechnologiesSection content={pageContent.technology_content} />
		<ConfianceSection content={pageContent.trust_content} />
	</div>
	<ContactSection content={pageContent.contact_section} />
{/if}
