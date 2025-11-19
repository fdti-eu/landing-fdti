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
		class="bg-lightGrey py-10 px-5 xl:py-16 xl:px-10 rounded-2xl after:transition-all after:ease-in-out after:duration-300 group after:bg-yellow after:absolute after:bottom-0 after:inset-x-0 after:h-0 hover:after:h-2 relative overflow-hidden"
	>
		<div class="group-hover:-translate-y-5 transition-all ease-in-out duration-300 space-y-6">
			<div class="flex justify-center  h-16 w-full">
				<img
					src={content.icon?.url || '/images/charge.svg'}
					alt={content.title}
					title={content.title}
					height="64"
					width="64"
				/>
			</div>
			<p class="text-2xl text-center">{content.title}</p>
			<p class="text-center">{@html content.description || ''}</p>
		</div>
	</div>
{/if}
