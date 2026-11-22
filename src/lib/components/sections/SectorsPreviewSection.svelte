<script lang="ts">
	import type { Lang } from '$lib/data';
	import { buildLocalizedPath } from '$lib/functions/seo';
	import { navigationCopy, sectorCopy, sectorPaths } from '$lib/navigation';

	export let locale: Lang = 'fr';

	$: nav = navigationCopy[locale];
	$: copy = sectorCopy[locale];
	$: sectors = [
		{
			title: nav.circular,
			text: copy.circularIntro,
			href: buildLocalizedPath('/filieres/economie-circulaire', locale),
			topics: [
				{
					label: nav.vehicles,
					href: buildLocalizedPath(
						`/filieres/economie-circulaire/${sectorPaths[locale].vehicles}`,
						locale
					)
				},
				{
					label: nav.batteries,
					href: buildLocalizedPath(
						`/filieres/economie-circulaire/${sectorPaths[locale].batteries}`,
						locale
					)
				},
				{
					label: nav.packaging,
					href: buildLocalizedPath('/filieres/economie-circulaire/rep-emballages', locale)
				}
			]
		},
		{
			title: copy.justice,
			text: copy.justiceIntro,
			href: buildLocalizedPath('/filieres/justice', locale),
			topics: []
		}
	];
</script>

<section class="sectors-preview-section" id="sectors">
	<div class="section-heading">
		<div class="group"><h2>{nav.sectors}</h2></div>
		<h3>{nav.sectorIntro}</h3>
	</div>
	<div class="sectors-preview-grid">
		{#each sectors as sector}
			<article>
				<h3><a href={sector.href}>{sector.title}</a></h3>
				<p>{sector.text}</p>
				{#if sector.topics.length}
					<ul>
						{#each sector.topics as topic}
							<li><a href={topic.href}>{topic.label}</a></li>
						{/each}
					</ul>
				{/if}
			</article>
		{/each}
	</div>
	<a class="editorial-text-link" href={buildLocalizedPath('/filieres', locale)}>{copy.all}</a>
</section>
