<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let visible = false;
	let observer: IntersectionObserver;
	let sectionRef: HTMLElement;

	const differentiators = [
		{
			number: '2019',
			label: 'Fondation',
			detail: '5+ ans d\'expérience IA'
		},
		{
			number: '400K€',
			label: 'CA annuel',
			detail: 'Croissance constante'
		},
		{
			number: '20+',
			label: 'Projets livrés',
			detail: 'En production'
		},
		{
			number: 'CII',
			label: 'Accrédité',
			detail: 'Crédit Impôt Innovation'
		}
	];

	const values = [
		{
			icon: '⚡',
			title: 'Livraison rapide',
			description: 'Des sprints courts, des livrables fréquents. Pas de tunnel de 6 mois.'
		},
		{
			icon: '🎯',
			title: 'Pragmatisme',
			description: 'On résout vos problèmes, pas les nôtres. La tech au service du métier.'
		},
		{
			icon: '🤝',
			title: 'Adoption terrain',
			description: 'Une solution non-adoptée est un échec. On accompagne vos équipes.'
		}
	];

	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visible = true;
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.15 }
		);
		observer.observe(sectionRef);
		return () => observer?.disconnect();
	});
</script>

<section bind:this={sectionRef} class="py-24 md:py-32 bg-dark-grey">
	<div class="max-w-6xl mx-auto px-6">
		{#if visible}
			<!-- Stats row -->
			<div 
				class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 pb-20 border-b border-white/10"
				in:fly={{ y: 30, duration: 600 }}
			>
				{#each differentiators as stat, i}
					<div 
						class="text-center"
						in:fly={{ y: 20, duration: 500, delay: 100 + i * 100 }}
					>
						<div class="text-3xl md:text-4xl font-bold text-yellow mb-2">{stat.number}</div>
						<div class="text-white font-medium">{stat.label}</div>
						<div class="text-sm text-white/40 mt-1">{stat.detail}</div>
					</div>
				{/each}
			</div>

			<!-- Values -->
			<div class="text-center mb-12" in:fly={{ y: 30, duration: 600, delay: 400 }}>
				<h2 class="text-3xl md:text-5xl font-bold text-white mb-4">
					Notre <span class="text-yellow">approche</span>
				</h2>
				<p class="text-lg text-white/60 max-w-xl mx-auto">
					L'IA n'est pas une fin en soi. C'est un levier pour atteindre vos objectifs métier.
				</p>
			</div>

			<div class="grid md:grid-cols-3 gap-8">
				{#each values as value, i}
					<div 
						class="text-center p-8"
						in:fly={{ y: 30, duration: 600, delay: 600 + i * 100 }}
					>
						<span class="text-5xl mb-6 block">{value.icon}</span>
						<h3 class="text-xl font-bold text-white mb-3">{value.title}</h3>
						<p class="text-white/60 leading-relaxed">{value.description}</p>
					</div>
				{/each}
			</div>

			<!-- Team mention -->
			<div 
				class="mt-20 text-center p-10 rounded-2xl bg-white/[0.02] border border-white/10"
				in:fly={{ y: 30, duration: 600, delay: 900 }}
			>
				<p class="text-lg text-white/70 mb-4">
					Une équipe senior et polyvalente : <span class="text-white">co-fondateurs techniques</span>, développeurs, data scientists.
				</p>
				<p class="text-white/50">
					Nous travaillons en direct avec vous — pas d'intermédiaires, pas de surprise.
				</p>
			</div>
		{/if}
	</div>
</section>
