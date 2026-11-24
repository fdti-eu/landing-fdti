import type { Lang } from '#lib/data.ts';

export const solutionIds = [
	'applications-web',
	'api-integrations',
	'data-pilotage',
	'ia-documents',
	'automatisation-agents',
	'infrastructure-exploitation'
] as const;
export type SolutionId = (typeof solutionIds)[number];

export const solutionLabels: Record<Lang, Record<SolutionId, string>> = {
	fr: {
		'applications-web': 'Applications web & logiciels métier',
		'api-integrations': 'API & intégrations',
		'data-pilotage': 'Data & pilotage',
		'ia-documents': 'IA & traitement documentaire',
		'automatisation-agents': 'Automatisation & agents IA',
		'infrastructure-exploitation': 'Infrastructure & exploitation'
	},
	en: {
		'applications-web': 'Web applications & business software',
		'api-integrations': 'APIs & integrations',
		'data-pilotage': 'Data & analytics',
		'ia-documents': 'AI & document processing',
		'automatisation-agents': 'Automation & AI agents',
		'infrastructure-exploitation': 'Infrastructure & operations'
	},
	es: {
		'applications-web': 'Aplicaciones web y software empresarial',
		'api-integrations': 'API e integraciones',
		'data-pilotage': 'Datos y analítica',
		'ia-documents': 'IA y procesamiento documental',
		'automatisation-agents': 'Automatización y agentes de IA',
		'infrastructure-exploitation': 'Infraestructura y operaciones'
	},
	de: {
		'applications-web': 'Webanwendungen & Fachsoftware',
		'api-integrations': 'APIs & Integrationen',
		'data-pilotage': 'Daten & Analytik',
		'ia-documents': 'KI & Dokumentenverarbeitung',
		'automatisation-agents': 'Automatisierung & KI-Agenten',
		'infrastructure-exploitation': 'Infrastruktur & Betrieb'
	},
	it: {
		'applications-web': 'Applicazioni web e software aziendale',
		'api-integrations': 'API e integrazioni',
		'data-pilotage': 'Dati e analisi',
		'ia-documents': 'IA ed elaborazione documentale',
		'automatisation-agents': 'Automazione e agenti IA',
		'infrastructure-exploitation': 'Infrastruttura e gestione operativa'
	}
};

export const sectorPaths: Record<Lang, { vehicles: string; batteries: string }> = {
	fr: { vehicles: 'vehicules', batteries: 'batteries' },
	en: { vehicles: 'vehicules', batteries: 'batteries' },
	es: { vehicles: 'vehiculos', batteries: 'baterias' },
	de: { vehicles: 'fahrzeuge', batteries: 'batterien' },
	it: { vehicles: 'veicoli-fuori-uso', batteries: 'batterie' }
};

export const navigationCopy: Record<
	Lang,
	{
		solutions: string;
		allSolutions: string;
		sectors: string;
		circular: string;
		documents: string;
		vehicles: string;
		batteries: string;
		packaging: string;
		work: string;
		contact: string;
		sectorIntro: string;
		resources: string;
		resourceIntro: string;
		sectorLink: string;
	}
> = {
	fr: {
		solutions: 'Solutions',
		allSolutions: 'Toutes nos solutions',
		sectors: 'Filières',
		circular: 'Économie circulaire',
		documents: 'Analyse documentaire',
		vehicles: 'Véhicules en fin de vie',
		batteries: 'Batteries',
		packaging: 'Emballages',
		work: 'Réalisations',
		contact: 'Parlons de votre projet',
		sectorIntro:
			'Des logiciels adaptés aux acteurs, aux flux et aux contraintes de chaque filière.',
		resources: 'Approfondissements transversaux',
		resourceIntro: 'Documents, données et intégrations : des besoins communs à plusieurs filières.',
		sectorLink: 'Explorer nos filières'
	},
	en: {
		solutions: 'Solutions',
		allSolutions: 'All our solutions',
		sectors: 'Sectors',
		circular: 'Circular economy',
		documents: 'Document analysis',
		vehicles: 'End-of-life vehicles',
		batteries: 'Batteries',
		packaging: 'Packaging',
		work: 'Work',
		contact: 'Discuss your project',
		sectorIntro: 'Software tailored to the stakeholders, flows and constraints of each sector.',
		resources: 'Cross-sector guides',
		resourceIntro: 'Documents, data and integrations: shared needs across sectors.',
		sectorLink: 'Explore our sectors'
	},
	es: {
		solutions: 'Soluciones',
		allSolutions: 'Todas las soluciones',
		sectors: 'Sectores',
		circular: 'Economía circular',
		documents: 'Análisis documental',
		vehicles: 'Vehículos fuera de uso',
		batteries: 'Baterías',
		packaging: 'Envases',
		work: 'Proyectos',
		contact: 'Hablemos de su proyecto',
		sectorIntro: 'Software adaptado a los actores, flujos y requisitos de cada sector.',
		resources: 'Guías transversales',
		resourceIntro: 'Documentos, datos e integraciones: necesidades comunes a varios sectores.',
		sectorLink: 'Explorar nuestros sectores'
	},
	de: {
		solutions: 'Lösungen',
		allSolutions: 'Alle Lösungen',
		sectors: 'Branchen',
		circular: 'Kreislaufwirtschaft',
		documents: 'Dokumentenanalyse',
		vehicles: 'Altfahrzeuge',
		batteries: 'Batterien',
		packaging: 'Verpackungen',
		work: 'Referenzen',
		contact: 'Ihr Projekt besprechen',
		sectorIntro: 'Software für die Akteure, Abläufe und Anforderungen jeder Branche.',
		resources: 'Branchenübergreifende Leitfäden',
		resourceIntro:
			'Dokumente, Daten und Integrationen: gemeinsame Anforderungen verschiedener Branchen.',
		sectorLink: 'Unsere Branchen entdecken'
	},
	it: {
		solutions: 'Soluzioni',
		allSolutions: 'Tutte le soluzioni',
		sectors: 'Settori',
		circular: 'Economia circolare',
		documents: 'Analisi documentale',
		vehicles: 'Veicoli fuori uso',
		batteries: 'Batterie',
		packaging: 'Imballaggi',
		work: 'Progetti',
		contact: 'Parliamo del vostro progetto',
		sectorIntro: 'Software adatto agli attori, ai flussi e ai requisiti di ogni settore.',
		resources: 'Guide trasversali',
		resourceIntro: 'Documenti, dati e integrazioni: esigenze comuni a diversi settori.',
		sectorLink: 'Esplorare i nostri settori'
	}
};

export const sectorCopy = {
	fr: {
		home: 'Accueil',
		all: 'Toutes les filières',
		justice: 'Justice',
		circularIntro:
			'Suivre un véhicule, une batterie ou des emballages entre les acteurs de la reprise, du réemploi et du recyclage.',
		justiceIntro:
			'Préparer la lecture d’un dossier judiciaire, contrôler ses pièces et retrouver la source d’un calcul sans se substituer à la décision judiciaire.'
	},
	en: {
		home: 'Home',
		all: 'All sectors',
		justice: 'Justice',
		circularIntro:
			'Track vehicles, batteries and packaging across collection, reuse and recycling.',
		justiceIntro:
			'Prepare case files for review, check documents and trace calculations back to their sources while leaving judicial decisions to the people responsible.'
	},
	es: {
		home: 'Inicio',
		all: 'Todos los sectores',
		justice: 'Justicia',
		circularIntro:
			'Seguir vehículos, baterías y envases en la recogida, la reutilización y el reciclaje.',
		justiceIntro:
			'Preparar la revisión de expedientes, comprobar documentos y rastrear los cálculos hasta su fuente sin sustituir la decisión judicial.'
	},
	de: {
		home: 'Startseite',
		all: 'Alle Branchen',
		justice: 'Justiz',
		circularIntro:
			'Fahrzeuge, Batterien und Verpackungen bei Rücknahme, Wiederverwendung und Recycling verfolgen.',
		justiceIntro:
			'Akten zur Prüfung vorbereiten, Unterlagen kontrollieren und Berechnungen bis zur Quelle zurückverfolgen. Die gerichtliche Entscheidung bleibt beim zuständigen Menschen.'
	},
	it: {
		home: 'Home',
		all: 'Tutti i settori',
		justice: 'Giustizia',
		circularIntro:
			'Seguire veicoli, batterie e imballaggi dalla raccolta al riutilizzo e al riciclo.',
		justiceIntro:
			'Preparare la lettura dei fascicoli, controllare i documenti e risalire alle fonti dei calcoli senza sostituirsi alla decisione giudiziaria.'
	}
} satisfies Record<
	Lang,
	Record<'home' | 'all' | 'justice' | 'circularIntro' | 'justiceIntro', string>
>;
