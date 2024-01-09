<script>
	export let content;
	export let cii;
	let translatedContent;
	$: if (content?.translations?.length) translatedContent = content?.translations[0];
</script>

{#if content && translatedContent && content.status === 'published'}
	<section class="pb-16 md:pb-24 px-3 wrap:relative pt-30">
		<div class="max-w-screen-wrap mx-auto px-3 wrap:px-5">
			<div class="max-w-screen-mv mx-auto">
				<h2 class="text-3xl md:text-4xl font-bold text-center">
					{translatedContent.title}
				</h2>
				<div class="flex justify-center my-2 relative h-4">
					<span class="bg-yellow h-2 w-20  absolute top-1/2 -translate-y-1/2 z-10" />
					<span
						class="bg-black w-80 h-px absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
					/>
				</div>
			</div>

			<div class="pt-10 flex flex-col md:flex-row gap-10 items-center justify-center">
				{#each content.company_list as company}
					<div class="w-60 flex justify-center">
						<img
							src="https://cms.fdti.eu/assets/{company.img.id}"
							alt={company.name}
							title={company.name}
						/>
					</div>
				{/each}
			</div>
			<div
				class="flex flex-col gap-10 items-center justify-center max-w-6xl mx-auto pt-10 xl:px-20"
			>
				{#if cii && cii.status === 'published'}
					<p class="text-center text-sm">{@html cii.translations[0].description}</p>

					<div>
						<img
							src={'https://cms.fdti.eu/assets/' + cii.image.id}
							alt="CII"
							title="CII"
							width="150"
							height="100"
						/>
					</div>
				{/if}
			</div>
		</div>
	</section>
{/if}
