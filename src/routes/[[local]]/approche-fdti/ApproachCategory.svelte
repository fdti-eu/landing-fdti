<script lang="ts">
	import { locale } from 'svelte-i18n';
	import ApproachCard from './ApproachCard.svelte';
	import type { ApproachContent } from '$lib/data';

	type ApproachCategory = ApproachContent['approach_category'][number];

	export let content: ApproachCategory;

	$: chargeArray = content.charge ? createArray(parseInt(content.charge)) : [];
	$: valueArray = content.value ? createArray(parseInt(content.value)) : [];

	function createArray(value: number) {
		const fullStars = Array(value).fill('full');
		const emptyStars = Array(Math.max(4 - value, 0)).fill('empty');
		return fullStars.concat(emptyStars);
	}
</script>

{#if content}
	<div class="relative flex flex-col pr-5 xs:pr-10 md:pr-5 xl:pr-0">
		<div class="relative pl-16 sm:pl-20 flex flex-col items-start justify-center">
			<div
				class="bg-yellow rounded-full border-4 border-darkGrey-2 flex justify-center items-center h-14 w-14 top-0 absolute left-0"
			>
				<img
					src={content.icon?.url || '/images/plus.svg'}
					alt={content.title || ''}
					title={content.title || ''}
					height="24px"
					width="24px"
				/>
			</div>
			<h2 class="font-bold text-darkGrey text-xl md:text-2xl text-left">
				{content.order_value}. {content.title}
			</h2>
			<div class="flex gap-2 items-center justify-start sm:justify-center pt-2 w-60">
				<div class="w-26 sm:w-42 text-center">Charge</div>
				{#each chargeArray as charge}
					{#if charge === 'full'}
						<img
							src="/images/charge_fill.svg"
							alt="charge filled"
							title="charged filled"
							height="24px"
							width="24px"
						/>
					{:else if charge === 'empty'}
						<img
							src="/images/charge.svg"
							alt="charge empty"
							height="24px"
							width="24px"
							title="charge empty"
						/>
					{/if}
				{/each}
			</div>
			<div class="flex gap-2 items-center justify-start sm:justify-center pt-2 w-60">
				<div class="w-26 sm:w-48">{$locale === 'fr' ? 'Valeur ajoutée' : 'Added value'}</div>
				{#each valueArray as value}
					{#if value === 'full'}
						<img
							src="/images/plus_fill.svg"
							alt="plus filled"
							title="plus filled"
							height="24px"
							width="24px"
						/>
					{:else if value === 'empty'}
						<img
							src="/images/plus.svg"
							alt="plus empty"
							title="plus empty"
							height="24px"
							width="24px"
						/>
					{/if}
				{/each}
			</div>
		</div>
		<div class="pl-14 lg:pl-40 pt-10 pb-4 relative max-w-6xl">
			<hr class="absolute left-6 border-l border-darkGrey h-full -top-4" />
			{#if content?.card_list?.length}
				<div class="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
					{#each content.card_list as card}
						<ApproachCard content={card} />
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}
