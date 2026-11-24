<script lang="ts">
	import type { PageData } from './$types';
	import { navigationCopy, sectorCopy } from '#lib/navigation.ts';
	import { buildLocalizedPath, buildLocalizedUrl } from '#lib/functions/seo.ts';
	import { MetaTags } from 'svelte-meta-tags';
	export let data: PageData;
	$: nav = navigationCopy[data.locale];
	$: copy = sectorCopy[data.locale];
	$: heading = nav.sectors;
	$: description = nav.sectorIntro;
</script>

<MetaTags
	title={`${heading} | FDTI`}
	{description}
	canonical={buildLocalizedUrl('/filieres', data.locale)}
/>
<div class="editorial-page">
	<header class="editorial-hero">
		<div class="editorial-shell">
			<h1>{heading}</h1>
			<p>{description}</p>
		</div>
	</header>
	<section class="editorial-section editorial-shell">
		{#each [[nav.circular, copy.circularIntro, 'economie-circulaire'], [copy.justice, copy.justiceIntro, 'justice']] as [name, intro, slug]}<article
			>
				<h2><a href={buildLocalizedPath(`/filieres/${slug}`, data.locale)}>{name}</a></h2>
				<p>{intro}</p>
			</article>{/each}
	</section>
</div>

<style>
	article {
		border-top: 1px solid #ccc;
		padding: 1.5rem 0;
	}
	h2 {
		font-size: 1.55rem;
		font-weight: 700;
		margin-bottom: 0.6rem;
	}
	a {
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}
	article p {
		max-width: 75ch;
		line-height: 1.65;
	}
</style>
