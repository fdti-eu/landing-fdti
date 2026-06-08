export type JobSection = {
	title: string;
	items: string[];
};

export type JobOffer = {
	id: string;
	slug: string;
	title: string;
	shortTitle: string;
	contractType: string;
	location: string;
	experience: string;
	startDate: string;
	startLabel: string;
	postedAt: string;
	status: string;
	intro: string[];
	summary: string;
	sections: JobSection[];
	requiredSkills: string[];
	niceToHaveSkills: string[];
	environmentIntro: string;
	environment: string[];
	conditions: string[];
	process: JobSection[];
	applicationItems: string[];
	tallyUrl: string;
};

const tallyBaseUrl = 'https://tally.so/embed/wLjrVp';

const buildTallyUrl = (offerId: string) =>
	`${tallyBaseUrl}?offer_id=${offerId}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;

export const jobOffers: JobOffer[] = [
	{
		id: '375dd0f6-002e-8181-8f3e-e074888bcbdb',
		slug: 'stage-consultant-ia-metier-project-operations',
		title: 'Stage Consultant IA métier - Project Operations',
		shortTitle: 'Consultant IA métier',
		contractType: 'Stage',
		location: 'Télétravail complet',
		experience: '0-2 ans',
		startDate: '2026-06-15',
		startLabel: 'Entrées possibles toute l’année',
		postedAt: '2026-06-04',
		status: 'Offre active',
		summary:
			'Un stage hybride pour structurer les projets, préparer les échanges client et utiliser l’IA comme levier de coordination, spécification et pilotage.',
		intro: [
			'FDTI est un studio IA, code et data spécialisé dans la conception de solutions numériques sur mesure : applications métier, APIs, agents IA métier, automatisations de processus, plateformes data et outils internes.',
			'Nous intervenons sur des projets où la technique est directement reliée aux opérations : traiter des documents, connecter des systèmes, structurer des données, automatiser des workflows, aider les équipes à prendre de meilleures décisions et intégrer l’IA dans des outils réellement utilisés.',
			'Ce poste s’adresse à un profil hybride, capable de comprendre un projet métier, structurer l’information, préparer les échanges client, suivre les décisions et utiliser l’IA pour accélérer le travail de coordination, de spécification et de pilotage.'
		],
		sections: [
			{
				title: 'Vos missions',
				items: [
					'Participer au suivi opérationnel de projets IA, data et applications métier.',
					'Préparer des réunions client : contexte, ordre du jour, points à clarifier, supports de discussion.',
					'Relire, structurer et améliorer des spécifications fonctionnelles ou techniques avec l’aide de l’équipe.',
					'Transformer des comptes rendus, échanges client ou décisions projet en tickets exploitables.',
					'Produire des release notes, notes de cadrage, synthèses projet et documents de suivi.',
					'Utiliser des agents IA pour analyser des repositories, résumer des changements, préparer des daily reviews ou identifier des points d’attention.',
					'Suivre les retours client, qualifier les demandes et aider à prioriser les sujets avec l’équipe.',
					'Comprendre progressivement les règles métier des projets afin de faire le lien entre client, produit et équipe technique.',
					'Participer à l’amélioration des méthodes internes FDTI : templates, workflows Notion, automatisations, documentation projet.'
				]
			}
		],
		requiredSkills: [
			'Très bonne capacité d’analyse, de synthèse et de structuration de l’information.',
			'Communication écrite claire et précise.',
			'Capacité à tenir un échange professionnel avec un client ou une équipe projet.',
			'Autonomie, rigueur et sens de l’organisation.',
			'Intérêt réel pour l’IA appliquée à des problèmes métier et opérationnels.',
			'Capacité à apprendre rapidement un métier, un produit ou un contexte client.',
			'Aisance avec les outils numériques et capacité à documenter proprement son travail.',
			'Bon niveau d’anglais professionnel apprécié selon les projets.'
		],
		niceToHaveSkills: [
			'Première expérience en gestion de projet, conseil, product management, business analysis ou AMOA.',
			'Compréhension de base des APIs, bases de données, applications web ou architectures logicielles.',
			'Expérience avec Notion, Linear, Jira, GitHub, Google Workspace ou des outils de suivi projet.',
			'Expérience d’utilisation avancée d’outils IA pour résumer, analyser, structurer ou produire des documents.',
			'Notions de SQL, data, automatisation ou no-code.',
			'Intérêt pour les sujets industriels, réglementaires, documentaires ou métier complexes.'
		],
		environmentIntro:
			'Vous travaillerez avec des développeurs, chefs de projet et interlocuteurs métier sur des sujets concrets.',
		environment: [
			'Agents IA métier.',
			'Applications métier et back-offices.',
			'Outils internes.',
			'Workflows assistés.',
			'Spécifications fonctionnelles et techniques.',
			'Documentation projet.',
			'Suivi client.',
			'Analyse de processus métier.',
			'Automatisations Notion, GitHub, Google Workspace ou outils internes.'
		],
		conditions: [
			'Stage de 6 mois.',
			'Entrées possibles toute l’année, selon votre calendrier école et les projets en cours.',
			'Télétravail complet.',
			'Gratification selon cadre légal, à préciser selon profil/contexte.',
			'Encadrement par l’équipe FDTI.',
			'Possibilité de poursuivre la collaboration selon le niveau, le contexte et les opportunités.'
		],
		process: [
			{
				title: 'Premier échange',
				items: ['Faire connaissance, comprendre vos attentes et valider l’adéquation avec FDTI.']
			},
			{
				title: 'Échange orienté cas concret',
				items: ['Un échange adapté au poste, centré sur un sujet opérationnel et structuré.']
			}
		],
		applicationItems: [
			'Votre CV ou profil LinkedIn.',
			'Vos projets, expériences ou réalisations pertinentes.',
			'Un exemple de document, support, analyse, projet ou travail structuré dont vous êtes fier.',
			'Votre date de début possible.',
			'La durée de stage recherchée.',
			'Ce qui vous intéresse dans cette offre.'
		],
		tallyUrl: buildTallyUrl('375dd0f6-002e-8181-8f3e-e074888bcbdb')
	},
	{
		id: '374dd0f6-002e-81e6-87cb-dfacae38b970',
		slug: 'stage-dev-ia-agents-ia-metier-applications-data',
		title: 'Stage Dev/IA - Agents IA métier, applications et data',
		shortTitle: 'Dev/IA agents métier',
		contractType: 'Stage',
		location: 'Télétravail complet',
		experience: '0-2 ans',
		startDate: '2026-06-15',
		startLabel: 'Entrées possibles toute l’année',
		postedAt: '2026-06-03',
		status: 'Offre active',
		summary:
			'Un stage technique pour développer des agents IA métier, applications, APIs et workflows data reliés à des projets réellement utilisés.',
		intro: [
			'FDTI est un studio IA, code et data spécialisé dans la conception de solutions numériques sur mesure : applications métier, APIs, agents IA métier, automatisations de processus, plateformes data et outils internes.',
			'Nous intervenons sur des projets où la technique est directement reliée aux opérations : traiter des documents, connecter des systèmes, structurer des données, automatiser des workflows, aider les équipes à prendre de meilleures décisions et intégrer l’IA dans des outils réellement utilisés.',
			'Pour accompagner notre développement, nous recrutons un stagiaire Dev/IA dans le cadre d’un stage de 6 mois.'
		],
		sections: [
			{
				title: 'Vos missions',
				items: [
					'Participer au développement d’agents IA métier connectés à des données, APIs ou outils existants.',
					'Développer des applications métier, back-offices, dashboards ou portails internes.',
					'Concevoir et intégrer des APIs sécurisées pour relier bases de données, SaaS, fichiers et outils internes.',
					'Prototyper des workflows assistés : extraction d’information, synthèse, qualification, routing, reporting, alerting.',
					'Travailler sur des briques R&D autour des LLMs, agents, harness, RAG, OCR, NLP, audit et monitoring.',
					'Contribuer à des outils internes FDTI pour améliorer le delivery, le pilotage des projets et la qualité du code.',
					'Participer aux tests, déploiement, monitoring, documentation technique.',
					'Intervenir sur des projets clients en production.'
				]
			}
		],
		requiredSkills: [
			'Bonne pratique du code, avec projets démontrables.',
			'Capacité à lire et comprendre un code existant.',
			'Compréhension des APIs, bases de données et architectures web modernes.',
			'Usage régulier de Git.',
			'Capacité à travailler en autonomie en full remote.',
			'Communication écrite claire : savoir expliquer ce qui est fait, ce qui bloque et les choix techniques.',
			'Intérêt réel pour l’IA appliquée à des problèmes métier, pas seulement pour les outils de génération de texte.'
		],
		niceToHaveSkills: [
			'Expérience avec TypeScript, SvelteKit, React ou Node.js.',
			'Expérience avec Python, FastAPI ou des scripts d’automatisation.',
			'Notions de SQL, PostgreSQL, SQLite, DuckDB ou data pipelines.',
			'Première utilisation de LLMs, RAG, agents, OCR, NLP ou APIs OpenAI/HuggingFace.',
			'Connaissances en Docker, Linux, cloud ou déploiement.',
			'Expérience avec Notion, GitHub, Google Workspace ou des outils internes d’équipe.',
			'Bon niveau d’anglais professionnel.'
		],
		environmentIntro: 'Selon les projets, vous pourrez travailler avec :',
		environment: [
			'TypeScript, SvelteKit, React, Node.js.',
			'Python, FastAPI.',
			'Rust, Axum.',
			'PostgreSQL, SQLite, DuckDB, BigQuery, Snowflake.',
			'APIs REST, GraphQL, Keycloak, intégrations SaaS.',
			'OpenAI, HuggingFace, LLMs, RAG, agents, OCR, NLP.',
			'Docker, cloud, infra privée, monitoring.',
			'Notion, GitHub, Google Workspace et outils internes FDTI.'
		],
		conditions: [
			'Stage de 6 mois.',
			'Entrées possibles toute l’année, selon votre calendrier école et les projets en cours.',
			'Télétravail complet.',
			'Gratification selon cadre légal, à préciser selon profil/contexte.',
			'Encadrement par l’équipe FDTI.',
			'Possibilité de poursuivre la collaboration selon le niveau, le contexte et les opportunités.'
		],
		process: [
			{
				title: 'Premier échange',
				items: [
					'Un échange en visio pour comprendre votre parcours, vos disponibilités, votre niveau technique et vos attentes.'
				]
			},
			{
				title: 'Entretien technique live',
				items: [
					'Un entretien technique en visio avec partage d’écran, centré sur votre raisonnement, votre façon de lire un sujet, chercher, utiliser l’IA, débuguer et communiquer.',
					'Format indicatif : 60 à 90 minutes.'
				]
			}
		],
		applicationItems: [
			'Votre CV ou profil LinkedIn.',
			'Votre GitHub, portfolio ou projets publics si vous en avez.',
			'2 ou 3 projets dont vous êtes fier.',
			'Votre date de début possible.',
			'La durée de stage recherchée.',
			'Ce qui vous intéresse dans cette offre.'
		],
		tallyUrl: buildTallyUrl('374dd0f6-002e-81e6-87cb-dfacae38b970')
	}
];

export const getJobOffer = (slug: string) => jobOffers.find((job) => job.slug === slug) || null;
