<script lang="ts">
	export let title = '';
	export let description = '';
	export let iconLink: string | null = null;
	export let isOpen = false;
	export let onToggle: () => void;
	export let onMouseEnter: () => void;
	export let onMouseLeave: () => void;
</script>

<div
	class="flex flex-col justify-center items-center gap-4 sm:grid sm:grid-cols-8 sm:items-start group/techno p-6 rounded-lg transition-all duration-300 hover:bg-white hover:shadow-md cursor-pointer"
	class:bg-white={isOpen}
	class:shadow-md={isOpen}
	on:click={onToggle}
	on:keydown={(e) => e.key === 'Enter' && onToggle()}
	on:mouseenter={onMouseEnter}
	on:mouseleave={onMouseLeave}
	role="button"
	tabindex="0"
>
	<div
		class="w-16 aspect-square bg-yellow rounded-full border-4 border-darkGrey-2 flex justify-center justify-self-center items-center col-span-1 p-2 sm:w-14"
	>
		{#if iconLink}
			<img src={iconLink} width="64" height="64" class="w-full" alt={title} {title} />
		{/if}
	</div>
	<div class="col-span-7 pl-2 md:pl-0">
		<h3 class="font-bold text-darkGrey text-xl md:text-2xl text-left min-h-14 flex items-center">
			{title}
		</h3>
		<p>{description}</p>
		<div
			class="relative mt-8 overflow-hidden transition-all duration-500 ease-in-out"
			class:max-h-0={!isOpen}
			class:max-h-[600px]={isOpen}
		>
			<div
				class="mb-4 transition-opacity duration-300"
				class:opacity-0={!isOpen}
				class:opacity-100={isOpen}
			>
				<p class="text-sm font-semibold text-darkGrey-2">Technologies and tools used:</p>
			</div>
			<div
				class="flex gap-12 flex-wrap justify-center md:justify-start techno-container"
				class:open={isOpen}
			>
				<slot />
			</div>
		</div>
	</div>
</div>

<style>
	.techno-container :global(> *) {
		opacity: 0 !important;
		transform: translateX(-20px) !important;
		transition: all 0.1s ease-in-out !important;
	}

	/* Applique l'animation quand le container est ouvert */
	.techno-container.open :global(> *) {
		opacity: 1 !important;
		transform: translateX(0) !important;
	}

	.techno-container.open :global(> *:nth-child(1)) {
		transition-delay: 0s !important;
	}

	.techno-container.open :global(> *:nth-child(2)) {
		transition-delay: 0.1s !important;
	}

	.techno-container.open :global(> *:nth-child(3)) {
		transition-delay: 0.2s !important;
	}

	.techno-container.open :global(> *:nth-child(4)) {
		transition-delay: 0.3s !important;
	}

	.techno-container.open :global(> *:nth-child(5)) {
		transition-delay: 0.4s !important;
	}

	.techno-container.open :global(> *:nth-child(6)) {
		transition-delay: 0.5s !important;
	}

	.techno-container.open :global(> *:nth-child(7)) {
		transition-delay: 0.6s !important;
	}

	.techno-container.open :global(> *:nth-child(8)) {
		transition-delay: 0.7s !important;
	}
</style>
