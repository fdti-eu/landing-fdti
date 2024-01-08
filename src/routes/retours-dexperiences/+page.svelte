<script lang="ts">
	import { locale } from 'svelte-i18n';
	import { getCaseStudyListStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';
	import CaseStudyItem from '../(home)/CaseStudyItem.svelte';

	export let data: PageData;
	let metatags;
	let translatedMetatags;

	async function refreshContent() {
		let store = new getCaseStudyListStore();
		let result = await store.fetch({
			variables: { name: $locale === 'fr' ? 'French' : 'English', url: $page.url.pathname }
		});
		pageContent = result.data;
	}

	$: ({ getCaseStudyList } = data);
	$: pageContent = $getCaseStudyList?.data;
	$: if (browser && $locale) refreshContent();
	$: caseStudyList = pageContent?.case_study_section?.case_study_list;
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

<h1 class="mt-20 text-center font-bold text-3xl md:text-4xl">
	{$locale === 'fr' ? "Retours d'expériences" : 'Case studies'}
</h1>
<div class="flex w-full justify-center">
	{#if $locale === 'fr'}
		<a href="/" class="px-4 py-2 my-8 mx-auto">Retour à la page d'accueil</a>
	{:else}
		<a href="/" class="px-4 py-2 my-8 mx-auto">Back to home page</a>
	{/if}
</div>
{#if caseStudyList}
	<div class="flex justify-center flex-wrap gap-2 px-4 md:px-12">
		{#each caseStudyList as item}
			<div class="py-4 md:py-12 w-80 flex justify-center">
				<CaseStudyItem data={item} />
			</div>
		{/each}
	</div>
{/if}
