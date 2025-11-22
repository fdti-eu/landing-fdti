<script lang="ts">
	export let isOpen = false;
</script>

<div class="w-6 aspect-square flex flex-col justify-around relative">
	<span
		class="w-full h-0.5 bg-white rounded-3xl transition-all duration-300 origin-center absolute top-1/2 -translate-y-1/2 {isOpen
			? 'rotate-45'
			: '-translate-y-[6px]'}"
	></span>
	<span
		class="w-full h-0.5 bg-white rounded-3xl transition-all duration-300 absolute top-1/2 -translate-y-1/2 {isOpen
			? 'opacity-0'
			: 'opacity-100'}"
	></span>
	<span
		class="w-full h-0.5 bg-white rounded-3xl transition-all duration-300 origin-center absolute top-1/2 -translate-y-1/2 {isOpen
			? '-rotate-45'
			: 'translate-y-[6px]'}"
	></span>
</div>
