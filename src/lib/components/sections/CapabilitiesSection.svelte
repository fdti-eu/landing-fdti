<script lang="ts">
	import CapabilityDiagram from './CapabilityDiagram.svelte';
	import type { Lang } from '$lib/data';

	export let locale: Lang = 'fr';

	const content: Record<
		Lang,
		{
			title: string;
			subtitle: string;
			items: { title: string; description: string; points: string[] }[];
		}
	> = {
		fr: {
			title: 'Ce que nous construisons',
			subtitle: 'Une expertise lisible, avec des formats d’intervention concrets pour vos équipes.',
			items: [
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
		},
		en: {
			title: 'What we build',
			subtitle: 'Clear expertise, with concrete delivery formats for your teams.',
			items: [
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
			]
		},
		es: {
			title: 'Lo que construimos',
			subtitle:
				'Competencias claramente definidas, con formatos de intervención concretos para sus equipos.',
			items: [
				{
					title: 'Copilotos de IA para equipos',
					description:
						'Búsqueda de información, síntesis, ayuda para la toma de decisiones, redacción asistida y apoyo operativo integrados en sus herramientas.',
					points: ['LLM', 'RAG', 'agentes', 'interfaces empresariales']
				},
				{
					title: 'Automatización de procesos',
					description:
						'Tratamiento documental, clasificación, orquestación, reporting, alertas y coordinación entre equipos, software y datos.',
					points: ['procesos asistidos', 'API', 'reglas de negocio', 'automatización']
				},
				{
					title: 'Aplicaciones, bases de datos y API empresariales',
					description:
						'Portales, back offices, dashboards, bases de datos, API seguras y herramientas internas diseñadas para integrar la IA correctamente en los sistemas existentes.',
					points: ['aplicaciones empresariales', 'bases de datos', 'API segura', 'integración']
				}
			]
		},
		de: {
			title: 'Was wir entwickeln',
			subtitle: 'Klare Kompetenzen und konkrete Umsetzungsformate für Ihre Teams.',
			items: [
				{
					title: 'KI-Copiloten für Teams',
					description:
						'Informationssuche, Zusammenfassungen, Entscheidungshilfen, unterstütztes Schreiben und operative Unterstützung direkt in Ihren Werkzeugen.',
					points: ['LLM', 'RAG', 'Agenten', 'Fachanwendungen']
				},
				{
					title: 'Workflow-Automatisierung',
					description:
						'Dokumentenverarbeitung, Qualifizierung, Orchestrierung, Reporting, Warnmeldungen und Koordination zwischen Teams, Software und Daten.',
					points: ['unterstützte Workflows', 'APIs', 'Geschäftsregeln', 'Automatisierung']
				},
				{
					title: 'Fachanwendungen, Datenbanken und APIs',
					description:
						'Portale, Backoffices, Dashboards, Datenbanken, sichere APIs und interne Werkzeuge, die KI sauber in bestehende Systeme integrieren.',
					points: ['Fachanwendungen', 'Datenbanken', 'sichere API', 'Integration']
				}
			]
		},
		it: {
			title: 'Cosa realizziamo',
			subtitle: 'Competenze chiare e modalità di intervento concrete per i vostri team.',
			items: [
				{
					title: 'Copiloti IA per i team',
					description:
						'Ricerca di informazioni, sintesi, supporto alle decisioni, scrittura assistita e aiuto operativo integrati nei vostri strumenti.',
					points: ['LLM', 'RAG', 'agenti', 'interfacce aziendali']
				},
				{
					title: 'Automazione dei workflow',
					description:
						'Elaborazione documentale, qualificazione, orchestrazione, reporting, avvisi e coordinamento tra team, software e dati.',
					points: ['workflow assistiti', 'API', 'regole aziendali', 'automazione']
				},
				{
					title: 'Applicazioni, database e API aziendali',
					description:
						'Portali, back office, dashboard, database, API sicure e strumenti interni progettati per integrare correttamente l’IA nei sistemi esistenti.',
					points: ['applicazioni aziendali', 'database', 'API sicure', 'integrazione']
				}
			]
		}
	};
	$: copy = content[locale];
</script>

<section class="capabilities-section" id="capabilities">
	<div class="section-heading">
		<div class="group">
			<h2 class="text-3xl font-bold text-center md:text-4xl">{copy.title}</h2>
		</div>
		<h3 class="text-xl font-bold text-center sm:text-2xl md:text-3xl lg:text-4xl max-w-4xl mx-auto">
			{copy.subtitle}
		</h3>
	</div>

	<div class="capabilities-grid">
		{#each copy.items as item, index}
			<article class="capability-card">
				<CapabilityDiagram {index} />
				<h4 class="text-xl font-bold text-darkGrey">{item.title}</h4>
				<p class="mt-3 text-sm leading-relaxed text-darkGrey/80">{item.description}</p>
				<div class="mt-5 flex flex-wrap gap-2">
					{#each item.points as point}
						<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-darkGrey"
							>{point}</span
						>
					{/each}
				</div>
			</article>
		{/each}
	</div>
</section>
