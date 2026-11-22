<script lang="ts">
	import type { Lang } from '$lib/data';
	import { expertiseOffers } from '$lib/expertise-offers';
	import { buildLocalizedPath } from '$lib/functions/seo';
	import { navigationCopy, sectorCopy, sectorPaths } from '$lib/navigation';

	export let locale: Lang = 'fr';
	/** Published summaries of the vehicle and battery sector pages, in navigation order. */
	export let summaries: { vehicles?: string; batteries?: string } = {};

	$: nav = navigationCopy[locale];
	$: copy = sectorCopy[locale];
	$: circularPath = '/filieres/economie-circulaire';
	$: sectors = [
		{ title: nav.circular, text: copy.circularIntro, path: circularPath },
		{
			title: nav.vehicles,
			text: summaries.vehicles,
			path: `${circularPath}/${sectorPaths[locale].vehicles}`
		},
		{
			title: nav.batteries,
			text: summaries.batteries,
			path: `${circularPath}/${sectorPaths[locale].batteries}`
		},
		{
			title: nav.packaging,
			text: expertiseOffers[locale].packaging.description,
			path: `${circularPath}/rep-emballages`
		},
		{ title: copy.justice, text: copy.justiceIntro, path: '/filieres/justice' }
	];
</script>

<section class="sectors-preview-section" id="sectors">
	<div class="section-heading">
		<div class="group"><h2>{nav.sectors}</h2></div>
		<h3>{nav.sectorIntro}</h3>
	</div>
	<div class="sectors-preview-grid">
		{#each sectors as sector}
			<a href={buildLocalizedPath(sector.path, locale)}>
				<h3>{sector.title}</h3>
				{#if sector.text}<p>{sector.text}</p>{/if}
			</a>
		{/each}
	</div>
</section>
