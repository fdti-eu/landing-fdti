import type { Lang } from '$lib/data';
import { buildLocalizedUrl } from '$lib/functions/seo';

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
const buildTallyUrls = (locale: Lang, offerId: string, slug: string, title: string) => {
	const contextParams = new URLSearchParams({
		offer_id: offerId,
		offer_slug: slug,
		offer_title: title,
		source_url: buildLocalizedUrl(`/offres-emploi/${slug}`, locale)
	});
	const embedParams = new URLSearchParams({
		...Object.fromEntries(contextParams),
		alignLeft: '1',
		hideTitle: '1',
		transparentBackground: '1',
		dynamicHeight: '1'
	});

	return {
		tallyEmbedUrl: `${tallyEmbedBaseUrl}?${embedParams.toString()}`,
		tallyPublicUrl: `${tallyPublicBaseUrl}?${contextParams.toString()}`
	};
};

const consultantFr = {
	id: '375dd0f6-002e-8181-8f3e-e074888bcbdb',
	slug: 'stage-consultant-ia-metier-project-operations',
	title: 'Stage Consultant IA métier - Project Operations',
	shortTitle: 'Consultant IA métier',
	contractType: 'Stage',
	location: 'Modalités à définir',
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
		'Français professionnel courant, à l’écrit comme à l’oral, pour travailler avec l’équipe et les interlocuteurs projet.',
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
		'Modalités de travail à définir selon le cadre du stage, l’école et les projets en cours.',
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
	location: 'Modalités à définir',
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
		'Capacité à travailler en autonomie avec un encadrement régulier.',
		'Communication écrite claire : savoir expliquer ce qui est fait, ce qui bloque et les choix techniques.',
		'Français professionnel courant, à l’écrit comme à l’oral, pour travailler avec l’équipe et les interlocuteurs projet.',
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
	shortTitle: 'Business AI Consultant Intern',
	contractType: 'Internship',
	location: 'Work setup to be defined',
	experience: '0-2 years',
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
				'Produce release notes, scoping briefs, project summaries, and project tracking documents.',
				'Use AI agents to analyze repositories, summarize changes, prepare daily project reviews, or flag potential issues.',
				'Track client feedback, clarify and assess requests, and help the team prioritize work.',
				'Build enough understanding of each domain to connect client needs, product decisions, and technical execution.',
				'Contribute to FDTI internal methods: templates, Notion workflows, automations, and project documentation.'
			]
		}
	],
	requiredSkills: [
		'Strong analytical, synthesis, and information-structuring skills.',
		'Clear and precise written communication.',
		'Professional working proficiency in French, written and spoken, to work with the team and project stakeholders.',
		'Ability to hold a professional conversation with clients or project teams.',
		'Ability to work independently, with attention to detail and strong organizational skills.',
		'Genuine interest in AI applied to business and operational problems.',
		'Ability to quickly learn a domain, product, or client context.',
		'Comfort with digital tools and clean documentation practices.',
		'Professional English proficiency is a plus for some projects.'
	],
	niceToHaveSkills: [
		'First experience in project management, consulting, product management, business analysis, or business operations.',
		'Basic understanding of APIs, databases, web applications, or software architecture.',
		'Experience with Notion, Linear, Jira, GitHub, Google Workspace, or project tracking tools.',
		'Advanced use of AI tools to summarize, analyze, structure, or produce documents.',
		'Basic SQL, data, automation, or no-code knowledge.',
		'Interest in industrial, regulatory, document-heavy, or otherwise complex business domains.'
	],
	environmentIntro:
		'You will work with developers, project leads, and business stakeholders on concrete topics.',
	environment: [
		'AI agents tailored to specific business domains.',
		'Business applications and back offices.',
		'Internal tools.',
		'AI-assisted workflows.',
		'Functional and technical specifications.',
		'Project documentation.',
		'Client and project follow-up.',
		'Business process analysis.',
		'Notion, GitHub, Google Workspace, and internal automations.'
	],
	conditions: [
		'6-month internship.',
		'Start dates available year-round, depending on your school calendar and active projects.',
		'Work setup to be defined according to the internship framework, school requirements, and active projects.',
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
	title: 'AI Developer Internship - Business AI Agents, Applications and Data',
	shortTitle: 'AI Developer Intern',
	contractType: 'Internship',
	location: 'Work setup to be defined',
	experience: '0-2 years',
	startLabel: 'Start dates available year-round',
	status: 'Active role',
	summary:
		'A technical internship building business-focused AI agents, applications, APIs, and data workflows for real-world projects running in production.',
	intro: [
		'FDTI is an AI, code, and data studio building tailored digital solutions: business applications, APIs, domain-specific AI agents, process automation, data platforms, and internal tools.',
		'We work on projects where technology is directly connected to operations: processing documents, connecting systems, structuring data, automating workflows, helping teams make better decisions, and embedding AI into tools that are actually used.',
		'We are looking for an AI development intern to contribute to projects involving agents, business applications, APIs, and data workflows.'
	],
	sections: [
		{
			title: 'What you will do',
			items: [
				'Contribute to AI agents tailored to specific business domains and connected to data, APIs, or existing tools.',
				'Build business applications, back offices, dashboards, or internal portals.',
				'Design and integrate secure APIs connecting databases, SaaS tools, files, and internal systems.',
				'Prototype AI-assisted workflows: information extraction, summarization, qualification, routing, reporting, and alerting.',
				'Work on R&D building blocks around LLMs, agents, harnesses, RAG, OCR, NLP, auditing, and monitoring.',
				'Contribute to FDTI internal tools that improve delivery, project management, and code quality.',
				'Participate in testing, deployment, monitoring, and technical documentation.',
				'Work on client projects that are used in production.'
			]
		}
	],
	requiredSkills: [
		'Solid coding skills, backed by projects you can demonstrate.',
		'Ability to read and understand an existing codebase.',
		'Understanding of APIs, databases, and modern web architectures.',
		'Regular use of Git.',
		'Ability to work autonomously with regular guidance.',
		'Clear written communication: explaining what was done, what is blocked, and the technical trade-offs.',
		'Professional working proficiency in French, written and spoken, to work with the team and project stakeholders.',
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
				'A screen-sharing technical discussion focused on how you reason, approach a problem, research solutions, use AI, debug, and communicate.',
				'Typical duration: 60 to 90 minutes.'
			]
		}
	]
} satisfies Omit<JobOffer, 'tallyEmbedUrl' | 'tallyPublicUrl'>;

const consultantEs = {
	...consultantFr,
	slug: 'practicas-consultor-ia-negocio-operaciones-proyectos',
	title: 'Prácticas como consultor/a de IA para el negocio - Operaciones de proyectos',
	shortTitle: 'Consultor/a de IA para el negocio',
	contractType: 'Prácticas',
	location: 'Modalidad por definir',
	experience: '0-2 años',
	startLabel: 'Incorporaciones posibles durante todo el año',
	status: 'Oferta activa',
	summary:
		'Unas prácticas híbridas para estructurar proyectos, preparar las conversaciones con clientes y utilizar la IA para agilizar la coordinación, la definición y la gestión.',
	intro: [
		'FDTI es un estudio de IA, código y datos especializado en diseñar soluciones digitales a medida: aplicaciones de negocio, API, agentes de IA especializados, automatización de procesos, plataformas de datos y herramientas internas.',
		'Trabajamos en proyectos en los que la tecnología está directamente vinculada a las operaciones: procesar documentos, conectar sistemas, estructurar datos, automatizar flujos de trabajo, ayudar a los equipos a tomar mejores decisiones e integrar la IA en herramientas que se utilizan de verdad.',
		'Este puesto está dirigido a un perfil híbrido, capaz de comprender un proyecto de negocio, estructurar la información, preparar las conversaciones con clientes, hacer seguimiento de las decisiones y utilizar la IA para agilizar la coordinación, la especificación y la gestión de proyectos.'
	],
	sections: [
		{
			title: 'Tus funciones',
			items: [
				'Participar en el seguimiento operativo de proyectos de IA, datos y aplicaciones de negocio.',
				'Preparar reuniones con clientes: contexto, orden del día, puntos por aclarar y materiales de apoyo.',
				'Revisar, estructurar y mejorar especificaciones funcionales o técnicas con la ayuda del equipo.',
				'Convertir actas, conversaciones con clientes o decisiones de proyecto en tickets accionables.',
				'Elaborar notas de versión, documentos de alcance, resúmenes de proyecto y documentos de seguimiento.',
				'Utilizar agentes de IA para analizar repositorios, resumir cambios, preparar revisiones diarias o detectar posibles riesgos.',
				'Hacer seguimiento de los comentarios de los clientes, evaluar y concretar sus solicitudes y ayudar al equipo a priorizar el trabajo.',
				'Comprender progresivamente las reglas de negocio de los proyectos para conectar al cliente, el producto y el equipo técnico.',
				'Participar en la mejora de los métodos internos de FDTI: plantillas, flujos de trabajo de Notion, automatizaciones y documentación de proyectos.'
			]
		}
	],
	requiredSkills: [
		'Muy buena capacidad de análisis, síntesis y estructuración de la información.',
		'Comunicación escrita clara y precisa.',
		'Dominio profesional del francés, tanto escrito como oral, para trabajar con el equipo y las partes implicadas en los proyectos.',
		'Capacidad para mantener una conversación profesional con un cliente o un equipo de proyecto.',
		'Autonomía, rigor y capacidad de organización.',
		'Interés real por la IA aplicada a problemas de negocio y operativos.',
		'Capacidad para aprender rápidamente un sector, un producto o el contexto de un cliente.',
		'Soltura con las herramientas digitales y capacidad para documentar el trabajo de forma clara.',
		'Se valorará un buen nivel de inglés profesional según los proyectos.'
	],
	niceToHaveSkills: [
		'Primera experiencia en gestión de proyectos, consultoría, gestión de producto, análisis de negocio o asistencia a la dirección de proyectos.',
		'Conocimientos básicos de API, bases de datos, aplicaciones web o arquitecturas de software.',
		'Experiencia con Notion, Linear, Jira, GitHub, Google Workspace o herramientas de seguimiento de proyectos.',
		'Experiencia avanzada con herramientas de IA para resumir, analizar, estructurar o elaborar documentos.',
		'Nociones de SQL, datos, automatización o no-code.',
		'Interés por temas industriales, normativos, documentales o ámbitos de negocio complejos.'
	],
	environmentIntro:
		'Trabajarás con desarrolladores, responsables de proyecto e interlocutores de negocio en temas concretos.',
	environment: [
		'Agentes de IA especializados.',
		'Aplicaciones de negocio y back offices.',
		'Herramientas internas.',
		'Flujos de trabajo asistidos.',
		'Especificaciones funcionales y técnicas.',
		'Documentación de proyectos.',
		'Seguimiento con clientes.',
		'Análisis de procesos de negocio.',
		'Automatizaciones de Notion, GitHub, Google Workspace o herramientas internas.'
	],
	conditions: [
		'Prácticas de 6 meses.',
		'Incorporaciones posibles durante todo el año, según tu calendario académico y los proyectos en curso.',
		'Modalidad de trabajo por definir según el marco de las prácticas, el centro educativo y los proyectos en curso.',
		'Remuneración conforme al marco legal aplicable, que se concretará según el perfil y el contexto.',
		'Tutorización por parte del equipo de FDTI.',
		'Posibilidad de continuar la colaboración según el nivel, el contexto y las oportunidades.'
	],
	process: [
		{
			title: 'Primera conversación',
			items: [
				'Conocernos, comprender tus expectativas y comprobar que existe un buen encaje con FDTI.'
			]
		},
		{
			title: 'Conversación sobre un caso práctico',
			items: ['Una conversación adaptada al puesto y centrada en un caso operativo estructurado.']
		}
	]
} satisfies Omit<JobOffer, 'tallyEmbedUrl' | 'tallyPublicUrl'>;

const developerEs = {
	...developerFr,
	slug: 'practicas-desarrollador-ia-agentes-negocio-aplicaciones-datos',
	title: 'Prácticas como desarrollador/a de IA - Agentes para el negocio, aplicaciones y datos',
	shortTitle: 'Desarrollador/a de IA',
	contractType: 'Prácticas',
	location: 'Modalidad por definir',
	experience: '0-2 años',
	startLabel: 'Incorporaciones posibles durante todo el año',
	status: 'Oferta activa',
	summary:
		'Unas prácticas técnicas para desarrollar agentes de IA especializados, aplicaciones, API y flujos de datos para proyectos reales en producción.',
	intro: [
		'FDTI es un estudio de IA, código y datos especializado en diseñar soluciones digitales a medida: aplicaciones de negocio, API, agentes de IA especializados, automatización de procesos, plataformas de datos y herramientas internas.',
		'Trabajamos en proyectos en los que la tecnología está directamente vinculada a las operaciones: procesar documentos, conectar sistemas, estructurar datos, automatizar flujos de trabajo, ayudar a los equipos a tomar mejores decisiones e integrar la IA en herramientas que se utilizan de verdad.',
		'Para acompañar nuestro crecimiento, buscamos una persona en prácticas de desarrollo e IA durante un periodo de 6 meses.'
	],
	sections: [
		{
			title: 'Tus funciones',
			items: [
				'Participar en el desarrollo de agentes de IA especializados conectados a datos, API o herramientas existentes.',
				'Desarrollar aplicaciones de negocio, back offices, paneles de control o portales internos.',
				'Diseñar e integrar API seguras para conectar bases de datos, soluciones SaaS, archivos y herramientas internas.',
				'Crear prototipos de flujos de trabajo asistidos por IA: extracción de información, síntesis, clasificación, enrutamiento, informes y alertas.',
				'Trabajar en componentes de I+D relacionados con LLM, agentes, harnesses, RAG, OCR, NLP, auditoría y monitorización.',
				'Contribuir a las herramientas internas de FDTI para mejorar la entrega, la gestión de proyectos y la calidad del código.',
				'Participar en las pruebas, el despliegue, la monitorización y la documentación técnica.',
				'Trabajar en proyectos de clientes que están en producción.'
			]
		}
	],
	requiredSkills: [
		'Buenas prácticas de programación, con proyectos demostrables.',
		'Capacidad para leer y comprender código existente.',
		'Conocimientos de API, bases de datos y arquitecturas web modernas.',
		'Uso habitual de Git.',
		'Capacidad para trabajar de forma autónoma con orientación periódica.',
		'Comunicación escrita clara: saber explicar qué se ha hecho, qué bloquea el avance y qué decisiones técnicas se han tomado.',
		'Dominio profesional del francés, tanto escrito como oral, para trabajar con el equipo y las partes implicadas en los proyectos.',
		'Interés real por la IA aplicada a problemas de negocio, más allá de las herramientas de generación de texto.'
	],
	niceToHaveSkills: [
		'Experiencia con TypeScript, SvelteKit, React o Node.js.',
		'Experiencia con Python, FastAPI o scripts de automatización.',
		'Nociones de SQL, PostgreSQL, SQLite, DuckDB o pipelines de datos.',
		'Primera experiencia con LLM, RAG, agentes, OCR, NLP o API de OpenAI/HuggingFace.',
		'Conocimientos de Docker, Linux, cloud o despliegue.',
		'Experiencia con Notion, GitHub, Google Workspace o herramientas internas de equipo.',
		'Buen nivel de inglés profesional.'
	],
	environmentIntro: 'Según el proyecto, podrás trabajar con:',
	environment: [
		'TypeScript, SvelteKit, React, Node.js.',
		'Python, FastAPI.',
		'Rust, Axum.',
		'PostgreSQL, SQLite, DuckDB, BigQuery, Snowflake.',
		'API REST, GraphQL, Keycloak e integraciones SaaS.',
		'OpenAI, HuggingFace, LLM, RAG, agentes, OCR y NLP.',
		'Docker, cloud, infraestructura privada y monitorización.',
		'Notion, GitHub, Google Workspace y herramientas internas de FDTI.'
	],
	conditions: consultantEs.conditions,
	process: [
		{
			title: 'Primera conversación',
			items: [
				'Una videollamada para conocer tu trayectoria, disponibilidad, nivel técnico y expectativas.'
			]
		},
		{
			title: 'Entrevista técnica en directo',
			items: [
				'Una entrevista técnica por videollamada con pantalla compartida, centrada en tu razonamiento y en tu forma de abordar un problema, buscar información, utilizar la IA, depurar errores y comunicarte.',
				'Duración orientativa: entre 60 y 90 minutos.'
			]
		}
	]
} satisfies Omit<JobOffer, 'tallyEmbedUrl' | 'tallyPublicUrl'>;

const consultantDe = {
	...consultantFr,
	slug: 'praktikum-ki-berater-geschaeftsprozesse-projektsteuerung',
	title: 'Praktikum KI-Beratung für Geschäftsprozesse und Projektsteuerung',
	shortTitle: 'KI-Beratung für Geschäftsprozesse',
	contractType: 'Praktikum',
	location: 'Arbeitsmodalitäten nach Absprache',
	experience: '0-2 Jahre',
	startLabel: 'Einstieg ganzjährig möglich',
	status: 'Stelle offen',
	summary:
		'Ein vielseitiges Praktikum, in dem Sie Projekte strukturieren, Kundengespräche vorbereiten und KI für Koordination, Spezifikation und Projektsteuerung einsetzen.',
	intro: [
		'FDTI ist ein Studio für KI, Softwareentwicklung und Daten. Wir entwickeln maßgeschneiderte digitale Lösungen: Fachanwendungen, APIs, spezialisierte KI-Agenten, Prozessautomatisierungen, Datenplattformen und interne Werkzeuge.',
		'Unsere Projekte verbinden Technologie unmittelbar mit dem operativen Geschäft: Dokumente verarbeiten, Systeme verknüpfen, Daten strukturieren, Workflows automatisieren, Teams bei besseren Entscheidungen unterstützen und KI in tatsächlich genutzte Werkzeuge integrieren.',
		'Diese Stelle richtet sich an ein vielseitiges Profil, das Geschäftsprozesse versteht, Informationen strukturiert, Kundengespräche vorbereitet, Entscheidungen nachverfolgt und KI nutzt, um Koordination, Spezifikation und Projektsteuerung zu beschleunigen.'
	],
	sections: [
		{
			title: 'Ihre Aufgaben',
			items: [
				'Operative Begleitung von Projekten in den Bereichen KI, Daten und Fachanwendungen.',
				'Vorbereitung von Kundenterminen: Kontext, Agenda, offene Fragen und Gesprächsunterlagen.',
				'Funktionale oder technische Spezifikationen gemeinsam mit dem Team prüfen, strukturieren und verbessern.',
				'Besprechungsprotokolle, Kundenaustausch und Projektentscheidungen in umsetzbare Tickets überführen.',
				'Release Notes, Dokumente zur Projektabgrenzung, Projektzusammenfassungen und Statusberichte erstellen.',
				'KI-Agenten einsetzen, um Repositories zu analysieren, Änderungen zusammenzufassen, tägliche Reviews vorzubereiten oder kritische Punkte zu erkennen.',
				'Kundenfeedback nachverfolgen, Anfragen qualifizieren und das Team bei der Priorisierung unterstützen.',
				'Sich schrittweise in die fachlichen Regeln der Projekte einarbeiten und so Kunden, Produkt und technisches Team verbinden.',
				'Interne FDTI-Methoden verbessern: Vorlagen, Notion-Workflows, Automatisierungen und Projektdokumentation.'
			]
		}
	],
	requiredSkills: [
		'Sehr gute Fähigkeiten in der Analyse, Zusammenfassung und Strukturierung von Informationen.',
		'Klare und präzise schriftliche Kommunikation.',
		'Fließende Französischkenntnisse in Wort und Schrift für die Zusammenarbeit mit dem Team und den Projektbeteiligten.',
		'Fähigkeit, professionelle Gespräche mit Kunden oder Projektteams zu führen.',
		'Selbstständige, sorgfältige und gut organisierte Arbeitsweise.',
		'Ausgeprägtes Interesse an KI für geschäftliche und operative Fragestellungen.',
		'Fähigkeit, sich schnell in eine Branche, ein Produkt oder einen Kundenkontext einzuarbeiten.',
		'Sicherer Umgang mit digitalen Werkzeugen und Fähigkeit, die eigene Arbeit nachvollziehbar zu dokumentieren.',
		'Gute berufliche Englischkenntnisse sind je nach Projekt von Vorteil.'
	],
	niceToHaveSkills: [
		'Erste Erfahrung im Projektmanagement, in der Beratung, im Produktmanagement, in der Business Analysis oder in der Projektassistenz.',
		'Grundverständnis von APIs, Datenbanken, Webanwendungen oder Softwarearchitekturen.',
		'Erfahrung mit Notion, Linear, Jira, GitHub, Google Workspace oder Projektmanagement-Werkzeugen.',
		'Fortgeschrittene Nutzung von KI-Werkzeugen zum Zusammenfassen, Analysieren, Strukturieren oder Erstellen von Dokumenten.',
		'Grundkenntnisse in SQL, Datenverarbeitung, Automatisierung oder No-Code.',
		'Interesse an industriellen, regulatorischen, dokumentenbezogenen oder komplexen fachlichen Themen.'
	],
	environmentIntro:
		'Sie arbeiten mit Entwicklerinnen und Entwicklern, Projektverantwortlichen und Fachansprechpartnern an konkreten Aufgaben.',
	environment: [
		'Spezialisierte KI-Agenten.',
		'Fachanwendungen und Backoffices.',
		'Interne Werkzeuge.',
		'KI-gestützte Workflows.',
		'Funktionale und technische Spezifikationen.',
		'Projektdokumentation.',
		'Kundenbetreuung.',
		'Analyse von Geschäftsprozessen.',
		'Automatisierungen mit Notion, GitHub, Google Workspace und internen Werkzeugen.'
	],
	conditions: [
		'Sechsmonatiges Praktikum.',
		'Einstieg je nach Studienplan und laufenden Projekten ganzjährig möglich.',
		'Arbeitsmodalitäten werden passend zum Praktikumsrahmen, zu den Anforderungen der Hochschule und zu den laufenden Projekten festgelegt.',
		'Vergütung nach dem geltenden französischen Rechtsrahmen für Praktika, abhängig von Profil und Kontext.',
		'Betreuung durch das FDTI-Team.',
		'Bei entsprechender Leistung und passenden Möglichkeiten besteht die Option auf eine weitere Zusammenarbeit.'
	],
	process: [
		{
			title: 'Erstes Gespräch',
			items: [
				'Wir lernen uns kennen, besprechen Ihre Erwartungen und prüfen, ob FDTI und die Stelle zu Ihnen passen.'
			]
		},
		{
			title: 'Gespräch zu einem Praxisfall',
			items: ['Ein auf die Stelle abgestimmtes Gespräch über einen strukturierten operativen Fall.']
		}
	]
} satisfies Omit<JobOffer, 'tallyEmbedUrl' | 'tallyPublicUrl'>;

const developerDe = {
	...developerFr,
	slug: 'praktikum-ki-entwickler-fachagenten-anwendungen-daten',
	title: 'Praktikum KI-Entwicklung - Fachagenten, Anwendungen und Daten',
	shortTitle: 'KI-Entwicklung und Fachagenten',
	contractType: 'Praktikum',
	location: 'Arbeitsmodalitäten nach Absprache',
	experience: '0-2 Jahre',
	startLabel: 'Einstieg ganzjährig möglich',
	status: 'Stelle offen',
	summary:
		'Ein technisches Praktikum zur Entwicklung spezialisierter KI-Agenten, Anwendungen, APIs und Datenworkflows für produktiv eingesetzte Projekte.',
	intro: [
		'FDTI ist ein Studio für KI, Softwareentwicklung und Daten. Wir entwickeln maßgeschneiderte digitale Lösungen: Fachanwendungen, APIs, spezialisierte KI-Agenten, Prozessautomatisierungen, Datenplattformen und interne Werkzeuge.',
		'Unsere Projekte verbinden Technologie unmittelbar mit dem operativen Geschäft: Dokumente verarbeiten, Systeme verknüpfen, Daten strukturieren, Workflows automatisieren, Teams bei besseren Entscheidungen unterstützen und KI in tatsächlich genutzte Werkzeuge integrieren.',
		'Zur Unterstützung unseres Wachstums suchen wir für ein sechsmonatiges Praktikum eine Person im Bereich KI- und Softwareentwicklung.'
	],
	sections: [
		{
			title: 'Ihre Aufgaben',
			items: [
				'An spezialisierten KI-Agenten mitarbeiten, die an Daten, APIs oder bestehende Werkzeuge angebunden sind.',
				'Fachanwendungen, Backoffices, Dashboards oder interne Portale entwickeln.',
				'Sichere APIs entwerfen und integrieren, um Datenbanken, SaaS-Lösungen, Dateien und interne Werkzeuge zu verbinden.',
				'KI-gestützte Workflows prototypisch umsetzen: Informationsextraktion, Zusammenfassung, Klassifizierung, Routing, Reporting und Warnmeldungen.',
				'An Forschungs- und Entwicklungskomponenten rund um LLMs, Agenten, Harnesses, RAG, OCR, NLP, Audit und Monitoring arbeiten.',
				'Zu internen FDTI-Werkzeugen beitragen, die Projektumsetzung, Projektsteuerung und Codequalität verbessern.',
				'An Tests, Deployment, Monitoring und technischer Dokumentation mitwirken.',
				'An Kundenprojekten arbeiten, die produktiv eingesetzt werden.'
			]
		}
	],
	requiredSkills: [
		'Gute Programmierkenntnisse, belegt durch vorzeigbare Projekte.',
		'Fähigkeit, bestehenden Code zu lesen und zu verstehen.',
		'Verständnis von APIs, Datenbanken und modernen Webarchitekturen.',
		'Regelmäßige Arbeit mit Git.',
		'Fähigkeit, mit regelmäßiger Betreuung selbstständig zu arbeiten.',
		'Klare schriftliche Kommunikation: nachvollziehbar erklären, was umgesetzt wurde, wo Hindernisse liegen und welche technischen Entscheidungen getroffen wurden.',
		'Fließende Französischkenntnisse in Wort und Schrift für die Zusammenarbeit mit dem Team und den Projektbeteiligten.',
		'Ausgeprägtes Interesse an KI für fachliche Probleme, nicht nur an Werkzeugen zur Textgenerierung.'
	],
	niceToHaveSkills: [
		'Erfahrung mit TypeScript, SvelteKit, React oder Node.js.',
		'Erfahrung mit Python, FastAPI oder Automatisierungsskripten.',
		'Grundkenntnisse in SQL, PostgreSQL, SQLite, DuckDB oder Datenpipelines.',
		'Erste Erfahrung mit LLMs, RAG, Agenten, OCR, NLP oder APIs von OpenAI/HuggingFace.',
		'Kenntnisse in Docker, Linux, Cloud oder Deployment.',
		'Erfahrung mit Notion, GitHub, Google Workspace oder internen Teamwerkzeugen.',
		'Gute berufliche Englischkenntnisse.'
	],
	environmentIntro: 'Je nach Projekt arbeiten Sie unter anderem mit:',
	environment: [
		'TypeScript, SvelteKit, React, Node.js.',
		'Python, FastAPI.',
		'Rust, Axum.',
		'PostgreSQL, SQLite, DuckDB, BigQuery, Snowflake.',
		'REST-APIs, GraphQL, Keycloak, SaaS-Integrationen.',
		'OpenAI, HuggingFace, LLMs, RAG, Agenten, OCR, NLP.',
		'Docker, Cloud, private Infrastruktur, Monitoring.',
		'Notion, GitHub, Google Workspace und interne FDTI-Werkzeuge.'
	],
	conditions: consultantDe.conditions,
	process: [
		{
			title: 'Erstes Gespräch',
			items: [
				'Ein Videogespräch über Ihren bisherigen Weg, Ihre Verfügbarkeit, Ihr technisches Niveau und Ihre Erwartungen.'
			]
		},
		{
			title: 'Technisches Live-Interview',
			items: [
				'Ein technisches Videogespräch mit Bildschirmfreigabe. Im Mittelpunkt steht, wie Sie analysieren, recherchieren, KI einsetzen, Fehler beheben und kommunizieren.',
				'Richtwert für die Dauer: 60 bis 90 Minuten.'
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
	en: [consultantEn, developerEn].map((job) => withTallyUrls('en', job)),
	es: [consultantEs, developerEs].map((job) => withTallyUrls('es', job)),
	de: [consultantDe, developerDe].map((job) => withTallyUrls('de', job))
};

export const jobOffers = jobOffersByLocale.fr;

export const getJobOffers = (locale: Lang) => jobOffersByLocale[locale] || jobOffersByLocale.fr;

export const getJobOffer = (locale: Lang, slug: string) =>
	getJobOffers(locale).find((job) => job.slug === slug) || null;
