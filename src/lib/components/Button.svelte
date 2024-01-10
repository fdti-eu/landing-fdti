<script lang="ts">
	export let isLink = false;
	export let isExternalLink = false;
	export let linkUrl = '';
	export let color: IColor = 'yellow';

    type IColor = 'yellow' | 'white' | 'black' | 'blue' | 'red' | 'green' | 'gray';

	let colorClass: { [key: string]: string } = {
		yellow: 'bg-yellow hover:opacity-80',
		white: 'bg-white hover:opacity-80',
		black: 'bg-black',
		blue: 'bg-blue',
		red: 'bg-red',
		green: 'bg-green',
		gray: 'border border-darkGrey bg-darkGrey text-white hover:bg-white hover:text-darkGrey'
	};
</script>

{#if isLink || isExternalLink}
	<a
		target={isExternalLink ? "_blank" : "_self"}
		rel={isExternalLink ? "noreferrer" : null}
		href={linkUrl}
		class="max-w-sm flex justify-center items-center gap-2 py-2 px-8 rounded-lg {colorClass[color]} text-center font-bold transition-all duration-300"
	>
		<slot />
	</a>
{/if}
