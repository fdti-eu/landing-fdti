import type { Lang } from '$lib/data';

export const offerPaths = {
	packaging: '/filieres/economie-circulaire/rep-emballages'
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
		packaging: {
			label: 'Emballages',
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
		packaging: {
			label: 'Packaging',
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
		packaging: {
			label: 'Envases',
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
		packaging: {
			label: 'Verpackungen',
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
		packaging: {
			label: 'Imballaggi',
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
