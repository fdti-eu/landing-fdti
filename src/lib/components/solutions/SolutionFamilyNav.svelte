<script lang="ts">
	import type { Lang } from '$lib/data';
	import { buildLocalizedPath } from '$lib/functions/seo';
	import { solutionIds, solutionLabels, type SolutionId } from '$lib/navigation';
	import { solutionHref } from '$lib/solution-pages';

	export let title: string;
	export let locale: Lang;
	export let current: SolutionId;
	$: others = solutionIds.filter((id) => id !== current);
</script>

<nav
	class="editorial-section editorial-shell solution-family-nav"
	aria-labelledby="solution-others"
>
	<h2 id="solution-others">{title}</h2>
	<ul>
		{#each others as id}
			<li>
				<a href={buildLocalizedPath(solutionHref(id, locale), locale)}
					>{solutionLabels[locale][id]} <span aria-hidden="true">→</span></a
				>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.solution-family-nav {
		padding-top: 4rem;
		padding-bottom: 4rem;
	}
	.solution-family-nav h2 {
		font-size: 1.2rem;
		font-weight: 700;
		line-height: 1.3;
		letter-spacing: 0;
		margin-bottom: 1rem;
	}
	ul {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0 2rem;
	}
	a {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem 0;
		border-bottom: 1px solid #cccfcf;
		font-weight: 600;
		font-size: 0.95rem;
	}
	a:hover {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	a:focus-visible {
		outline: 2px solid #9a6405;
		outline-offset: 5px;
	}
	@media (max-width: 1000px) {
		ul {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 640px) {
		ul {
			grid-template-columns: 1fr;
		}
	}
</style>
