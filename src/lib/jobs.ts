import type { Lang } from '$lib/data';

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
	tallyEmbedUrl: string;
	tallyPublicUrl: string;
};

const tallyEmbedBaseUrl = 'https://tally.so/embed/wLjrVp';
const tallyPublicBaseUrl = 'https://tally.so/r/wLjrVp';
const siteBaseUrl = 'https://www.fdti.eu';

const buildTallyUrls = (locale: Lang, offerId: string, slug: string, title: string) => {
	const params = new URLSearchParams({
		offer_id: offerId,
		offer_slug: slug,
		offer_title: title,
		source_url: `${siteBaseUrl}/${locale}/offres-emploi/${slug}`,
		alignLeft: '1',
		hideTitle: '1',
		transparentBackground: '1',
		dynamicHeight: '1'
	});

	return {
		tallyEmbedUrl: `${tallyEmbedBaseUrl}?${params.toString()}`,
		tallyPublicUrl: `${tallyPublicBaseUrl}?${params.toString()}`
	};
};

const consultantFr = {
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
	applicationItems: []
} satisfies Omit<JobOffer, 'tallyEmbedUrl' | 'tallyPublicUrl'>;

const developerFr = {
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
	conditions: consultantFr.conditions,
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
	applicationItems: []
} satisfies Omit<JobOffer, 'tallyEmbedUrl' | 'tallyPublicUrl'>;

const consultantEn = {
	...consultantFr,
	title: 'Business AI Consultant Internship - Project Operations',
	shortTitle: 'Business AI Consultant intern',
	contractType: 'Internship',
	location: 'Fully remote',
	startLabel: 'Start dates available year-round',
	status: 'Active role',
	summary:
		'A hybrid internship focused on structuring projects, preparing client discussions, and using AI to support coordination, specification, and delivery.',
	intro: [
		'FDTI is an AI, code, and data studio building tailored digital solutions: business applications, APIs, domain-specific AI agents, process automation, data platforms, and internal tools.',
		'We work on projects where technology is directly connected to operations: processing documents, connecting systems, structuring data, automating workflows, helping teams make better decisions, and embedding AI into tools that are actually used.',
		'This role is designed for a hybrid profile: someone able to understand business context, structure information, prepare client conversations, track decisions, and use AI to accelerate coordination, specification, and project operations.'
	],
	sections: [
		{
			title: 'What you will do',
			items: [
				'Support project operations across AI, data, and business application projects.',
				'Prepare client meetings: context, agenda, open questions, and discussion material.',
				'Review, structure, and improve functional or technical specifications with the team.',
				'Turn meeting notes, client exchanges, and project decisions into actionable tickets.',
				'Produce release notes, framing notes, project summaries, and follow-up documents.',
				'Use AI agents to analyze repositories, summarize changes, prepare daily reviews, or identify attention points.',
				'Track client feedback, qualify requests, and help the team prioritize work.',
				'Build enough understanding of each domain to connect client needs, product decisions, and technical execution.',
				'Contribute to FDTI internal methods: templates, Notion workflows, automations, and project documentation.'
			]
		}
	],
	requiredSkills: [
		'Strong analytical, synthesis, and information-structuring skills.',
		'Clear and precise written communication.',
		'Ability to hold a professional conversation with clients or project teams.',
		'Autonomy, rigor, and strong organizational habits.',
		'Genuine interest in AI applied to business and operational problems.',
		'Ability to quickly learn a domain, product, or client context.',
		'Comfort with digital tools and clean documentation practices.',
		'Professional English is appreciated depending on the project.'
	],
	niceToHaveSkills: [
		'First experience in project management, consulting, product management, business analysis, or business operations.',
		'Basic understanding of APIs, databases, web applications, or software architecture.',
		'Experience with Notion, Linear, Jira, GitHub, Google Workspace, or project tracking tools.',
		'Advanced use of AI tools to summarize, analyze, structure, or produce documents.',
		'Basic SQL, data, automation, or no-code knowledge.',
		'Interest in industrial, regulatory, documentary, or complex business domains.'
	],
	environmentIntro:
		'You will work with developers, project leads, and business stakeholders on concrete topics.',
	environment: [
		'Domain-specific AI agents.',
		'Business applications and back offices.',
		'Internal tools.',
		'AI-assisted workflows.',
		'Functional and technical specifications.',
		'Project documentation.',
		'Client follow-up.',
		'Business process analysis.',
		'Notion, GitHub, Google Workspace, and internal automations.'
	],
	conditions: [
		'6-month internship.',
		'Start dates available year-round, depending on your school calendar and active projects.',
		'Fully remote.',
		'Compensation according to the applicable French internship framework, depending on profile and context.',
		'Mentoring by the FDTI team.',
		'Possibility to continue working together depending on level, context, and opportunities.'
	],
	process: [
		{
			title: 'First conversation',
			items: ['Get to know each other, understand your expectations, and assess fit with FDTI.']
		},
		{
			title: 'Practical case discussion',
			items: ['A role-specific conversation around a structured operational case.']
		}
	]
} satisfies Omit<JobOffer, 'tallyEmbedUrl' | 'tallyPublicUrl'>;

const developerEn = {
	...developerFr,
	title: 'AI Developer Internship - Domain Agents, Applications and Data',
	shortTitle: 'AI Developer intern',
	contractType: 'Internship',
	location: 'Fully remote',
	startLabel: 'Start dates available year-round',
	status: 'Active role',
	summary:
		'A technical internship to build domain-specific AI agents, applications, APIs, and data workflows connected to real production projects.',
	intro: [
		'FDTI is an AI, code, and data studio building tailored digital solutions: business applications, APIs, domain-specific AI agents, process automation, data platforms, and internal tools.',
		'We work on projects where technology is directly connected to operations: processing documents, connecting systems, structuring data, automating workflows, helping teams make better decisions, and embedding AI into tools that are actually used.',
		'We are looking for AI developer interns to contribute to projects involving agents, business applications, APIs, and data workflows.'
	],
	sections: [
		{
			title: 'What you will do',
			items: [
				'Contribute to domain-specific AI agents connected to data, APIs, or existing tools.',
				'Build business applications, back offices, dashboards, or internal portals.',
				'Design and integrate secure APIs connecting databases, SaaS tools, files, and internal systems.',
				'Prototype AI-assisted workflows: information extraction, summarization, qualification, routing, reporting, and alerting.',
				'Work on R&D building blocks around LLMs, agents, harnesses, RAG, OCR, NLP, auditing, and monitoring.',
				'Contribute to FDTI internal tools for delivery, project steering, and code quality.',
				'Participate in testing, deployment, monitoring, and technical documentation.',
				'Work on client projects that are used in production.'
			]
		}
	],
	requiredSkills: [
		'Solid coding practice, with demonstrable projects.',
		'Ability to read and understand an existing codebase.',
		'Understanding of APIs, databases, and modern web architectures.',
		'Regular use of Git.',
		'Ability to work autonomously in a fully remote setup.',
		'Clear written communication: explaining what was done, what is blocked, and the technical trade-offs.',
		'Genuine interest in AI applied to business problems, beyond text generation tools.'
	],
	niceToHaveSkills: [
		'Experience with TypeScript, SvelteKit, React, or Node.js.',
		'Experience with Python, FastAPI, or automation scripts.',
		'Basic knowledge of SQL, PostgreSQL, SQLite, DuckDB, or data pipelines.',
		'First experience with LLMs, RAG, agents, OCR, NLP, or OpenAI/HuggingFace APIs.',
		'Basic Docker, Linux, cloud, or deployment knowledge.',
		'Experience with Notion, GitHub, Google Workspace, or internal team tools.',
		'Professional English.'
	],
	environmentIntro: 'Depending on the project, you may work with:',
	environment: [
		'TypeScript, SvelteKit, React, Node.js.',
		'Python, FastAPI.',
		'Rust, Axum.',
		'PostgreSQL, SQLite, DuckDB, BigQuery, Snowflake.',
		'REST APIs, GraphQL, Keycloak, SaaS integrations.',
		'OpenAI, HuggingFace, LLMs, RAG, agents, OCR, NLP.',
		'Docker, cloud, private infrastructure, monitoring.',
		'Notion, GitHub, Google Workspace, and FDTI internal tools.'
	],
	conditions: consultantEn.conditions,
	process: [
		{
			title: 'First conversation',
			items: [
				'A video call to understand your background, availability, technical level, and expectations.'
			]
		},
		{
			title: 'Live technical interview',
			items: [
				'A screen-sharing technical discussion focused on how you reason, read a topic, search, use AI, debug, and communicate.',
				'Indicative format: 60 to 90 minutes.'
			]
		}
	]
} satisfies Omit<JobOffer, 'tallyEmbedUrl' | 'tallyPublicUrl'>;

const withTallyUrls = (
	locale: Lang,
	job: Omit<JobOffer, 'tallyEmbedUrl' | 'tallyPublicUrl'>
): JobOffer => ({
	...job,
	...buildTallyUrls(locale, job.id, job.slug, job.title)
});

export const jobOffersByLocale: Record<Lang, JobOffer[]> = {
	fr: [consultantFr, developerFr].map((job) => withTallyUrls('fr', job)),
	en: [consultantEn, developerEn].map((job) => withTallyUrls('en', job))
};

export const jobOffers = jobOffersByLocale.fr;

export const getJobOffers = (locale: Lang) => jobOffersByLocale[locale] || jobOffersByLocale.fr;

export const getJobOffer = (locale: Lang, slug: string) =>
	getJobOffers(locale).find((job) => job.slug === slug) || null;
