<script>
	export let content;
	let translatedContent;
	$: if (content.translations.length) translatedContent = content.translations[0];
</script>

{#if content && translatedContent}
	<div
		class="bg-lightGrey py-10 px-5 xl:py-16 xl:px-10 rounded-2xl after:transition-all after:ease-in-out after:duration-300 group after:bg-yellow after:absolute after:bottom-0 after:inset-x-0 after:h-0 hover:after:h-2 relative overflow-hidden"
	>
		<div class="group-hover:-translate-y-5 transition-all ease-in-out duration-300 space-y-6">
			<div class="flex justify-center  h-16 w-full">
				<img
					src="https://cms.fdti.eu/assets/{content.icon?.filename_disk}"
					alt={content.title}
					title={content.title}
				/>
			</div>
			<h3 class="text-2xl text-center">{translatedContent.title}</h3>
			<p class="text-center">{@html translatedContent.description}</p>
		</div>
	</div>
{/if}
