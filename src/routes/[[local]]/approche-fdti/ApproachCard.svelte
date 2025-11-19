<script lang="ts">
	export let content:
		| {
				title: string | null;
				description: string | null;
				icon: {
					url?: string | null;
				} | null;
		  }
		| null;
</script>

{#if content}
	<div
		class="bg-lightGrey rounded-2xl p-5 relative after:transition-all after:ease-in-out after:duration-300 group after:bg-yellow after:absolute after:bottom-0 after:inset-x-0 after:h-0 hover:after:h-2 overflow-hidden"
	>
		<div class="group-hover:-translate-y-5 transition-all ease-in-out duration-300 space-y-6 ">
			<figure class="w-fit h-24 flex items-center mx-auto">
				<img
					src={content.icon?.url || '/images/plus.svg'}
					alt={content.title || ''}
					title={content.title || ''}
					height="56px"
					width="56px"
				/>
			</figure>
			<h3 class="text-lg sm:text-xl md:text-lg lg:text-2xl 2xl:text-3xl text-darkGrey text-center">
				{content.title}
			</h3>
			<div>{@html content.description || ''}</div>
		</div>
	</div>
{/if}
