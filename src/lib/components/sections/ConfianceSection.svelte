<script lang="ts">
	import Underline from '$lib/components/Underline.svelte';

	export let content:
		| {
				status?: string | null;
				title?: string | null;
				company_list?: { name?: string | null; img?: { url?: string | null } | null }[];
		  }
		| null;
	export let cii:
		| {
				status?: string | null;
				description?: string | null;
				image?: { url?: string | null } | null;
		  }
		| null = null;
</script>

{#if content}
	<section class="relative max-w-screen-2xl space-y-8 mx-auto px-4 py-16 md:py-24" id="trust">
		<div class="group">
			<h2 class="text-3xl font-bold text-center md:text-4xl">
				{content.title || 'Technologies'}
			</h2>
			<Underline />
		</div>
		{#if content.company_list?.length}
			<div class="relative overflow-hidden">
				<div class="marquee-container">
					<div class="marquee-content">
						{#each content.company_list as company}
							<div class="marquee-item">
								<img
									src={company?.img?.url || '/logo.webp'}
									alt={company?.name || 'Company logo'}
									title={company?.name || 'Company logo'}
									class="logo-img {['Mastercard', 'Galloo', 'SNAM'].includes(company?.name || '') ? 'logo-small' : ''} object-contain grayscale hover:grayscale-0 transition-all duration-300"
								/>
							</div>
						{/each}
					</div>
					<div class="marquee-content" aria-hidden="true">
						{#each content.company_list as company}
							<div class="marquee-item">
								<img
									src={company?.img?.url || '/logo.webp'}
									alt={company?.name || 'Company logo'}
									title={company?.name || 'Company logo'}
									class="logo-img {['Mastercard', 'Galloo', 'SNAM'].includes(company?.name || '') ? 'logo-small' : ''} object-contain grayscale hover:grayscale-0 transition-all duration-300"
								/>
							</div>
						{/each}
					</div>
				</div>
			</div>
			{#if cii}
				<p class="text-center text-sm">{@html cii.description || ''}</p>

				<figure class="w-fit mx-auto">
					<img src={cii?.image?.url || '/logo.webp'} alt="CII" title="CII" width="150" height="100" />
				</figure>
			{/if}
		{/if}
	</section>
{/if}

<style>
	.marquee-container {
		display: flex;
		width: 100%;
		user-select: none;
	}

	.marquee-content {
		display: flex;
		animation: marquee 30s linear infinite;
		flex-shrink: 0;
	}

	.marquee-item {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 200px;
		height: 120px;
		padding: 1rem 1.5rem;
	}

	.logo-img {
		max-width: 160px;
		max-height: 100px;
		width: auto;
		height: auto;
	}

	.logo-small {
		max-width: 100px;
		max-height: 70px;
	}

	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-100%);
		}
	}

	.marquee-container:hover .marquee-content {
		animation-play-state: paused;
	}
</style>
