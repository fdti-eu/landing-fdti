<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let visible = false;
	let observer: IntersectionObserver;
	let sectionRef: HTMLElement;

	const services = [
		{
			icon: '🤖',
			title: 'Agents IA & Automatisation',
			description: 'Automatisez vos processus métier avec des agents intelligents. De la qualification de leads à la gestion documentaire.',
			tags: ['LLMs', 'RAG', 'Workflows']
		},
		{
			icon: '📊',
			title: 'Data Engineering',
			description: 'Construisez des pipelines de données robustes. ETL, Data Lakes, temps réel — nous structurons vos données pour l\'IA.',
			tags: ['ETL', 'Data Lake', 'Streaming']
		},
		{
			icon: '🎯',
			title: 'Machine Learning Appliqué',
			description: 'Prédiction, classification, recommandation. Des modèles ML en production, pas juste des POCs.',
			tags: ['Prédiction', 'NLP', 'Vision']
		},
		{
			icon: '☁️',
			title: 'Cloud & Infrastructure',
			description: 'Déployez vos solutions IA à l\'échelle. AWS, GCP, Azure — architecture optimisée pour le ML.',
			tags: ['AWS', 'GCP', 'Kubernetes']
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
			{ threshold: 0.2 }
		);
		observer.observe(sectionRef);
		return () => observer?.disconnect();
	});
</script>

<section bind:this={sectionRef} class="py-24 md:py-32 bg-dark-grey">
	<div class="max-w-6xl mx-auto px-6">
		{#if visible}
			<div class="text-center mb-16" in:fly={{ y: 30, duration: 600 }}>
				<h2 class="text-3xl md:text-5xl font-bold text-white mb-4">
					Notre expertise <span class="text-yellow">IA</span>
				</h2>
				<p class="text-lg text-white/60 max-w-2xl mx-auto">
					De la stratégie à la mise en production, nous vous accompagnons à chaque étape de votre transformation IA.
				</p>
			</div>

			<div class="grid md:grid-cols-2 gap-6 lg:gap-8">
				{#each services as service, i}
					<div 
						class="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-yellow/30 transition-all duration-500 hover:bg-white/[0.04]"
						in:fly={{ y: 40, duration: 600, delay: 200 + i * 100 }}
					>
						<!-- Glow effect on hover -->
						<div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-yellow/5 to-transparent"></div>
						
						<div class="relative z-10">
							<span class="text-4xl mb-4 block">{service.icon}</span>
							<h3 class="text-xl font-bold text-white mb-3 group-hover:text-yellow transition-colors">
								{service.title}
							</h3>
							<p class="text-white/60 mb-4 leading-relaxed">
								{service.description}
							</p>
							<div class="flex flex-wrap gap-2">
								{#each service.tags as tag}
									<span class="px-3 py-1 text-xs font-medium text-white/50 bg-white/5 rounded-full">
										{tag}
									</span>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
