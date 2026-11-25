<script lang="ts">
	import '#lib/styles/home.css';
	import Hero from '#lib/components/sections/Hero.svelte';
	import FdtiSection from '#lib/components/sections/FdtiSection.svelte';
	import SectorsPreviewSection from '#lib/components/sections/SectorsPreviewSection.svelte';
	import CapabilitiesSection from '#lib/components/sections/CapabilitiesSection.svelte';
	import ConfianceSection from '#lib/components/sections/ConfianceSection.svelte';
	import UseCasesPreviewSection from '#lib/components/sections/UseCasesPreviewSection.svelte';
	import PageSeo from '#lib/components/PageSeo.svelte';
	import { schema } from '#lib/components/json-ld/json-ld.ts';
	import type { Lang } from '#lib/data.ts';
	import { absoluteImageUrl, buildLocalizedUrl, SOCIAL_IMAGE_PATH } from '#lib/functions/seo.ts';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	const pageContent = $derived(data);

	const items = $derived(pageContent?.meta_tags?.page_tags || []);
	const metatags = $derived({
		url: items[0]?.url || '/',
		img: SOCIAL_IMAGE_PATH,
		description: items[0]?.description || '',
		title: items[0]?.title || 'FDTI'
	});
	const currentLocale = $derived((pageContent?.locale as Lang) ?? 'fr');
	const canonicalUrl = $derived(buildLocalizedUrl(metatags.url || '/', currentLocale));
	const ogImage = $derived(absoluteImageUrl(metatags.img));
</script>

<PageSeo
	title={metatags.title}
	description={metatags.description}
	canonical={canonicalUrl}
	image={ogImage}
	twitter
	structuredData={[
		schema('WebSite', {
			name: metatags.title,
			description: metatags.description,
			image: ogImage,
			url: canonicalUrl
		})
	]}
/>

<div class="fdti-home">
	<Hero content={pageContent?.hero_section} />

	{#if pageContent}
		<div class="home-sections">
			<ConfianceSection content={pageContent.trust_content} />
			<CapabilitiesSection locale={currentLocale} />
			<FdtiSection content={pageContent.fdti_section} />
			<SectorsPreviewSection locale={currentLocale} summaries={pageContent.sector_summaries} />
			<UseCasesPreviewSection
				title={pageContent.homepage_use_cases_title}
				subtitle={pageContent.homepage_use_cases_subtitle}
				useCases={pageContent.homepage_use_cases}
				locale={currentLocale}
			/>
		</div>
	{/if}
</div>
