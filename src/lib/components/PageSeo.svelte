<script lang="ts">
	import type { Snippet } from 'svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import { absoluteImageUrl, SOCIAL_IMAGE_PATH } from '#lib/functions/seo.ts';
	import { serializeSchema } from '#lib/components/json-ld/json-ld.ts';

	interface Props {
		title: string;
		description: string;
		canonical: string;
		openGraph?: boolean;
		type?: 'website' | 'article';
		image?: string;
		imageAlt?: string;
		twitter?: boolean;
		structuredData?: Record<string, unknown>[];
		children?: Snippet;
	}

	let {
		title,
		description,
		canonical,
		openGraph = true,
		type = 'website',
		image = absoluteImageUrl(SOCIAL_IMAGE_PATH),
		imageAlt = description,
		twitter = false,
		structuredData = [],
		children
	}: Props = $props();
</script>

<MetaTags
	{title}
	{description}
	{canonical}
	openGraph={openGraph
		? {
				type,
				url: canonical,
				title,
				description,
				images: [{ url: image, alt: imageAlt }],
				siteName: 'FDTI'
			}
		: undefined}
	twitter={twitter
		? {
				cardType: 'summary_large_image',
				title,
				description,
				image,
				imageAlt
			}
		: undefined}
/>

<svelte:head>
	{#each structuredData as item (item)}
		{@html serializeSchema(item)}
	{/each}
	{@render children?.()}
</svelte:head>
