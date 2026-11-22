<script lang="ts">
	import CapabilityDiagram from './CapabilityDiagram.svelte';
	import type { Lang } from '$lib/data';
	import { buildLocalizedPath } from '$lib/functions/seo';
	import { navigationCopy, sectorCopy, solutionLabels, type SolutionId } from '$lib/navigation';
	import { solutionHref } from '$lib/solution-pages';

	/** Solution page detailing each capability, in display order. */
	const capabilitySolutions: SolutionId[] = [
		'ia-documents',
		'automatisation-agents',
		'applications-web'
	];

	export let locale: Lang = 'fr';

	const content: Record<
		Lang,
		{
			title: string;
			subtitle: string;
			items: { title: string; description: string }[];
		}
	> = {
		fr: {
			title: 'Ce que nous construisons',
			subtitle:
				'Nous questionnons la demande initiale pour définir ce qui mérite réellement d’être développé. Adapter l’existant, connecter vos logiciels ou simplifier un processus sont aussi de vraies réponses.',
			items: [
				{
					title: 'IA appliquée à vos dossiers',
					description:
						'Lire un lot de pièces, retrouver le bon dossier, préparer une synthèse avec un renvoi aux sources. L’IA prépare le travail, la personne vérifie et décide.'
				},
				{
					title: 'Automatisation des processus',
					description:
						'Saisies, classements, relances et rapprochements passent par un workflow. Vos équipes traitent les exceptions au lieu de recopier les informations.'
				},
				{
					title: 'Applications métier',
					description:
						'Portails, back-offices et tableaux de bord où vos équipes et vos partenaires suivent le même dossier, chacun avec ses droits.'
				}
			]
		},
		en: {
			title: 'What we build',
			subtitle:
				'We question the initial request to define what is actually worth building. Adapting what you have, connecting your software or simplifying a process are real answers too.',
			items: [
				{
					title: 'AI applied to your case files',
					description:
						'Read a batch of documents, find the right file, prepare a summary that links back to the sources. AI prepares the work; people check and decide.'
				},
				{
					title: 'Process automation',
					description:
						'Data entry, filing, reminders and reconciliations run through a workflow. Your teams handle the exceptions instead of copying information.'
				},
				{
					title: 'Business applications',
					description:
						'Portals, back offices and dashboards where your teams and partners follow the same file, each with their own permissions.'
				}
			]
		},
		es: {
			title: 'Lo que construimos',
			subtitle:
				'Cuestionamos la solicitud inicial para definir lo que realmente merece desarrollarse. Adaptar lo existente, conectar sus programas o simplificar un proceso también son respuestas reales.',
			items: [
				{
					title: 'IA aplicada a sus expedientes',
					description:
						'Leer un lote de documentos, encontrar el expediente correcto y preparar una síntesis con referencias a las fuentes. La IA prepara el trabajo; la persona verifica y decide.'
				},
				{
					title: 'Automatización de procesos',
					description:
						'Las entradas de datos, clasificaciones, recordatorios y conciliaciones pasan por un flujo de trabajo. Sus equipos se ocupan de las excepciones en lugar de copiar información.'
				},
				{
					title: 'Aplicaciones de negocio',
					description:
						'Portales, back offices y paneles donde sus equipos y sus socios siguen el mismo expediente, cada uno con sus permisos.'
				}
			]
		},
		de: {
			title: 'Was wir entwickeln',
			subtitle:
				'Wir hinterfragen die ursprüngliche Anfrage, um festzulegen, was sich wirklich zu entwickeln lohnt. Bestehendes anpassen, Ihre Software verbinden oder einen Prozess vereinfachen sind ebenfalls echte Antworten.',
			items: [
				{
					title: 'KI für Ihre Vorgänge',
					description:
						'Einen Stapel Dokumente lesen, den richtigen Vorgang finden und eine Zusammenfassung mit Verweis auf die Quellen vorbereiten. Die KI bereitet vor, der Mensch prüft und entscheidet.'
				},
				{
					title: 'Prozessautomatisierung',
					description:
						'Erfassung, Ablage, Erinnerungen und Abgleiche laufen über einen Workflow. Ihre Teams bearbeiten die Ausnahmen, statt Informationen abzutippen.'
				},
				{
					title: 'Fachanwendungen',
					description:
						'Portale, Backoffices und Dashboards, in denen Ihre Teams und Partner denselben Vorgang verfolgen, jeweils mit eigenen Berechtigungen.'
				}
			]
		},
		it: {
			title: 'Cosa realizziamo',
			subtitle:
				'Mettiamo in discussione la richiesta iniziale per definire ciò che vale davvero la pena sviluppare. Adattare l’esistente, collegare i vostri software o semplificare un processo sono anch’esse risposte concrete.',
			items: [
				{
					title: 'IA applicata alle vostre pratiche',
					description:
						'Leggere un lotto di documenti, ritrovare la pratica giusta, preparare una sintesi con rimando alle fonti. L’IA prepara il lavoro, la persona verifica e decide.'
				},
				{
					title: 'Automazione dei processi',
					description:
						'Inserimenti, classificazioni, solleciti e riconciliazioni passano da un workflow. I vostri team gestiscono le eccezioni invece di ricopiare le informazioni.'
				},
				{
					title: 'Applicazioni aziendali',
					description:
						'Portali, back office e dashboard in cui i vostri team e i vostri partner seguono la stessa pratica, ciascuno con i propri permessi.'
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
				<a
					class="capability-link"
					href={buildLocalizedPath(solutionHref(capabilitySolutions[index], locale), locale)}
				>
					{solutionLabels[locale][capabilitySolutions[index]]}
				</a>
			</article>
		{/each}
	</div>

	<nav class="capability-sectors" aria-label={navigationCopy[locale].sectors}>
		<a href={buildLocalizedPath('/filieres', locale)}>{navigationCopy[locale].sectorLink}</a>
		<a href={buildLocalizedPath('/filieres/economie-circulaire', locale)}
			>{navigationCopy[locale].circular}</a
		>
		<a href={buildLocalizedPath('/filieres/justice', locale)}>{sectorCopy[locale].justice}</a>
	</nav>
</section>
