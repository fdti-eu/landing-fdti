<script lang="ts">
	export let metrics: { label?: string | null; value?: string | null; note?: string | null }[];
	export let compact = false;
</script>

<dl class:compact>
	{#each metrics as metric}
		<div>
			<dt>{metric.label}</dt>
			<dd><strong>{metric.value}</strong><small>{metric.note}</small></dd>
		</div>
	{/each}
</dl>

<style>
	dl {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin: 0 0 3rem;
		background: #f6f5ef;
		border-top: 3px solid #d6a52d;
		color: #202427;
	}
	dl > div {
		padding: clamp(1rem, 2.4vw, 2rem);
	}
	dl > div + div {
		border-left: 1px solid #d9d8d0;
	}
	dt {
		font-size: 0.95rem;
		font-weight: 600;
	}
	dd {
		margin: 0.6rem 0 0;
	}
	strong {
		display: block;
		font-size: clamp(2rem, 3.2vw, 3rem);
		line-height: 1.12;
		letter-spacing: -0.04em;
		font-variant-numeric: tabular-nums;
	}
	small {
		display: block;
		margin-top: 0.7rem;
		color: #485055;
		font-size: 0.9rem;
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
	@media (max-width: 640px) {
		dl,
		.compact {
			grid-template-columns: 1fr;
		}
		dl > div + div {
			border-left: none;
			border-top: 1px solid #d9d8d0;
		}
	}
</style>
