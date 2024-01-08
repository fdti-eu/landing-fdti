<script>
	export let content;
	let translatedContent;
	$: if (content?.translations.length) translatedContent = content.translations[0];
</script>

{#if content && translatedContent}
	<div
		class="bg-lightGrey rounded-2xl p-5 relative after:transition-all after:ease-in-out after:duration-300 group after:bg-yellow after:absolute after:bottom-0 after:inset-x-0 after:h-0 hover:after:h-2 overflow-hidden"
	>
		<div class="group-hover:-translate-y-5 transition-all ease-in-out duration-300 space-y-6 ">
			<div class="relative p-3 flex justify-center items-center">
				<div class="relative p-3 w-20 flex flex-row self-center">
					<img
						src="https://cms.fdti.eu/assets/{content.icon?.id}"
						alt={translatedContent.title}
						title={translatedContent.title}
						height="56px"
						width="56px"
					/>
				</div>
			</div>
			<div class="space-y-5">
				<h3
					class="text-lg sm:text-xl md:text-lg lg:text-2xl 2xl:text-3xl text-darkGrey text-center"
				>
					{translatedContent.title}
				</h3>
				<!-- -------------------------------------- -->
				<div>{@html translatedContent.description}</div>
				<!-- -------------------------------------- -->
			</div>
			<!-- {#if chevron == 'true'}
			<div
				class="absolute -bottom-10 h-10 inset-x-0 md:inset-x-auto md:h-auto md:bottom-0 md:inset-y-0 md:-right-10 w-full md:w-10 flex items-center justify-center"
			>
				<svg
					class="w-3 rotate-90 md:rotate-0"
					viewBox="0 0 9 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1 1L8 8L1 15"
						stroke="black"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
		{/if} -->
		</div>
	</div>
{/if}
