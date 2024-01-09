<script>
	export let title = '';
	export let description = '';
	export let iconLink;
</script>

<!-- <div class="relative flex flex-col "> -->
<!-- Headings -->
<div class="grid grid-cols-8 items-start justify-center">
	<div
		class="bg-yellow rounded-full border-4 border-darkGrey-2 flex justify-center justify-self-center items-center h-10 w-10 md:h-14 md:w-14 col-span-1"
	>
		{#if iconLink}
			<img src={'https://cms.fdti.eu/assets/' + iconLink} class="w-6 md:w-8" alt={title} {title} />
		{/if}
	</div>
	<div class="pl-2 md:pl-0 col-span-7">
		<h3 class="font-bold text-darkGrey text-xl md:text-2xl text-left min-h-14 flex items-center">
			{title}
		</h3>
		<p class="">{description}</p>
		<div class=" relative  mt-8">
			<div class="flex gap-12 flex-wrap justify-center md:justify-start">
				<slot />
			</div>
		</div>
	</div>
</div>

<!-- </div> -->
