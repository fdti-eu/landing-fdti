<script lang="ts">
	interface Props {
		metrics: { label?: string | null; value?: string | null; note?: string | null }[];
		compact?: boolean;
	}

	let { metrics, compact = false }: Props = $props();
</script>

<dl class:compact>
	{#each metrics as metric (metric)}
		<div>
			<dt>{metric.label}</dt>
			<dd>
				<strong>{metric.value}</strong>{#if metric.note}<small>{metric.note}</small>{/if}
			</dd>
		</div>
	{/each}
</dl>

<style>
	dl {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		margin: 0;
		background: var(--color-cream);
		border-top: 3px solid var(--color-accent-deep);
		color: var(--color-surface-panel-dark);
	}
	dl > div {
		padding: 1.15rem;
	}
	dl > div + div {
		border-top: 1px solid var(--color-line-paper);
	}
	dt {
		font-size: 14px;
		font-weight: 600;
	}
	dd {
		margin: 0.6rem 0 0;
	}
	strong {
		display: block;
		font-size: clamp(28px, 2.4vw, 34px);
		line-height: 1.12;
		letter-spacing: -0.04em;
		font-variant-numeric: tabular-nums;
	}
	small {
		display: block;
		margin-top: 0.7rem;
		color: var(--color-text-indicator);
		font-size: 14px;
		line-height: 1.5;
	}
	.compact {
		margin: 0;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	.compact > div {
		padding: 0.85rem;
	}
	.compact strong {
		font-size: 1.65rem;
	}
	@media (min-width: 641px) {
		.compact > div + div {
			border-top: 0;
			border-left: 1px solid var(--color-line-paper);
		}
	}
	@media (max-width: 640px) {
		dl,
		.compact {
			grid-template-columns: 1fr;
		}
		dl > div + div {
			border-left: none;
			border-top: 1px solid var(--color-line-paper);
		}
	}
</style>
