<script lang="ts">
	export let title = '';
	export let description = '';
	export let iconLink: string | null = null;
</script>

<div class="flex flex-col justify-center items-center gap-4 sm:grid sm:grid-cols-8 sm:items-start">
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
		<div class=" relative  mt-8">
			<div class="flex gap-12 flex-wrap justify-center md:justify-start">
				<slot />
			</div>
		</div>
	</div>
</div>
