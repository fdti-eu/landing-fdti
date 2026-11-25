<script lang="ts">
	interface Props {
		title: string | null | undefined;
		subtitle?: string | null;
		constrained?: boolean;
		optionalSubtitle?: boolean;
	}

	let { title, subtitle, constrained = false, optionalSubtitle = false }: Props = $props();
</script>

<div class="section-heading">
	<div class="group">
		<h2 class="text-3xl font-bold text-center md:text-4xl">{title}</h2>
	</div>
	{#if !optionalSubtitle || subtitle}
		<h3
			class="text-xl font-bold text-center sm:text-2xl md:text-3xl lg:text-4xl{constrained
				? ' max-w-4xl mx-auto'
				: ''}"
		>
			{subtitle}
		</h3>
	{/if}
</div>
