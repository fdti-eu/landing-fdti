<script lang="ts">
	interface Props {
		title: string;
		intro: string;
		whenLabel: string;
		impactLabel: string;
		options: { title: string; when: string; impact: string }[];
	}

	let { title, intro, whenLabel, impactLabel, options }: Props = $props();
</script>

<section
	class="editorial-section editorial-fields solution-options"
	aria-labelledby="solution-options"
>
	<div class="editorial-shell">
		<h2 id="solution-options">{title}</h2>
		<p class="intro">{intro}</p>
		<div class="option-list">
			{#each options as option (option)}
				<article class="option-row">
					<h3>{option.title}</h3>
					<div>
						<h4>{whenLabel}</h4>
						<p>{option.when}</p>
					</div>
					<div>
						<h4>{impactLabel}</h4>
						<p>{option.impact}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.solution-options h2 {
		font-size: clamp(1.6rem, 2.8vw, 2.4rem);
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: -0.03em;
		margin-bottom: 1.5rem;
	}
	.solution-options .intro {
		max-width: 68ch;
		font-size: 1.1rem;
		line-height: 1.7;
		margin-bottom: 2.5rem;
		color: var(--color-text-body);
	}
	.option-list {
		border-top: 2px solid var(--color-surface-deep);
	}
	.option-row {
		display: grid;
		grid-template-columns: 0.9fr 1fr 1fr;
		gap: 2.5rem;
		padding: 1.9rem 0;
		border-bottom: 1px solid var(--color-line-primary);
	}
	.solution-options .option-row h3 {
		font-size: 1.3rem;
		font-weight: 700;
		line-height: 1.3;
		letter-spacing: 0;
	}
	.option-row h4 {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		margin-bottom: 0.6rem;
		color: var(--color-text-option-label);
	}
	.option-row p {
		line-height: 1.65;
		color: var(--color-text-body);
	}
	@media (max-width: 1000px) {
		.option-row {
			grid-template-columns: 1fr 1fr;
			gap: 1.5rem 2rem;
		}
		.option-row h3 {
			grid-column: 1 / -1;
		}
	}
	@media (max-width: 640px) {
		.option-row {
			grid-template-columns: 1fr;
		}
	}
</style>
