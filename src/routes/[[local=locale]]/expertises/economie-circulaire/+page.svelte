<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import ExpertiseHub, { type ExpertiseHubContent } from '$lib/components/ExpertiseHub.svelte';
	import LdTag from '$lib/components/json-ld/LDTag.svelte';
	import { schema } from '$lib/components/json-ld/json-ld';
	import {
		absoluteImageUrl,
		buildLocalizedPath,
		buildLocalizedUrl,
		SOCIAL_IMAGE_PATH
	} from '$lib/functions/seo';
	import type { Lang } from '$lib/data';
	import type { PageData } from './$types';

	export let data: PageData;
	$: content = data.content;
	$: canonical = buildLocalizedUrl('/expertises/economie-circulaire', data.locale);
	const workSlugs: Record<'2' | '3' | '8', Record<Lang, string>> = {
		'2': {
			fr: 'plateforme-economie-circulaire',
			en: 'end-of-life-vehicle-platform',
			es: 'plataforma-economia-circular',
			de: 'plattform-fahrzeugruecknahme',
			it: 'piattaforma-veicoli-fuori-uso'
		},
		'3': {
			fr: 'marketplace-batteries',
			en: 'marketplace-batteries',
			es: 'marketplace-baterias',
			de: 'marktplatz-fuer-second-life-batterien',
			it: 'marketplace-batterie-seconda-vita'
		},
		'8': {
			fr: 'plateforme-operations-recyclage-batteries',
			en: 'battery-recycling-operations-platform',
			es: 'plataforma-operaciones-reciclaje-baterias',
			de: 'betriebsplattform-batterierecycling',
			it: 'piattaforma-riciclo-batterie'
		}
	};
	const commonCopy: Record<
		Lang,
		{
			home: string;
			expertise: string;
			heroTitle: string;
			multiCountry: string;
			marketplace: string;
		}
	> = {
		fr: {
			home: 'Accueil',
			expertise: 'Expertises',
			heroTitle: 'Faire circuler les matières sans perdre l’information en route.',
			multiCountry: 'Déploiement multi-pays',
			marketplace: 'Marketplace batteries'
		},
		en: {
			home: 'Home',
			expertise: 'Expertise',
			heroTitle: 'Keep materials moving without losing information along the way.',
			multiCountry: 'Multi-country delivery',
			marketplace: 'Battery marketplace'
		},
		es: {
			home: 'Inicio',
			expertise: 'Especialidades',
			heroTitle: 'Hacer circular los materiales sin perder información por el camino.',
			multiCountry: 'Despliegue multinacional',
			marketplace: 'Marketplace de baterías'
		},
		de: {
			home: 'Startseite',
			expertise: 'Kompetenzen',
			heroTitle: 'Materialien im Kreislauf halten, ohne Informationen zu verlieren.',
			multiCountry: 'Länderübergreifende Einführung',
			marketplace: 'Batteriemarktplatz'
		},
		it: {
			home: 'Pagina iniziale',
			expertise: 'Competenze',
			heroTitle: 'Far circolare i materiali senza perdere le informazioni lungo il percorso.',
			multiCountry: 'Implementazione in più paesi',
			marketplace: 'Marketplace di batterie'
		}
	};
	$: common = commonCopy[data.locale];
	$: pageCopy =
		data.locale === 'fr'
			? {
					journeyLabel: 'Flux métiers couverts',
					multiCountryTitle: 'Parcours multi-pays, multisite et routing',
					multiCountryText:
						'Les règles pays, la localisation exacte, le centre le plus proche par route et le mode de dépôt orientent le parcours B2B ou B2C.',
					multiCountryResult: 'Règles pays, routing et tarification réunis dans un même parcours.',
					marketplaceTitle: 'Constituer et publier des lots de batteries',
					marketplaceText:
						'Les batteries éligibles sont regroupées avec leur code lot, devise, photos et documents techniques.',
					marketplaceResult:
						'Le gestionnaire choisit les partenaires autorisés et les règles de visibilité du lot.',
					proofLabel: 'Réalisations',
					vehicleLink: 'Voir la plateforme véhicules',
					batteryLink: 'Voir la plateforme batteries',
					recyclerLabel: 'Opérations de recyclage',
					recyclerTitle: 'Piloter les déclarations, collectes et traitements de batteries.',
					recyclerText:
						'Une plateforme pour qualifier les déclarations, préparer les listes de colisage, gérer les BSD Trackdéchets et suivre réception et traitement.',
					recyclerLink: 'Voir la plateforme recycleur',
					integrationLabel: 'Documents et systèmes',
					integrationTitle: 'L’information doit suivre l’opération.',
					integrationText:
						'Codes déchets, diagnostics, BSD, signatures, propositions de prix et changements de statut restent rattachés au dossier métier. Les APIs et notifications permettent aux partenaires de conserver leurs propres outils sans recréer une chaîne de ressaisie.',
					faqLabel: 'Questions fréquentes'
				}
			: data.locale === 'es'
				? {
						journeyLabel: 'Flujos empresariales cubiertos',
						multiCountryTitle: 'Recorridos multinacionales, multisitio y routing',
						multiCountryText:
							'Las reglas de cada país, la ubicación exacta, el centro más cercano por carretera y el método de entrega orientan cada recorrido B2B o B2C.',
						multiCountryResult:
							'Reglas nacionales, routing y tarificación reunidos en un mismo recorrido.',
						marketplaceTitle: 'Crear y publicar lotes de baterías',
						marketplaceText:
							'Las baterías aptas se agrupan con su código de lote, divisa, fotografías y documentos técnicos.',
						marketplaceResult:
							'El responsable selecciona a los socios autorizados y configura las reglas de visibilidad.',
						proofLabel: 'Proyectos',
						vehicleLink: 'Ver la plataforma de vehículos',
						batteryLink: 'Ver la plataforma de baterías',
						recyclerLabel: 'Operaciones de reciclaje',
						recyclerTitle: 'Gestionar las declaraciones, recogidas y tratamientos de baterías.',
						recyclerText:
							'Una plataforma para clasificar las declaraciones, preparar las listas de embalaje, gestionar los BSD de Trackdéchets y seguir la recepción y el tratamiento.',
						recyclerLink: 'Ver la plataforma del reciclador',
						integrationLabel: 'Documentos y sistemas',
						integrationTitle: 'La información debe acompañar a la operación.',
						integrationText:
							'Los códigos de residuos, diagnósticos, BSD, firmas, propuestas de precios y cambios de estado permanecen vinculados al expediente empresarial. Las API y las notificaciones permiten que los socios conserven sus propias herramientas sin crear otra cadena de introducción manual.',
						faqLabel: 'Preguntas frecuentes'
					}
				: data.locale === 'de'
					? {
							journeyLabel: 'Abgedeckte Geschäftsabläufe',
							multiCountryTitle: 'Länder- und standortübergreifende Abläufe mit Routing',
							multiCountryText:
								'Länderspezifische Regeln, der genaue Standort, das auf der Straße nächstgelegene Zentrum und die Art der Abgabe steuern den jeweiligen B2B- oder B2C-Ablauf.',
							multiCountryResult:
								'Länderregeln, Routing und Preisgestaltung in einem Ablauf vereint.',
							marketplaceTitle: 'Batterielose zusammenstellen und veröffentlichen',
							marketplaceText:
								'Geeignete Batterien werden mit Loscode, Währung, Fotos und technischen Dokumenten gebündelt.',
							marketplaceResult:
								'Die verantwortliche Person wählt zugelassene Partner und legt die Sichtbarkeitsregeln des Loses fest.',
							proofLabel: 'Referenzen',
							vehicleLink: 'Altfahrzeugplattform ansehen',
							batteryLink: 'Batterieplattform ansehen',
							recyclerLabel: 'Recyclingprozesse',
							recyclerTitle: 'Batteriemeldungen, Abholungen und Behandlungen steuern.',
							recyclerText:
								'Eine Plattform zur Qualifizierung von Meldungen, Vorbereitung von Packlisten, Verwaltung der Trackdéchets-Begleitscheine sowie Nachverfolgung von Eingang und Behandlung.',
							recyclerLink: 'Recyclingplattform ansehen',
							integrationLabel: 'Dokumente und Systeme',
							integrationTitle: 'Informationen müssen den Vorgang begleiten.',
							integrationText:
								'Abfallschlüssel, Diagnosen, Begleitscheine, Unterschriften, Preisvorschläge und Statusänderungen bleiben mit dem Geschäftsvorgang verknüpft. APIs und Benachrichtigungen ermöglichen Partnern, ihre eigenen Werkzeuge weiterzuverwenden, ohne eine neue manuelle Erfassungskette aufzubauen.',
							faqLabel: 'Häufig gestellte Fragen'
						}
					: data.locale === 'it'
						? {
								journeyLabel: 'Flussi aziendali coperti',
								multiCountryTitle: 'Percorsi multipaese, multisito e routing',
								multiCountryText:
									'Le regole di ciascun paese, la posizione esatta, il centro più vicino su strada e la modalità di conferimento orientano ogni percorso B2B o B2C.',
								multiCountryResult:
									'Regole nazionali, routing e tariffe riuniti nello stesso percorso.',
								marketplaceTitle: 'Creare e pubblicare lotti di batterie',
								marketplaceText:
									'Le batterie idonee vengono raggruppate con codice del lotto, valuta, fotografie e documenti tecnici.',
								marketplaceResult:
									'Il responsabile seleziona i partner autorizzati e configura le regole di visibilità del lotto.',
								proofLabel: 'Progetti',
								vehicleLink: 'Vedete la piattaforma per i veicoli',
								batteryLink: 'Vedete la piattaforma per le batterie',
								recyclerLabel: 'Operazioni di riciclo',
								recyclerTitle: 'Gestire dichiarazioni, raccolte e trattamento delle batterie.',
								recyclerText:
									'Una piattaforma per qualificare le dichiarazioni, preparare le liste dei colli, gestire i BSD tramite Trackdéchets nei flussi francesi e monitorare ricezione e trattamento.',
								recyclerLink: 'Vedete la piattaforma per il riciclatore',
								integrationLabel: 'Documenti e sistemi',
								integrationTitle: 'Le informazioni devono accompagnare l’operazione.',
								integrationText:
									'Codici dei rifiuti, diagnosi, BSD per i flussi francesi, firme, proposte di prezzo e cambi di stato restano collegati alla pratica aziendale. API e notifiche consentono ai partner di mantenere i propri strumenti senza creare un’altra catena di inserimento manuale.',
								faqLabel: 'Domande frequenti'
							}
						: {
								journeyLabel: 'Business flows covered',
								multiCountryTitle: 'Multi-country, multisite journeys and routing',
								multiCountryText:
									'Country rules, precise location, the closest center by road and drop-off method guide each B2B or B2C journey.',
								multiCountryResult: 'Country rules, routing and pricing combined in one journey.',
								marketplaceTitle: 'Build and publish battery lots',
								marketplaceText:
									'Eligible batteries are grouped with a lot code, currency, photos and technical documents.',
								marketplaceResult:
									'The manager selects authorized partners and configures visibility rules.',
								proofLabel: 'Work',
								vehicleLink: 'See the vehicle platform',
								batteryLink: 'See the battery platform',
								recyclerLabel: 'Recycling operations',
								recyclerTitle: 'Manage battery declarations, collections and treatment.',
								recyclerText:
									'A platform to qualify declarations, prepare packing lists, manage Trackdéchets records and follow reception and treatment.',
								recyclerLink: 'See the recycler platform',
								integrationLabel: 'Documents and systems',
								integrationTitle: 'Information must follow the operation.',
								integrationText:
									'Waste codes, diagnostics, tracking forms, signatures, price proposals and status changes remain attached to the business record. APIs and notifications let partners keep their own tools without creating another re-entry chain.',
								faqLabel: 'Frequently asked questions'
							};
	$: workflowItems = [
		...content.dossiers[0].sections.map((section) => ({
			...section,
			group: content.dossiers[0].label
		})),
		{
			id: 'multi-pays',
			navLabel: pageCopy.multiCountryTitle,
			situation: pageCopy.multiCountryText,
			result: pageCopy.multiCountryResult,
			group: common.multiCountry
		},
		...content.dossiers[1].sections.map((section) => ({
			...section,
			group: content.dossiers[1].label
		})),
		{
			id: 'marketplace',
			navLabel: pageCopy.marketplaceTitle,
			situation: pageCopy.marketplaceText,
			result: pageCopy.marketplaceResult,
			group: common.marketplace
		},
		...content.dossiers[2].sections
			.filter((section) => ['bsd', 'connexions'].includes(section.id))
			.map((section) => ({ ...section, group: content.dossiers[2].label }))
	];
	$: proofLink = {
		fr: 'Découvrir le projet',
		en: 'Explore the project',
		es: 'Descubrir el proyecto',
		de: 'Projekt entdecken',
		it: 'Scoprite il progetto'
	}[data.locale];
	let hub: ExpertiseHubContent;
	$: hub = {
		...content,
		title: common.heroTitle,
		journeyLabel: pageCopy.journeyLabel,
		workflows: workflowItems.map((item) => ({
			group: item.group,
			title: item.navLabel,
			text: item.situation,
			result: item.result
		})),
		dossiers: content.dossiers.map((item) => ({
			...item,
			href: buildLocalizedPath(`/expertises/economie-circulaire/${item.slug}`, data.locale)
		})),
		proofLabel: pageCopy.proofLabel,
		proofs: [
			{
				label: content.dossiers[0].label,
				title: content.dossiers[0].title,
				text: content.dossiers[0].description,
				href: buildLocalizedPath(`/realisations/${workSlugs['2'][data.locale]}`, data.locale),
				link: proofLink
			},
			{
				label: pageCopy.recyclerLabel,
				title: pageCopy.recyclerTitle,
				text: pageCopy.recyclerText,
				href: buildLocalizedPath(`/realisations/${workSlugs['8'][data.locale]}`, data.locale),
				link: proofLink
			},
			{
				label: content.dossiers[1].label,
				title: content.dossiers[1].title,
				text: content.dossiers[1].description,
				href: buildLocalizedPath(`/realisations/${workSlugs['3'][data.locale]}`, data.locale),
				link: proofLink
			}
		],
		integration: {
			label: pageCopy.integrationLabel,
			title: pageCopy.integrationTitle,
			text: pageCopy.integrationText
		},
		faqLabel: pageCopy.faqLabel
	};
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

<svelte:head>
	<LdTag
		schema={schema('BreadcrumbList', {
			name: content.metaTitle,
			description: content.metaDescription,
			url: canonical,
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: common.home,
					item: buildLocalizedUrl('/', data.locale)
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: common.expertise,
					item: buildLocalizedUrl('/expertises', data.locale)
				},
				{
					'@type': 'ListItem',
					position: 3,
					name: content.label,
					item: canonical
				}
			]
		})}
	/>
	<LdTag
		schema={schema('FAQPage', {
			name: content.metaTitle,
			description: content.metaDescription,
			url: canonical,
			mainEntity: content.faqs.slice(0, 3).map((faq) => ({
				'@type': 'Question',
				name: faq.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: faq.answer
				}
			}))
		})}
	/>
</svelte:head>

<ExpertiseHub content={hub} eventPrefix="circular" />
