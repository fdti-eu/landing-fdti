import type { Lang } from '$lib/data';

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
		agents: string;
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
		agents: 'Workflows agentiques',
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
		agents: 'Agentic workflows',
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
		agents: 'Flujos de trabajo agénticos',
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
		agents: 'Agentische Workflows',
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
		agents: 'Workflow agentici',
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
