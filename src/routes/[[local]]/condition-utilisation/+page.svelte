<script lang="ts">
	import Underline from '$lib/components/Underline.svelte';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import { locale } from 'svelte-i18n';
	import { browser } from '$app/environment';
	import { getCGUContent, type Lang } from '$lib/data';

	export let data: PageData;

	const { initialContent, initialLocale } = data;

	$: currentLocale = (browser ? ($locale as Lang) : initialLocale) || initialLocale;
	$: pageContent = browser ? getCGUContent(currentLocale) : initialContent;

	$: cgu = pageContent?.CGU;
</script>

<section
	class="relative w-full max-w-[120rem] px-4 sm:px-8 lg:px-16 xl:px-24 mx-auto space-y-8 py-16 mt-20 md:py-24"
	in:fade
>
	{#if cgu}
		<div class="group">
			<h1 class="text-3xl font-bold text-center md:text-4xl">{cgu.title || ''}</h1>
			<Underline />
		</div>
		<div
			class="prose prose-base md:prose-lg text-current w-full max-w-[90ch] px-0 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 mx-auto list-disc leading-relaxed text-[1.075rem] md:text-[1.18rem] lg:text-[1.25rem] [&_*]:max-w-none [&_*]:!mx-0 [&_p]:my-3 [&_ul]:my-3 [&_ol]:my-3 [&_li]:my-1 [&_p]:text-[1.075rem] md:[&_p]:text-[1.18rem] lg:[&_p]:text-[1.25rem] [&_li]:text-[1.05rem] md:[&_li]:text-[1.15rem] lg:[&_li]:text-[1.2rem] [&_.text-sm]:!text-[1.1rem] md:[&_.text-sm]:!text-[1.2rem] lg:[&_.text-sm]:!text-[1.25rem] [&_.text-base]:!text-[1.15rem] [&_.text-lg]:!text-[1.25rem] [&_.text-xl]:!text-[1.35rem] [&_.text-2xl]:!text-[1.45rem] [&_.mt-14]:!mt-8 [&_.mt-10]:!mt-6 [&_.mt-8]:!mt-5 [&_.mt-5]:!mt-4"
		>
			{@html cgu.content || ''}
		</div>
	{/if}
</section>
