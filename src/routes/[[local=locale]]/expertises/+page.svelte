<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import {
		absoluteImageUrl,
		buildLocalizedPath,
		buildLocalizedUrl,
		SOCIAL_IMAGE_PATH
	} from '$lib/functions/seo';
	import type { PageData } from './$types';

	export let data: PageData;

	$: content =
		data.locale === 'fr'
			? {
					metaTitle: 'Applications métier, automatisation, data et IA | FDTI',
					metaDescription:
						'FDTI conçoit des applications métier, des automatisations, des systèmes IA et des intégrations sur mesure, connectés à vos outils et opérations.',
					label: 'Expertises',
					title: 'Une capacité technique large. Des points d’entrée concrets.',
					intro:
						'Nous concevons des systèmes sur mesure lorsqu’il faut automatiser une opération, intégrer l’IA, relier des outils existants ou construire une application métier.',
					buildLabel: 'Ce que nous construisons',
					build: [
						{
							title: 'IA appliquée',
							text: 'Analyse, génération, classification, vision, voix, agents et assistants conversationnels intégrés aux usages de vos équipes.'
						},
						{
							title: 'Automatisation',
							text: 'Documents, règles métier, validations et échanges orchestrés sans ajouter une nouvelle chaîne de ressaisie.'
						},
						{
							title: 'Applications métier',
							text: 'Portails, back-offices, APIs et plateformes conçus autour des opérations réelles et de l’existant technique.'
						},
						{
							title: 'Intégrations & connectivité',
							text: 'APIs, webhooks, identités et échanges de données pour relier ERP, CRM, SaaS, partenaires et outils internes.'
						}
					],
					fieldLabel: 'Expérience métier',
					fields: [
						{
							id: 'economie-circulaire',
							title: 'Économie circulaire',
							text: 'Reprises, batteries, VHU, collecte, documents réglementaires et réseaux de partenaires.',
							href: buildLocalizedPath('/expertises/economie-circulaire', data.locale),
							link: 'Voir notre expertise économie circulaire'
						},
						{
							id: 'documents-critiques',
							title: 'Analyse documentaire',
							text: 'Des pièces sensibles à lire, qualifier, rapprocher et restituer dans un processus contrôlé.',
							href: buildLocalizedPath('/expertises/analyse-documentaire', data.locale),
							link: 'Voir notre expertise analyse documentaire'
						},
						{
							id: 'operations-multi-acteurs',
							title: 'Opérations multi-acteurs',
							text: 'Des responsabilités, des droits et des systèmes différents à réunir autour d’un même dossier.',
							href: buildLocalizedPath('/realisations', data.locale),
							link: 'Parcourir nos réalisations'
						}
					],
					ctaText:
						'Pour commencer, il nous faut un exemple réel, les acteurs concernés, les outils actuellement en place, les données disponibles et les points de douleur.',
					ctaButton: 'Cadrer un premier périmètre'
				}
			: data.locale === 'es'
				? {
						metaTitle: 'Especialidades en software empresarial, datos e IA | FDTI',
						metaDescription:
							'FDTI diseña aplicaciones empresariales, automatizaciones y sistemas de IA integrados en las operaciones y el software existente.',
						label: 'Especialidades',
						title: 'Amplias capacidades técnicas. Puntos de partida concretos.',
						intro:
							'Diseñamos sistemas a medida cuando una operación requiere automatización, IA, conexiones entre herramientas existentes o una nueva aplicación empresarial.',
						buildLabel: 'Lo que construimos',
						build: [
							{
								title: 'IA aplicada',
								text: 'Análisis, generación, clasificación, visión, voz, agentes y asistentes conversacionales integrados en los procesos de sus equipos.'
							},
							{
								title: 'Automatización',
								text: 'Documentos, reglas de negocio, validaciones e intercambios orquestados sin añadir otra cadena de introducción manual.'
							},
							{
								title: 'Aplicaciones empresariales',
								text: 'Portales, back offices, API y plataformas diseñados en torno a las operaciones reales y los sistemas existentes.'
							},
							{
								title: 'Integración y conectividad',
								text: 'API, webhooks, identidades e intercambios de datos para conectar ERP, CRM, SaaS, socios y herramientas internas.'
							}
						],
						fieldLabel: 'Experiencia sectorial',
						fields: [
							{
								id: 'economie-circulaire',
								title: 'Economía circular',
								text: 'Recuperación, baterías, VFU, recogida, documentos normativos y redes de socios.',
								href: buildLocalizedPath('/expertises/economie-circulaire', data.locale),
								link: 'Explorar nuestra especialidad en economía circular'
							},
							{
								id: 'documents-critiques',
								title: 'Análisis documental',
								text: 'Documentos sensibles que deben leerse, clasificarse, conciliarse y devolverse mediante un proceso controlado.',
								href: buildLocalizedPath('/expertises/analyse-documentaire', data.locale),
								link: 'Explorar nuestra especialidad en análisis documental'
							},
							{
								id: 'operations-multi-acteurs',
								title: 'Operaciones con múltiples actores',
								text: 'Responsabilidades, permisos y sistemas diferentes reunidos en torno a un mismo expediente empresarial.',
								href: buildLocalizedPath('/realisations', data.locale),
								link: 'Explorar nuestros proyectos'
							}
						],
						ctaText:
							'Para empezar, necesitamos un ejemplo real, las personas implicadas, las herramientas existentes, los datos disponibles y los puntos problemáticos.',
						ctaButton: 'Definir un primer alcance'
					}
				: data.locale === 'de'
					? {
							metaTitle: 'Fachanwendungen, Automatisierung, Daten und KI | FDTI',
							metaDescription:
								'FDTI entwickelt maßgeschneiderte Fachanwendungen, Automatisierungen, KI-Systeme und Integrationen, die an Ihre bestehenden Werkzeuge und Abläufe angebunden sind.',
							label: 'Kompetenzen',
							title: 'Breite technische Kompetenz. Konkrete Einstiegspunkte.',
							intro:
								'Wir entwickeln maßgeschneiderte Systeme, wenn Abläufe automatisiert, KI integriert, bestehende Werkzeuge verbunden oder eine neue Fachanwendung aufgebaut werden soll.',
							buildLabel: 'Was wir entwickeln',
							build: [
								{
									title: 'Angewandte KI',
									text: 'Analyse, Generierung, Klassifizierung, Computer Vision, Sprache, Agenten und dialogbasierte Assistenten, eingebettet in die Arbeitsabläufe Ihrer Teams.'
								},
								{
									title: 'Automatisierung',
									text: 'Dokumente, Geschäftsregeln, Freigaben und Übergaben werden orchestriert, ohne eine weitere manuelle Erfassungskette zu schaffen.'
								},
								{
									title: 'Fachanwendungen',
									text: 'Portale, Backoffices, APIs und Plattformen, die auf reale Abläufe und bestehende Systeme zugeschnitten sind.'
								},
								{
									title: 'Integration und Konnektivität',
									text: 'APIs, Webhooks, Identitäten und Datenaustausch zur Verbindung von ERP, CRM, SaaS, Partnern und internen Werkzeugen.'
								}
							],
							fieldLabel: 'Branchenerfahrung',
							fields: [
								{
									id: 'economie-circulaire',
									title: 'Kreislaufwirtschaft',
									text: 'Rücknahme, Batterien, Altfahrzeuge, Sammlung, regulatorische Dokumente und Partnernetzwerke.',
									href: buildLocalizedPath('/expertises/economie-circulaire', data.locale),
									link: 'Unsere Kompetenz in der Kreislaufwirtschaft entdecken'
								},
								{
									id: 'documents-critiques',
									title: 'Dokumentenanalyse',
									text: 'Sensible Dokumente, die in einem kontrollierten Prozess gelesen, klassifiziert, abgeglichen und bereitgestellt werden müssen.',
									href: buildLocalizedPath('/expertises/analyse-documentaire', data.locale),
									link: 'Unsere Kompetenz in der Dokumentenanalyse entdecken'
								},
								{
									id: 'operations-multi-acteurs',
									title: 'Prozesse mit mehreren Akteuren',
									text: 'Unterschiedliche Verantwortlichkeiten, Berechtigungen und Systeme werden in einem gemeinsamen Vorgang zusammengeführt.',
									href: buildLocalizedPath('/realisations', data.locale),
									link: 'Unsere Referenzen ansehen'
								}
							],
							ctaText:
								'Für den Einstieg benötigen wir ein reales Beispiel, die beteiligten Personen, die vorhandenen Werkzeuge, die verfügbaren Daten und die konkreten Schwachstellen.',
							ctaButton: 'Einen ersten Umfang definieren'
						}
					: data.locale === 'it'
						? {
								metaTitle: 'Software aziendale, automazione, dati e IA | FDTI',
								metaDescription:
									'FDTI progetta applicazioni aziendali, automazioni, sistemi di IA e integrazioni su misura, collegati agli strumenti e alle operazioni esistenti.',
								label: 'Competenze',
								title: 'Competenze tecniche ampie. Punti di partenza concreti.',
								intro:
									'Progettiamo sistemi su misura quando occorre automatizzare un’operazione, integrare l’IA, collegare strumenti esistenti o realizzare una nuova applicazione aziendale.',
								buildLabel: 'Cosa realizziamo',
								build: [
									{
										title: 'IA applicata',
										text: 'Analisi, generazione, classificazione, visione, voce, agenti e assistenti conversazionali integrati nei flussi di lavoro dei vostri team.'
									},
									{
										title: 'Automazione',
										text: 'Documenti, regole aziendali, convalide e scambi orchestrati senza aggiungere un’altra catena di inserimento manuale.'
									},
									{
										title: 'Applicazioni aziendali',
										text: 'Portali, back office, API e piattaforme progettati intorno alle operazioni reali e ai sistemi già in uso.'
									},
									{
										title: 'Integrazione e connettività',
										text: 'API, webhook, identità e scambi di dati per collegare ERP, CRM, SaaS, partner e strumenti interni.'
									}
								],
								fieldLabel: 'Esperienza settoriale',
								fields: [
									{
										id: 'economie-circulaire',
										title: 'Economia circolare',
										text: 'Ritiro, batterie, veicoli fuori uso, raccolta, documenti normativi e reti di partner.',
										href: buildLocalizedPath('/expertises/economie-circulaire', data.locale),
										link: 'Scoprite la nostra competenza nell’economia circolare'
									},
									{
										id: 'documents-critiques',
										title: 'Analisi documentale',
										text: 'Documenti sensibili da leggere, qualificare, confrontare e restituire attraverso un processo controllato.',
										href: buildLocalizedPath('/expertises/analyse-documentaire', data.locale),
										link: 'Scoprite la nostra competenza in analisi documentale'
									},
									{
										id: 'operations-multi-acteurs',
										title: 'Operazioni con più soggetti',
										text: 'Responsabilità, autorizzazioni e sistemi diversi riuniti intorno alla stessa pratica aziendale.',
										href: buildLocalizedPath('/realisations', data.locale),
										link: 'Esplorate i nostri progetti'
									}
								],
								ctaText:
									'Per iniziare ci servono un esempio reale, i soggetti coinvolti, gli strumenti già in uso, i dati disponibili e i principali punti critici.',
								ctaButton: 'Definire un primo ambito'
							}
						: {
								metaTitle: 'Business software, automation, data and AI | FDTI',
								metaDescription:
									'FDTI designs custom business applications, automation, AI systems and integrations that connect with your existing software and operations.',
								label: 'Expertise',
								title: 'Broad technical capabilities. Concrete starting points.',
								intro:
									'We design custom systems when an operation needs automation, AI, connections between existing tools or a new business application.',
								buildLabel: 'What we build',
								build: [
									{
										title: 'Applied AI',
										text: 'Analysis, generation, classification, vision, voice, agents and conversational assistants embedded in your teams’ workflows.'
									},
									{
										title: 'Automation',
										text: 'Documents, business rules, approvals and handoffs orchestrated without adding another re-entry chain.'
									},
									{
										title: 'Business applications',
										text: 'Portals, back offices, APIs and platforms designed around real operations and existing systems.'
									},
									{
										title: 'Integration & connectivity',
										text: 'APIs, webhooks, identity and data exchanges connecting ERPs, CRMs, SaaS products, partners and internal tools.'
									}
								],
								fieldLabel: 'Industry experience',
								fields: [
									{
										id: 'economie-circulaire',
										title: 'Circular economy',
										text: 'Take-back, batteries, end-of-life vehicles, collection, regulatory records and partner networks.',
										href: buildLocalizedPath('/expertises/economie-circulaire', data.locale),
										link: 'Explore our circular-economy expertise'
									},
									{
										id: 'documents-critiques',
										title: 'Document analysis',
										text: 'Sensitive files that must be read, qualified, reconciled and returned through a controlled process.',
										href: buildLocalizedPath('/expertises/analyse-documentaire', data.locale),
										link: 'Explore our document-analysis expertise'
									},
									{
										id: 'operations-multi-acteurs',
										title: 'Multi-party operations',
										text: 'Different responsibilities, permissions and systems brought together around the same business record.',
										href: buildLocalizedPath('/realisations', data.locale),
										link: 'Browse our work'
									}
								],
								ctaText:
									'To get started, we need a real example, the people involved, the tools already in place, the available data and the pain points.',
								ctaButton: 'Define a first scope'
							};
	$: canonical = buildLocalizedUrl('/expertises', data.locale);
	$: imageAlt =
		data.locale === 'fr'
			? 'FDTI - IA, code et données'
			: data.locale === 'es'
				? 'FDTI - IA, código y datos'
				: data.locale === 'de'
					? 'FDTI - KI, Code und Daten'
					: data.locale === 'it'
						? 'FDTI - IA, codice e dati'
						: 'FDTI - AI, code and data';
	const expertiseTransitionName = (id: string) => {
		if (id === 'economie-circulaire') return 'expertise-hub-circular';
		if (id === 'documents-critiques') return 'expertise-hub-document-analysis';
		return 'none';
	};
</script>

<MetaTags
	title={content.metaTitle}
	description={content.metaDescription}
	{canonical}
	openGraph={{
		type: 'website',
		url: canonical,
		title: content.metaTitle,
		description: content.metaDescription,
		siteName: 'FDTI',
		images: [{ url: absoluteImageUrl(SOCIAL_IMAGE_PATH), alt: imageAlt }]
	}}
/>

<div class="editorial-page">
	<header class="editorial-hero">
		<div class="editorial-shell">
			<p class="editorial-kicker">{content.label}</p>
			<h1>{content.title}</h1>
			<p>{content.intro}</p>
		</div>
	</header>
	<section class="editorial-section editorial-shell">
		<p class="editorial-kicker editorial-section-label">{content.buildLabel}</p>
		<div class="editorial-numbered-grid expertise-build-grid">
			{#each content.build as item, index}
				<article>
					<span>0{index + 1}</span>
					<h3>{item.title}</h3>
					<p>{item.text}</p>
				</article>
			{/each}
		</div>
	</section>
	<section class="editorial-section editorial-fields">
		<div class="editorial-shell">
			<p class="editorial-kicker editorial-section-label">{content.fieldLabel}</p>
			<div class="editorial-field-list">
				{#each content.fields as item, index}
					<a id={item.id} href={item.href}>
						<span>0{index + 1}</span>
						<h3 style={`view-transition-name: ${expertiseTransitionName(item.id)};`}>{item.title}</h3>
						<p>{item.text}</p>
						<strong>{item.link} ↗</strong>
					</a>
				{/each}
			</div>
		</div>
	</section>
	<section class="editorial-cta">
		<div class="editorial-shell">
			<p class="editorial-cta-copy">{content.ctaText}</p>
			<a
				href="https://calendly.com/fdti/30min"
				data-umami-event="calendly_click"
				data-umami-event-placement="expertises_contact">{content.ctaButton} ↗</a
			>
		</div>
	</section>
</div>
