<script lang="ts">
	import Hero from '#lib/components/sections/Hero.svelte';
	import FdtiSection from '#lib/components/sections/FdtiSection.svelte';
	import CapabilitiesSection from '#lib/components/sections/CapabilitiesSection.svelte';
	import TechnologiesSection from '#lib/components/sections/TechnologiesSection.svelte';
	import ConfianceSection from '#lib/components/sections/ConfianceSection.svelte';
	import UseCasesPreviewSection from '#lib/components/sections/UseCasesPreviewSection.svelte';
	import ExpertisePreviewSection from '#lib/components/sections/ExpertisePreviewSection.svelte';
	import PageSeo from '#lib/components/PageSeo.svelte';
	import { schema } from '#lib/components/json-ld/json-ld.ts';
	import type { Lang } from '#lib/data.ts';
	import { absoluteImageUrl, buildLocalizedUrl, SOCIAL_IMAGE_PATH } from '#lib/functions/seo.ts';

	export let data;

	$: pageContent = data;

	$: items = pageContent?.meta_tags?.page_tags || [];
	$: metatags = {
		url: items[0]?.url || '/',
		img: SOCIAL_IMAGE_PATH,
		description: items[0]?.description || '',
		title: items[0]?.title || 'FDTI'
	};
	$: currentLocale = (pageContent?.locale as Lang) ?? 'fr';
	$: canonicalUrl = buildLocalizedUrl(metatags.url || '/', currentLocale);
	$: ogImage = absoluteImageUrl(metatags.img);
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
			<FdtiSection content={pageContent.fdti_section} />
			<CapabilitiesSection locale={currentLocale} />
			<UseCasesPreviewSection
				title={pageContent.homepage_use_cases_title}
				subtitle={pageContent.homepage_use_cases_subtitle}
				useCases={pageContent.homepage_use_cases}
				locale={currentLocale}
			/>
			<ExpertisePreviewSection locale={currentLocale} />
			<TechnologiesSection content={pageContent.technology_content} locale={currentLocale} />
			<ConfianceSection content={pageContent.trust_content} />
		</div>
	{/if}
</div>
