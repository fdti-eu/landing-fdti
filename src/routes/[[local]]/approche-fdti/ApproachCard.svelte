<script lang="ts">
	export let content: {
		name: string | null;
		order: number | null;
		icon: {
			id: string;
		} | null;
		translations:
			| ({
					title: string | null;
					description: string | null;
			  } | null)[]
			| null;
	} | null;

	$: translatedContent = content?.translations?.length ? content?.translations[0] : null;
</script>

{#if content && translatedContent}
	<div
		class="bg-lightGrey rounded-2xl p-5 relative after:transition-all after:ease-in-out after:duration-300 group after:bg-yellow after:absolute after:bottom-0 after:inset-x-0 after:h-0 hover:after:h-2 overflow-hidden"
	>
		<div class="group-hover:-translate-y-5 transition-all ease-in-out duration-300 space-y-6 ">
			<figure class="w-fit h-24 flex items-center mx-auto">
				<img
					src="https://cms.fdti.eu/assets/{content.icon?.id}"
					alt={translatedContent.title}
					title={translatedContent.title}
					height="56px"
					width="56px"
				/>
			</figure>
			<h3 class="text-lg sm:text-xl md:text-lg lg:text-2xl 2xl:text-3xl text-darkGrey text-center">
				{translatedContent.title}
			</h3>
			<div>{@html translatedContent.description}</div>
		</div>
	</div>
{/if}
