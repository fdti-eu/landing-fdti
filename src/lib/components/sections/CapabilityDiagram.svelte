<script lang="ts">
	export let index: number;
</script>

<svg class="capability-diagram" viewBox="0 0 320 148" fill="none" aria-hidden="true">
	<path d="M0 74h320M160 0v148" stroke="currentColor" opacity=".12" stroke-dasharray="2 7" />
	{#if index === 0}
		<rect x="90" y="24" width="140" height="96" rx="4" stroke="currentColor" opacity=".4" />
		<path
			d="M90 44h140m-129-11h3m7 0h3m7 0h3M113 64h52m-52 13h73m-73 13h34"
			stroke="currentColor"
			opacity=".6"
		/>
		<rect
			x="173"
			y="68"
			width="66"
			height="57"
			rx="4"
			fill="var(--color-grey-2)"
			stroke="currentColor"
		/>
		<path d="M206 80v32m-16-16h32m-27-11 22 22m-22 0 22-22" stroke="currentColor" />
		<path d="M65 58h14m164-8h14" stroke="currentColor" opacity=".4" />
	{:else if index === 1}
		<path d="M66 74h50m35 0h45m27 0h30m-107 0V30h54v28" stroke="currentColor" opacity=".6" />
		<rect
			x="40"
			y="55"
			width="38"
			height="38"
			rx="4"
			fill="var(--color-grey-2)"
			stroke="currentColor"
		/>
		<path d="m142 50 24 24-24 24-24-24Z" fill="var(--color-grey-2)" stroke="currentColor" />
		<rect
			x="192"
			y="55"
			width="38"
			height="38"
			rx="4"
			fill="var(--color-grey-2)"
			stroke="currentColor"
		/>
		<circle cx="268" cy="74" r="18" stroke="currentColor" /><path
			d="m260 74 6 6 10-12"
			stroke="currentColor"
		/>
		<circle cx="59" cy="74" r="5" fill="currentColor" /><circle
			cx="211"
			cy="74"
			r="5"
			fill="currentColor"
		/>
	{:else}
		<path
			d="m84 49 76-35 76 35-76 35Zm0 27 76 35 76-35m-152 28 76 35 76-35M84 49v55m152-55v55M160 84v55"
			stroke="currentColor"
			opacity=".65"
		/>
		<path
			d="m133 46-10 5 10 5m54-10 10 5-10 5m-20-17-12 30"
			stroke="currentColor"
			stroke-width="2"
		/>
		<path d="M53 87h20m174 0h20" stroke="currentColor" /><circle
			cx="48"
			cy="87"
			r="4"
			stroke="currentColor"
		/><circle cx="272" cy="87" r="4" stroke="currentColor" />
	{/if}
</svg>
