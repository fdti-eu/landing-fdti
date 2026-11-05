import type { Lang } from '$lib/data';

export const offerPaths = {
	agentic: '/expertises/workflows-agentiques',
	packaging: '/expertises/economie-circulaire/rep-emballages'
} as const;

export type OfferKey = keyof typeof offerPaths;
export type ExpertiseOffer = {
	label: string;
	title: string;
	description: string;
	audience: string;
	useCasesTitle: string;
	useCases: { title: string; text: string }[];
	approachTitle: string;
	steps: { title: string; text: string }[];
	boundary: string;
	cta: string;
	ctaText: string;
	back: string;
};

export const expertiseOffers: Record<Lang, Record<OfferKey, ExpertiseOffer>> = {
	fr: {
		agentic: {
			label: 'Workflows agentiques',
			title: 'Des agents IA qui font avancer vos opérations.',
			description:
				'FDTI conçoit et met en place des workflows agentiques connectés à vos outils : analyser une demande, réunir les informations, préparer une action et la faire valider au bon moment.',
			audience:
				'Pour les équipes opérations, support et métiers dont les dossiers passent encore par plusieurs outils, documents et validations manuelles.',
			useCasesTitle: 'Partir d’une opération réelle',
			useCases: [
				{
					title: 'Qualifier une demande entrante',
					text: 'Lire un email et ses pièces jointes, identifier le client et le sujet, rechercher les éléments du dossier puis préparer son affectation dans le CRM. Les demandes ambiguës sont transmises à l’équipe.'
				},
				{
					title: 'Préparer un dossier complet',
					text: 'Extraire les informations utiles, les rapprocher des données métier, signaler les pièces manquantes et proposer une synthèse avec ses sources. Un responsable contrôle les points sensibles.'
				},
				{
					title: 'Orchestrer les actions entre outils',
					text: 'Proposer une mise à jour, préparer une réponse ou déclencher une étape autorisée dans vos applications. Les actions engageantes restent soumises à une validation explicite.'
				}
			],
			approachTitle: 'Du premier cas d’usage à un fonctionnement suivi',
			steps: [
				{
					title: 'Cadrer le périmètre',
					text: 'Choisir un flux fréquent, observer son fonctionnement actuel et définir le résultat attendu : temps de traitement, qualité, taux de reprise humaine et coût par dossier.'
				},
				{
					title: 'Relier les outils et les règles',
					text: 'Connecter les API et les sources autorisées. Garder les règles déterministes là où elles suffisent ; utiliser l’IA pour interpréter les contenus et traiter les variations.'
				},
				{
					title: 'Évaluer sur vos dossiers',
					text: 'Tester des cas représentatifs, y compris les documents incomplets et les erreurs d’outil. Vérifier les réponses, les droits d’accès et les étapes qui doivent demander une validation.'
				},
				{
					title: 'Déployer et suivre',
					text: 'Mettre en place journalisation, limites de coût, alertes, reprise sur erreur et retour au traitement manuel. Suivre les résultats avec les équipes puis élargir le périmètre utile.'
				}
			],
			boundary:
				'Le niveau d’autonomie se décide action par action. Les exemples ci-dessus illustrent des usages à cadrer, pas une promesse de fonctionnement sans supervision ni de gain chiffré.',
			cta: 'Cadrer un premier workflow',
			ctaText:
				'Apportez un exemple de dossier, les outils utilisés et l’étape qui prend le plus de temps. Nous définissons ensemble un premier périmètre mesurable.',
			back: 'Toutes nos expertises'
		},
		packaging: {
			label: 'Économie circulaire · REP emballages',
			title: 'Des logiciels métier pour la filière emballages.',
			description:
				'FDTI développe vos logiciels sur mesure pour fiabiliser les données emballages, outiller les processus REP et connecter les acteurs de la filière.',
			audience:
				'Pour les metteurs sur le marché, fabricants d’emballages, éco-organismes et opérateurs de réemploi, de collecte ou de recyclage.',
			useCasesTitle: 'Relier les données aux opérations',
			useCases: [
				{
					title: 'Construire un référentiel emballages',
					text: 'Relier chaque produit à ses composants d’emballage, matériaux, masses et justificatifs. Organiser la collecte fournisseur, les contrôles d’unité et la validation des données manquantes.'
				},
				{
					title: 'Outiller les processus REP',
					text: 'Organiser les campagnes de déclaration, les validations et les corrections. Rapprocher les mises sur le marché des données packaging et conserver les règles et justificatifs utilisés.'
				},
				{
					title: 'Suivre les boucles de réemploi et de recyclage',
					text: 'Rassembler les événements de collecte, retour, tri et traitement. Conserver les preuves transmises par les partenaires et distinguer quantités déclarées, reçues et effectivement documentées.'
				}
			],
			approachTitle: 'Un outil adapté à votre périmètre REP',
			steps: [
				{
					title: 'Définir les acteurs et les obligations',
					text: 'Identifier les entités, pays, catégories d’emballages et périodes concernés avec vos référents métier. La responsabilité élargie du producteur (REP) et le règlement européen sur les emballages (PPWR) ne se confondent pas : les exigences applicables doivent être qualifiées.'
				},
				{
					title: 'Fiabiliser les sources',
					text: 'Cartographier ERP, PIM, fichiers et portails fournisseurs. Définir les identifiants, unités, versions et responsabilités de validation pour conserver une origine vérifiable de chaque donnée.'
				},
				{
					title: 'Automatiser la préparation',
					text: 'Mettre en place imports, rapprochements, contrôles de cohérence, gestion des exceptions et exports. Les règles de calcul et leur version restent explicites et consultables.'
				},
				{
					title: 'Piloter avec une piste d’audit',
					text: 'Suivre la complétude, les écarts et les validations par période. Retrouver les données et les justificatifs qui ont servi à préparer chaque restitution.'
				}
			],
			boundary:
				'Notre expérience en économie circulaire porte notamment sur les véhicules et les batteries. Nous proposons d’adapter ce savoir-faire logiciel aux emballages. Le périmètre réglementaire et les déclarations restent validés par vos responsables compétents ; le logiciel ne constitue pas une certification de conformité.',
			cta: 'Explorer nos solutions pour les emballages',
			ctaText:
				'Partons d’un processus métier, de vos outils et des échanges entre vos partenaires pour définir un premier périmètre concret.',
			back: 'Notre expertise économie circulaire'
		}
	},
	en: {
		agentic: {
			label: 'Agentic workflows',
			title: 'AI agents that move your operations forward.',
			description:
				'FDTI designs and implements agentic workflows connected to your tools: analyze requests, gather information, prepare actions and route them for approval.',
			audience:
				'For operations, support and business teams handling cases across multiple tools, documents and manual approvals.',
			useCasesTitle: 'Start with a real operation',
			useCases: [
				{
					title: 'Qualify incoming requests',
					text: 'Read emails and attachments, identify the customer, retrieve case information and prepare CRM routing. Send ambiguous requests to the team.'
				},
				{
					title: 'Prepare a complete case',
					text: 'Extract information, reconcile it with business data and flag missing documents. Provide a summary with sources for review.'
				},
				{
					title: 'Coordinate actions across tools',
					text: 'Propose updates, draft replies and trigger authorized steps. Actions with significant consequences require explicit approval.'
				}
			],
			approachTitle: 'From the first use case to monitored operations',
			steps: [
				{
					title: 'Define the scope',
					text: 'Select a recurring workflow and establish a baseline: processing time, quality, human intervention and cost per case.'
				},
				{
					title: 'Connect tools and rules',
					text: 'Integrate authorized APIs and sources. Keep deterministic rules where they suffice; use AI to interpret content and handle variation.'
				},
				{
					title: 'Evaluate real cases',
					text: 'Include incomplete documents and tool failures. Check outputs, access rights and approval requirements.'
				},
				{
					title: 'Deploy and monitor',
					text: 'Add logs, cost limits, alerts, error recovery and a manual fallback. Review results with users before expanding the scope.'
				}
			],
			boundary:
				'Autonomy is defined action by action. These are illustrative use cases to scope, not promises of unsupervised operation or quantified savings.',
			cta: 'Scope a first workflow',
			ctaText:
				'Bring a sample case, your current tools and the most time-consuming step. Together we define a measurable first scope.',
			back: 'All our expertise'
		},
		packaging: {
			label: 'Circular economy · Packaging EPR',
			title: 'Reliable packaging data, from supplier to declaration.',
			description:
				'FDTI builds business tools to structure packaging data, prepare extended producer responsibility (EPR) declarations and track reuse and recycling flows.',
			audience:
				'For producers, distributors, packaging teams and operators bringing together data from suppliers, ERP systems, spreadsheets and partners.',
			useCasesTitle: 'Connect data to operations',
			useCases: [
				{
					title: 'Build a packaging reference dataset',
					text: 'Link products to packaging components, materials, weights and supporting documents. Organize supplier collection, unit checks and missing-data validation.'
				},
				{
					title: 'Prepare EPR declarations',
					text: 'Reconcile products placed on the market with packaging data by period and scope. Apply rules approved by your experts, explain discrepancies and export data for review before submission.'
				},
				{
					title: 'Track reuse and recycling loops',
					text: 'Collect return, collection, sorting and treatment events. Retain partner evidence and distinguish reported, received and documented quantities.'
				}
			],
			approachTitle: 'Software shaped around your EPR scope',
			steps: [
				{
					title: 'Define responsibilities',
					text: 'Identify entities, countries, packaging categories and periods with your experts. EPR and the EU Packaging and Packaging Waste Regulation (PPWR) are distinct; applicable requirements must be assessed.'
				},
				{
					title: 'Make sources reliable',
					text: 'Map ERP, PIM, files and supplier portals. Define identifiers, units, versions and validation ownership so data origins remain traceable.'
				},
				{
					title: 'Automate preparation',
					text: 'Implement imports, reconciliation, consistency checks, exception handling and exports, with explicit, versioned calculation rules.'
				},
				{
					title: 'Maintain an audit trail',
					text: 'Monitor completeness, discrepancies and approvals by period. Retrieve the data and evidence behind each output.'
				}
			],
			boundary:
				'Our circular-economy experience includes vehicles and batteries. We propose adapting that software expertise to packaging. Your qualified specialists validate regulatory scope and declarations; software is not a compliance certification.',
			cta: 'Discuss your packaging data',
			ctaText:
				'Start with a packaging file, a sample required output and the main difficulties your team faces.',
			back: 'Our circular-economy expertise'
		}
	},
	es: {
		agentic: {
			label: 'Flujos de trabajo con agentes de IA',
			title: 'Agentes de IA que hacen avanzar sus operaciones.',
			description:
				'FDTI diseña e implementa flujos con agentes de IA conectados a sus herramientas para analizar solicitudes, reunir información y preparar acciones sujetas a aprobación.',
			audience:
				'Para equipos de operaciones, soporte y negocio que gestionan expedientes entre varias herramientas, documentos y validaciones manuales.',
			useCasesTitle: 'Partir de una operación real',
			useCases: [
				{
					title: 'Clasificar solicitudes',
					text: 'Leer correos y adjuntos, identificar al cliente y preparar la asignación en el CRM. Derivar los casos ambiguos al equipo.'
				},
				{
					title: 'Preparar un expediente completo',
					text: 'Extraer información, contrastarla con los datos de negocio y detectar documentos pendientes. Proponer un resumen con fuentes para su revisión.'
				},
				{
					title: 'Coordinar herramientas',
					text: 'Proponer actualizaciones, preparar respuestas y ejecutar pasos autorizados. Las acciones relevantes requieren aprobación explícita.'
				}
			],
			approachTitle: 'Del primer caso de uso a la operación supervisada',
			steps: [
				{
					title: 'Definir el alcance',
					text: 'Elegir un flujo recurrente y medir tiempo de tratamiento, calidad, intervención humana y coste por expediente.'
				},
				{
					title: 'Conectar herramientas y reglas',
					text: 'Integrar API y fuentes autorizadas. Mantener reglas deterministas donde basten y emplear IA para interpretar contenido variable.'
				},
				{
					title: 'Evaluar casos reales',
					text: 'Incluir documentos incompletos y fallos de herramientas. Verificar resultados, permisos y aprobaciones.'
				},
				{
					title: 'Desplegar y supervisar',
					text: 'Incorporar registros, límites de coste, alertas, recuperación de errores y tratamiento manual alternativo antes de ampliar el alcance.'
				}
			],
			boundary:
				'La autonomía se define por acción. Estos ejemplos son casos que deben concretarse, no promesas de funcionamiento sin supervisión ni de ahorros cuantificados.',
			cta: 'Definir un primer flujo',
			ctaText:
				'Comparta un expediente de ejemplo, sus herramientas y la etapa que más tiempo consume para definir un alcance medible.',
			back: 'Todas nuestras especialidades'
		},
		packaging: {
			label: 'Economía circular · RAP de envases',
			title: 'Datos fiables de envases, del proveedor a la declaración.',
			description:
				'FDTI desarrolla herramientas para estructurar datos de envases, preparar declaraciones de responsabilidad ampliada del productor (RAP) y seguir flujos de reutilización y reciclaje.',
			audience:
				'Para productores, distribuidores, equipos de envases y operadores que reúnen datos de proveedores, ERP, archivos y socios.',
			useCasesTitle: 'Conectar datos y operaciones',
			useCases: [
				{
					title: 'Crear un registro de envases',
					text: 'Vincular productos, componentes, materiales, pesos y justificantes. Organizar la recogida de datos de proveedores y los controles de unidades y datos pendientes.'
				},
				{
					title: 'Preparar declaraciones RAP',
					text: 'Conciliar los productos comercializados con sus envases por periodo y ámbito. Aplicar reglas validadas por sus expertos y generar exportaciones para revisión antes de declarar.'
				},
				{
					title: 'Seguir la reutilización y el reciclaje',
					text: 'Reunir eventos de retorno, recogida, clasificación y tratamiento. Conservar pruebas y distinguir cantidades declaradas, recibidas y documentadas.'
				}
			],
			approachTitle: 'Una herramienta adaptada a su ámbito RAP',
			steps: [
				{
					title: 'Definir responsabilidades',
					text: 'Identificar entidades, países, categorías y periodos con sus expertos. La RAP y el reglamento europeo de envases (PPWR) son distintos; hay que determinar las exigencias aplicables.'
				},
				{
					title: 'Fiabilizar las fuentes',
					text: 'Mapear ERP, PIM, archivos y portales. Definir identificadores, unidades, versiones y responsables de validación.'
				},
				{
					title: 'Automatizar la preparación',
					text: 'Implementar importaciones, conciliaciones, controles, gestión de excepciones y exportaciones con reglas explícitas y versionadas.'
				},
				{
					title: 'Conservar la trazabilidad',
					text: 'Supervisar datos pendientes, diferencias y aprobaciones por periodo. Recuperar los datos y justificantes utilizados en cada entrega.'
				}
			],
			boundary:
				'Nuestra experiencia en economía circular incluye vehículos y baterías. Proponemos adaptar ese conocimiento de software a los envases. Sus especialistas validan el ámbito normativo y las declaraciones; el software no certifica el cumplimiento.',
			cta: 'Hablemos de sus datos de envases',
			ctaText:
				'Un archivo de envases, un ejemplo de resultado esperado y sus principales dificultades permiten empezar.',
			back: 'Nuestra experiencia en economía circular'
		}
	},
	de: {
		agentic: {
			label: 'Agentische Workflows',
			title: 'KI-Agenten, die Ihre Abläufe voranbringen.',
			description:
				'FDTI entwickelt und implementiert agentische Workflows: Anfragen analysieren, Informationen zusammenführen und Aktionen in Ihren bestehenden Werkzeugen zur Freigabe vorbereiten.',
			audience:
				'Für Betriebs-, Support- und Fachteams, die Vorgänge über mehrere Systeme, Dokumente und manuelle Freigaben bearbeiten.',
			useCasesTitle: 'Mit einem konkreten Vorgang beginnen',
			useCases: [
				{
					title: 'Anfragen einordnen',
					text: 'E-Mails und Anhänge lesen, Kunden erkennen und die CRM-Zuordnung vorbereiten. Unklare Anfragen an das Team weitergeben.'
				},
				{
					title: 'Vorgänge vervollständigen',
					text: 'Informationen extrahieren, mit Geschäftsdaten abgleichen und fehlende Dokumente markieren. Eine Zusammenfassung mit Quellen zur Prüfung bereitstellen.'
				},
				{
					title: 'Systemübergreifend handeln',
					text: 'Änderungen vorschlagen, Antworten vorbereiten und erlaubte Schritte ausführen. Folgenreiche Aktionen erfordern eine ausdrückliche Freigabe.'
				}
			],
			approachTitle: 'Vom ersten Anwendungsfall zum überwachten Betrieb',
			steps: [
				{
					title: 'Umfang festlegen',
					text: 'Einen wiederkehrenden Ablauf auswählen und Bearbeitungszeit, Qualität, menschliche Eingriffe sowie Kosten pro Vorgang erfassen.'
				},
				{
					title: 'Systeme und Regeln verbinden',
					text: 'Autorisierte APIs und Quellen anbinden. Feste Regeln beibehalten, wo sie ausreichen; KI für variable Inhalte einsetzen.'
				},
				{
					title: 'Reale Fälle bewerten',
					text: 'Unvollständige Dokumente und Systemfehler einbeziehen. Ergebnisse, Zugriffsrechte und Freigaben prüfen.'
				},
				{
					title: 'Einführen und überwachen',
					text: 'Protokolle, Kostenlimits, Warnungen, Fehlerbehandlung und manuelle Rückfallwege einrichten. Ergebnisse vor einer Ausweitung mit den Teams bewerten.'
				}
			],
			boundary:
				'Autonomie wird je Aktion festgelegt. Die Beispiele sind abzustimmende Anwendungsfälle, keine Zusagen für unbeaufsichtigten Betrieb oder bezifferte Einsparungen.',
			cta: 'Einen ersten Workflow abstecken',
			ctaText:
				'Bringen Sie einen Beispielfall, Ihre Werkzeuge und den zeitaufwendigsten Schritt mit. Gemeinsam definieren wir einen messbaren Umfang.',
			back: 'Alle Kompetenzen'
		},
		packaging: {
			label: 'Kreislaufwirtschaft · Verpackungs-EPR',
			title: 'Verlässliche Verpackungsdaten, vom Lieferanten bis zur Meldung.',
			description:
				'FDTI entwickelt Software zur Strukturierung von Verpackungsdaten, Vorbereitung von Meldungen zur erweiterten Herstellerverantwortung (EPR) und Verfolgung von Mehrweg- und Recyclingströmen.',
			audience:
				'Für Hersteller, Händler, Verpackungsteams und Betreiber mit verteilten Daten aus Lieferanten, ERP-Systemen, Dateien und Partnern.',
			useCasesTitle: 'Daten und Abläufe verbinden',
			useCases: [
				{
					title: 'Verpackungsstammdaten aufbauen',
					text: 'Produkte mit Komponenten, Materialien, Gewichten und Nachweisen verknüpfen. Lieferantendaten erfassen und Einheiten sowie fehlende Angaben prüfen.'
				},
				{
					title: 'EPR-Meldungen vorbereiten',
					text: 'Inverkehrgebrachte Produkte je Zeitraum und Geltungsbereich mit Verpackungsdaten abgleichen. Fachlich bestätigte Regeln anwenden und Exporte vor der Meldung prüfen lassen.'
				},
				{
					title: 'Mehrweg und Recycling verfolgen',
					text: 'Rückgabe, Sammlung, Sortierung und Behandlung dokumentieren. Nachweise erhalten und gemeldete, empfangene und belegte Mengen unterscheiden.'
				}
			],
			approachTitle: 'Software für Ihren EPR-Geltungsbereich',
			steps: [
				{
					title: 'Verantwortlichkeiten klären',
					text: 'Einheiten, Länder, Verpackungsarten und Zeiträume mit Ihren Fachleuten bestimmen. EPR und die EU-Verpackungsverordnung (PPWR) sind zu unterscheiden; geltende Anforderungen müssen geprüft werden.'
				},
				{
					title: 'Quellen absichern',
					text: 'ERP, PIM, Dateien und Lieferantenportale erfassen. Kennungen, Einheiten, Versionen und Freigabeverantwortung definieren.'
				},
				{
					title: 'Vorbereitung automatisieren',
					text: 'Importe, Abgleiche, Prüfungen, Ausnahmebehandlung und Exporte mit nachvollziehbaren, versionierten Berechnungsregeln umsetzen.'
				},
				{
					title: 'Prüfpfad erhalten',
					text: 'Vollständigkeit, Abweichungen und Freigaben je Zeitraum verfolgen. Daten und Nachweise jeder Auswertung wiederfinden.'
				}
			],
			boundary:
				'Unsere Erfahrung in der Kreislaufwirtschaft umfasst Fahrzeuge und Batterien. Wir schlagen vor, diese Softwarekompetenz auf Verpackungen zu übertragen. Ihre Fachleute bestätigen Rechtsrahmen und Meldungen; die Software ist keine Konformitätszertifizierung.',
			cta: 'Über Verpackungsdaten sprechen',
			ctaText:
				'Eine Verpackungsdatei, ein Beispiel der erwarteten Ausgabe und Ihre wichtigsten Schwierigkeiten bilden den Ausgangspunkt.',
			back: 'Unsere Kompetenz in der Kreislaufwirtschaft'
		}
	},
	it: {
		agentic: {
			label: 'Workflow agentici',
			title: 'Agenti IA che fanno avanzare le vostre operazioni.',
			description:
				'FDTI progetta e implementa workflow agentici collegati ai vostri strumenti: analizzare richieste, raccogliere informazioni e preparare azioni da approvare.',
			audience:
				'Per team operativi, assistenza e funzioni aziendali che gestiscono pratiche tra più strumenti, documenti e approvazioni manuali.',
			useCasesTitle: 'Partire da un’operazione reale',
			useCases: [
				{
					title: 'Classificare le richieste',
					text: 'Leggere email e allegati, identificare il cliente e preparare l’assegnazione nel CRM. Inoltrare i casi ambigui al team.'
				},
				{
					title: 'Preparare una pratica completa',
					text: 'Estrarre informazioni, confrontarle con i dati aziendali e segnalare documenti mancanti. Proporre una sintesi con fonti da verificare.'
				},
				{
					title: 'Coordinare gli strumenti',
					text: 'Proporre aggiornamenti, preparare risposte ed eseguire passaggi autorizzati. Le azioni rilevanti richiedono approvazione esplicita.'
				}
			],
			approachTitle: 'Dal primo caso d’uso alle operazioni monitorate',
			steps: [
				{
					title: 'Definire il perimetro',
					text: 'Scegliere un flusso ricorrente e misurare tempi, qualità, interventi umani e costo per pratica.'
				},
				{
					title: 'Collegare strumenti e regole',
					text: 'Integrare API e fonti autorizzate. Mantenere regole deterministiche dove bastano e usare l’IA per interpretare contenuti variabili.'
				},
				{
					title: 'Valutare casi reali',
					text: 'Includere documenti incompleti ed errori degli strumenti. Verificare risultati, permessi e approvazioni.'
				},
				{
					title: 'Distribuire e monitorare',
					text: 'Predisporre registri, limiti di costo, avvisi, recupero degli errori e ritorno al trattamento manuale. Valutare i risultati prima di ampliare il perimetro.'
				}
			],
			boundary:
				'L’autonomia si definisce per singola azione. Gli esempi sono casi da approfondire, non promesse di funzionamento senza supervisione o di risparmi quantificati.',
			cta: 'Definire un primo workflow',
			ctaText:
				'Partiamo da una pratica di esempio, dagli strumenti utilizzati e dalla fase più lenta per definire un perimetro misurabile.',
			back: 'Tutte le competenze'
		},
		packaging: {
			label: 'Economia circolare · EPR imballaggi',
			title: 'Dati affidabili sugli imballaggi, dal fornitore alla dichiarazione.',
			description:
				'FDTI sviluppa strumenti per strutturare i dati sugli imballaggi, preparare le dichiarazioni di responsabilità estesa del produttore (EPR) e seguire riutilizzo e riciclo.',
			audience:
				'Per produttori, distributori, team packaging e operatori che riuniscono dati da fornitori, ERP, file e partner.',
			useCasesTitle: 'Collegare dati e operazioni',
			useCases: [
				{
					title: 'Creare un’anagrafica imballaggi',
					text: 'Collegare prodotti, componenti, materiali, pesi e documenti. Organizzare la raccolta dai fornitori e i controlli su unità e dati mancanti.'
				},
				{
					title: 'Preparare dichiarazioni EPR',
					text: 'Riconciliare i prodotti immessi sul mercato con i dati packaging per periodo e perimetro. Applicare regole validate dai vostri esperti ed esportare i dati per la revisione prima della dichiarazione.'
				},
				{
					title: 'Seguire riutilizzo e riciclo',
					text: 'Riunire eventi di reso, raccolta, selezione e trattamento. Conservare le prove e distinguere quantità dichiarate, ricevute e documentate.'
				}
			],
			approachTitle: 'Uno strumento per il vostro perimetro EPR',
			steps: [
				{
					title: 'Definire le responsabilità',
					text: 'Identificare entità, paesi, categorie e periodi con i vostri esperti. EPR e regolamento europeo sugli imballaggi (PPWR) sono distinti: occorre verificare i requisiti applicabili.'
				},
				{
					title: 'Rendere affidabili le fonti',
					text: 'Mappare ERP, PIM, file e portali. Definire identificativi, unità, versioni e responsabilità di validazione.'
				},
				{
					title: 'Automatizzare la preparazione',
					text: 'Implementare importazioni, riconciliazioni, controlli, gestione delle eccezioni ed esportazioni con regole esplicite e versionate.'
				},
				{
					title: 'Conservare la tracciabilità',
					text: 'Seguire completezza, differenze e approvazioni per periodo. Ritrovare dati e documenti utilizzati per ogni risultato.'
				}
			],
			boundary:
				'La nostra esperienza nell’economia circolare comprende veicoli e batterie. Proponiamo di adattare questa competenza software agli imballaggi. I vostri specialisti validano perimetro normativo e dichiarazioni; il software non certifica la conformità.',
			cta: 'Parliamo dei vostri dati packaging',
			ctaText:
				'Un file sugli imballaggi, un esempio del risultato atteso e le principali difficoltà sono sufficienti per iniziare.',
			back: 'La nostra esperienza nell’economia circolare'
		}
	}
};
