<script>
	import CaseStudyTag from './CaseStudyTag.svelte';
	export let data;
	let translatedContent;
	$: if (data?.translations?.length) translatedContent = data?.translations[0];
</script>

{#if data && translatedContent}
	<a
		href="/retours-dexperiences/{data.slug}"
		class="w-64 h-96 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer"
	>
		{#if data.img}
			<img
				class="w-full"
				src={`https://cms.fdti.eu/assets/${data.img.id}`}
				alt={translatedContent.title}
				title={translatedContent.title}
			/>
		{/if}
		<div class="px-6 py-4">
			<div class="font-bold text-xl mb-2">{translatedContent.title}</div>
			<p
				class="text-gray-700 text-base overflow-hidden"
				style="text-overflow: ellipsis; white-space: nowrap;"
			>
				{@html translatedContent.content}
			</p>
		</div>
		<div class="px-6 pt-4 pb-2">
			{#each data.tags as tag (tag)}
				<span
					class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
					>#{tag}</span
				>
			{/each}
		</div>
	</a>
{/if}
