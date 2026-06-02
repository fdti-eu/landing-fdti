<script lang="ts">
	import Underline from '$lib/components/Underline.svelte';

	export let locale: string = 'fr';

	$: title = locale === 'fr' ? 'Ce que nous construisons' : 'What we build';
	$: subtitle =
		locale === 'fr'
			? 'Une expertise lisible, avec des formats d’intervention concrets pour vos équipes.'
			: 'A clear expertise, with concrete delivery formats for your teams.';
	$: items =
		locale === 'fr'
			? [
					{
						title: 'Copilotes IA',
						description:
							'Recherche d’information, synthèse, aide à la décision, rédaction assistée, support opérationnel ou métier directement dans vos outils.',
						points: ['LLM', 'RAG', 'agents', 'interfaces métier']
					},
					{
						title: 'Automatisation de workflows',
						description:
							'Traitement documentaire, qualification, orchestration, reporting, alerting et coordination entre équipes, logiciels et données.',
						points: ['workflows assistés', 'APIs', 'règles métier', 'automatisation']
					},
					{
						title: 'Applications, bases de données & APIs métier',
						description:
							'Portails, back-offices, dashboards, bases de données, APIs sécurisées et outils internes pensés pour intégrer l’IA proprement dans l’existant.',
						points: ['apps métier', 'bases de données', 'API sécurisée', 'intégration']
					}
			  ]
			: [
					{
						title: 'AI copilots for teams',
						description:
							'Information retrieval, summarization, decision support, assisted writing, and operational help embedded into your tools.',
						points: ['LLM', 'RAG', 'agents', 'business interfaces']
					},
					{
						title: 'Workflow automation',
						description:
							'Document processing, qualification, orchestration, reporting, alerting, and coordination across teams, software, and data.',
						points: ['assisted workflows', 'APIs', 'business rules', 'automation']
					},
					{
						title: 'Business apps, databases & APIs',
						description:
							'Portals, back offices, dashboards, databases, secure APIs, and internal tools designed to integrate AI cleanly into existing systems.',
						points: ['business apps', 'databases', 'secure API', 'integration']
					}
			  ];
</script>

<section class="relative max-w-6xl space-y-8 mx-auto px-2 md:px-12 py-16 md:py-24" id="capabilities">
	<div class="group">
		<h2 class="text-3xl font-bold text-center md:text-4xl">{title}</h2>
		<Underline />
	</div>
	<h3 class="text-xl font-bold text-center sm:text-2xl md:text-3xl lg:text-4xl max-w-4xl mx-auto">
		{subtitle}
	</h3>

	<div class="grid gap-6 md:grid-cols-3 md:pt-10">
		{#each items as item}
			<article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
				<h4 class="text-xl font-bold text-darkGrey">{item.title}</h4>
				<p class="mt-3 text-sm leading-relaxed text-darkGrey/80">{item.description}</p>
				<div class="mt-5 flex flex-wrap gap-2">
					{#each item.points as point}
						<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-darkGrey">{point}</span>
					{/each}
				</div>
			</article>
		{/each}
	</div>
</section>
