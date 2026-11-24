<script lang="ts">
	interface Props {
		title: string;
		practices: { title: string; text: string }[];
	}

	let { title, practices }: Props = $props();
</script>

<section class="editorial-section solution-practices" aria-labelledby="solution-practices">
	<div class="editorial-shell">
		<h2 id="solution-practices">{title}</h2>
		<div class="practice-grid">
			{#each practices as practice (practice)}
				<article>
					<h3>{practice.title}</h3>
					<p>{practice.text}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.solution-practices {
		background: var(--color-surface-deep);
		color: var(--color-white);
	}
	.solution-practices h2 {
		font-size: clamp(1.6rem, 2.8vw, 2.4rem);
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: -0.03em;
		margin-bottom: 2rem;
	}
	.practice-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 2.5rem;
	}
	.practice-grid article {
		border-top: 1px solid var(--color-line-practice);
		padding-top: 1.3rem;
	}
	.solution-practices .practice-grid h3 {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.09em;
		line-height: 1.5;
		text-transform: uppercase;
		margin-bottom: 0.6rem;
		color: var(--color-yellow);
	}
	.practice-grid p {
		font-size: 0.95rem;
		line-height: 1.65;
		color: var(--color-text-on-dark);
	}
	@media (max-width: 1000px) {
		.practice-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 640px) {
		.practice-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
