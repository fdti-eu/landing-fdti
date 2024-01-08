<script lang="ts">
	import { locale } from 'svelte-i18n';
	import { MetaTags } from 'svelte-meta-tags';
	import CaseStudyTag from '../../(home)/CaseStudyTag.svelte';
	import type { PageData } from './$houdini';

	export let data: PageData;

	$: ({ getCaseStudyContent } = data);
	$: pageContent = $getCaseStudyContent.data?.case_study[0];
	let translatedContent;
	$: if ($locale && pageContent)
		translatedContent = pageContent.translations.filter((caseStudy) =>
			getTranslatedContent(caseStudy)
		);
	function getTranslatedContent(caseStudy) {
		if ($locale === 'en') return caseStudy.languages_code.name === 'English';
		else return caseStudy.languages_code.name === 'French';
	}

	function setMetaTags(pageContent, translatedContent) {
		return {
			url: `/${pageContent.slug}`,
			translations: translatedContent,
			img: pageContent.img
		};
	}
	let metatags;
	let translatedMetatags;
	$: if (pageContent && translatedContent) metatags = setMetaTags(pageContent, translatedContent);
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
{#if pageContent && translatedContent}
	<div class="overflow-hidden flex flex-col items-center py-20 px-3">
		<div class="flex justify-between">
			{#if $locale === 'en'}
				<a href="/" class="px-4 py-2 my-8">Back to home page</a>
				<a href="/retours-dexperiences" class="px-4 py-2 my-8">Back to index</a>
			{:else}
				<a href="/" class=" px-4 py-2 my-8">Retour à la page d'accueil</a>
				<a href="/retours-dexperiences" class="px-4 py-2 my-8">Retour à l'index</a>
			{/if}
		</div>
		{#if pageContent.img}
			<img
				src={`https://cms.fdti.eu/assets/${pageContent.img.id}`}
				class="h-auto md:max-w-md max-w-full"
				alt={translatedContent[0].title}
				title={translatedContent[0].title}
				width="400"
			/>
		{/if}
		<ul class="flex gap-2 md:gap-4 py-8 max-w-2xl flex-wrap ">
			{#each pageContent.tags as tag}
				<li>
					<CaseStudyTag tagName={tag} />
				</li>
			{/each}
		</ul>
		<div class="gap-10 flex flex-col items-center mx-auto prose">
			<h1>{translatedContent[0].title}</h1>
			<div class="prose">{@html translatedContent[0].content}</div>
		</div>
	</div>
{/if}
