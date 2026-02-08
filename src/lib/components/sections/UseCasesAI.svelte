<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let visible = false;
	let observer: IntersectionObserver;
	let sectionRef: HTMLElement;

	const useCases = [
		{
			client: 'Synamedia',
			sector: 'Media & Broadcast',
			challenge: 'Analyser des milliers de flux vidéo en temps réel pour détecter les anomalies.',
			solution: 'Pipeline ML avec détection automatique, alerting intelligent, dashboard temps réel.',
			impact: '95% de précision',
			impactDetail: 'détection automatique'
		},
		{
			client: 'BlaBlaCar',
			sector: 'Mobilité',
			challenge: 'Optimiser le matching conducteurs/passagers sur des millions de trajets.',
			solution: 'Algorithmes de recommandation avancés, prédiction de demande, optimisation dynamique.',
			impact: '+30% efficacité',
			impactDetail: 'matching amélioré'
		},
		{
			client: 'Addoxe',
			sector: 'Industrie',
			challenge: 'Digitaliser et automatiser les processus de maintenance industrielle.',
			solution: 'Plateforme IoT + IA prédictive, maintenance préventive, optimisation des interventions.',
			impact: '-40% downtime',
			impactDetail: 'maintenance prédictive'
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

<section bind:this={sectionRef} id="cas-usage" class="py-24 md:py-32 bg-grey-2">
	<div class="max-w-6xl mx-auto px-6">
		{#if visible}
			<div class="text-center mb-16" in:fly={{ y: 30, duration: 600 }}>
				<span class="inline-block px-4 py-1 mb-4 text-sm font-medium text-yellow bg-yellow/10 rounded-full">
					Cas d'usage
				</span>
				<h2 class="text-3xl md:text-5xl font-bold text-white mb-4">
					L'IA en action
				</h2>
				<p class="text-lg text-white/60 max-w-2xl mx-auto">
					Des résultats concrets chez nos clients. Pas des POCs, des solutions en production.
				</p>
			</div>

			<div class="space-y-6">
				{#each useCases as useCase, i}
					<div 
						class="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/10 hover:border-yellow/20 transition-all duration-500"
						in:fly={{ y: 40, duration: 600, delay: 200 + i * 150 }}
					>
						<div class="p-8 md:p-10">
							<div class="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
								<!-- Client info -->
								<div class="lg:w-1/4">
									<h3 class="text-2xl font-bold text-white group-hover:text-yellow transition-colors">
										{useCase.client}
									</h3>
									<span class="text-sm text-white/40">{useCase.sector}</span>
								</div>

								<!-- Challenge & Solution -->
								<div class="lg:w-1/2 space-y-4">
									<div>
										<span class="text-xs uppercase tracking-wider text-white/30">Challenge</span>
										<p class="text-white/70 mt-1">{useCase.challenge}</p>
									</div>
									<div>
										<span class="text-xs uppercase tracking-wider text-white/30">Solution</span>
										<p class="text-white/70 mt-1">{useCase.solution}</p>
									</div>
								</div>

								<!-- Impact -->
								<div class="lg:w-1/4 lg:text-right">
									<div class="inline-block lg:block">
										<span class="text-3xl md:text-4xl font-bold text-yellow">{useCase.impact}</span>
										<p class="text-sm text-white/40 mt-1">{useCase.impactDetail}</p>
									</div>
								</div>
							</div>
						</div>

						<!-- Decorative gradient -->
						<div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
					</div>
				{/each}
			</div>

			<!-- CTA -->
			<div class="text-center mt-12" in:fly={{ y: 20, duration: 600, delay: 800 }}>
				<a 
					href="/cas-d-usage"
					class="inline-flex items-center gap-2 text-yellow hover:text-white transition-colors font-medium"
				>
					Voir tous nos cas d'usage
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
					</svg>
				</a>
			</div>
		{/if}
	</div>
</section>
