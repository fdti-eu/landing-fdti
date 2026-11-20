<script lang="ts">
	import type { PageData } from './$types';
	import { navigationCopy, sectorCopy } from '$lib/navigation';
	import { buildLocalizedPath, buildLocalizedUrl } from '$lib/functions/seo';
	import { MetaTags } from 'svelte-meta-tags';
	export let data: PageData;
	$: nav = navigationCopy[data.locale];
	$: copy = sectorCopy[data.locale];
	$: heading = copy.justice;
	$: description = copy.justiceIntro;
</script>

<MetaTags
	title={`${heading} | FDTI`}
	{description}
	canonical={buildLocalizedUrl('/filieres/justice', data.locale)}
/>
<div class="editorial-page">
	<header class="editorial-hero">
		<div class="editorial-shell">
			<a href={buildLocalizedPath('/filieres', data.locale)}>← {copy.all}</a>
			<h1>{heading}</h1>
			<p>{description}</p>
		</div>
	</header>
	<section class="editorial-section editorial-shell">
		{#each data.projects as project}<article>
				<h2>
					<a href={buildLocalizedPath(`/realisations/${project.slug}`, data.locale)}
						>{project.title}</a
					>
				</h2>
				<p>{project.challenge}</p>
			</article>{/each}<a href={buildLocalizedPath('/solutions/analyse-documentaire', data.locale)}
			>{nav.documents} →</a
		>
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
