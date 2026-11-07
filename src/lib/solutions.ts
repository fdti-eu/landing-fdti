import type { Lang } from '$lib/data';
import type { SolutionId } from '$lib/navigation';

type Solution = { need: string; deliverables: string[]; evidence: string };
type SolutionsContent = {
	title: string;
	metaTitle: string;
	description: string;
	intro: string;
	needs: string;
	deliverables: string;
	evidence: string;
	more: string;
	deploymentTitle: string;
	deploymentText: string;
	sectorText: string;
	ctaText: string;
	families: Record<SolutionId, Solution>;
};

export const solutionProofIds: Record<SolutionId, string[]> = {
	'applications-web': ['2', '8', '9'],
	'api-integrations': ['3', '2'],
	'data-pilotage': ['6', '7', '4'],
	'ia-documents': ['1', '9'],
	'automatisation-agents': ['8', '1'],
	'infrastructure-exploitation': ['2', '1']
};

export const solutionsContent: Record<Lang, SolutionsContent> = {
	fr: {
		metaTitle: 'Solutions web, data, IA & infrastructure | FDTI',
		title: 'Du besoin métier au logiciel en production.',
		description:
			'Applications web, API, data, IA, automatisation et infrastructure : FDTI conçoit et exploite des logiciels sur mesure, dans le cloud ou sur vos serveurs.',
		intro:
			'Un outil à créer, des systèmes à connecter, des données à exploiter ou un processus à automatiser : nous assemblons les compétences utiles autour de vos opérations et de votre existant.',
		needs: 'Votre besoin',
		deliverables: 'Ce que nous construisons',
		evidence: 'Réalisations associées',
		more: 'Approfondir',
		deploymentTitle: 'Cloud, serveurs dédiés ou on-premise : un choix pour chaque projet.',
		deploymentText:
			'Applications, API, data et IA peuvent être déployées dans votre cloud, sur une infrastructure dédiée ou dans votre SI. Nous définissons avec vos équipes les accès, la confidentialité, les contraintes réseau et les responsabilités d’exploitation. L’hébergement est un choix d’architecture commun aux six familles.',
		sectorText:
			'Retrouvez ces capacités appliquées aux acteurs, aux flux et aux contraintes de l’économie circulaire : véhicules, batteries et emballages.',
		ctaText:
			'Partons d’un processus réel, de vos utilisateurs et des outils déjà en place pour définir le premier périmètre utile.',
		families: {
			'applications-web': {
				need: 'Vos équipes et partenaires jonglent entre fichiers, emails et outils qui ne suivent pas votre manière de travailler.',
				deliverables: [
					'Applications métier, portails clients et partenaires, back-offices.',
					'Gestion de dossiers, droits d’accès et parcours multi-acteurs.',
					'Marketplaces et interfaces connectées aux opérations.'
				],
				evidence:
					'Des plateformes pour suivre des véhicules, des opérations de recyclage ou des dossiers de contentieux.'
			},
			'api-integrations': {
				need: 'Une même information est ressaisie dans plusieurs systèmes, ou vos partenaires ont besoin d’accéder à vos services.',
				deliverables: [
					'API métier et interfaces sécurisées pour vos partenaires.',
					'Connexions ERP, CRM, logiciels métier et services tiers.',
					'Synchronisation, échanges événementiels et suivi des erreurs.'
				],
				evidence:
					'Une marketplace connectée aux ERP et des processus Valorauto orchestrés via API et messagerie Azure.'
			},
			'data-pilotage': {
				need: 'Vos données sont dispersées et vos équipes passent plus de temps à les préparer qu’à les utiliser.',
				deliverables: [
					'Collecte, pipelines et entrepôts de données.',
					'Transformation, contrôles de qualité et modèles d’analyse.',
					'Dashboards métier, reporting et suivi d’indicateurs.'
				],
				evidence:
					'Data hub sur GCP, entrepôt retail alimenté en temps réel et supervision de l’éclairage public.'
			},
			'ia-documents': {
				need: 'Des informations utiles restent enfermées dans des documents, des textes et des dossiers difficiles à rapprocher.',
				deliverables: [
					'Extraction, classification et rapprochement de documents.',
					'Recherche dans un corpus et restitution avec les sources.',
					'Assistance à l’analyse, contrôle des résultats et validation humaine.'
				],
				evidence:
					'Analyse de dossiers pour les tribunaux de commerce et extraction de décisions dans un contentieux collectif.'
			},
			'automatisation-agents': {
				need: 'Un processus exige encore des relances, des contrôles et des transferts manuels entre plusieurs outils.',
				deliverables: [
					'Workflows, règles métier et validations orchestrées.',
					'Agents IA utilisant des outils et des données dans un périmètre défini.',
					'Traçabilité des actions, traitement des exceptions et reprise humaine.'
				],
				evidence:
					'Nos références illustrent l’automatisation de processus et de traitements documentaires. Le recours à des agents IA se décide selon les étapes à traiter.'
			},
			'infrastructure-exploitation': {
				need: 'Votre application doit être déployée, suivie et maintenue dans un environnement maîtrisé.',
				deliverables: [
					'Environnements cloud, serveurs dédiés et déploiements on-premise.',
					'CI/CD, configuration des services et gestion des accès.',
					'Supervision, sauvegardes, mises à jour et procédures de reprise.'
				],
				evidence:
					'Des applications sur Azure chez Valorauto et une API IA déployée sur les serveurs du client dans le secteur judiciaire.'
			}
		}
	},
	en: {
		metaTitle: 'Web, data, AI & infrastructure solutions | FDTI',
		title: 'From a business need to software in production.',
		description:
			'Web applications, APIs, data, AI, automation and infrastructure: FDTI builds and operates custom software in the cloud or on your servers.',
		intro:
			'Build a tool, connect systems, use your data or automate a process: we combine the capabilities your operations need with the systems you already have.',
		needs: 'Your need',
		deliverables: 'What we build',
		evidence: 'Related projects',
		more: 'Explore further',
		deploymentTitle: 'Cloud, dedicated servers or on-premises: a choice for each project.',
		deploymentText:
			'Applications, APIs, data and AI can run in your cloud, on dedicated infrastructure or within your own systems. Together we define access, confidentiality, network constraints and operational responsibilities. Hosting is an architecture choice shared across all six families.',
		sectorText:
			'See these capabilities applied to circular economy stakeholders, flows and constraints: vehicles, batteries and packaging.',
		ctaText:
			'Start with a real process, your users and existing tools to define a useful first scope.',
		families: {
			'applications-web': {
				need: 'Your teams and partners juggle spreadsheets, emails and tools that do not fit the way you work.',
				deliverables: [
					'Business applications, customer and partner portals, back offices.',
					'Case management, access rights and multi-party workflows.',
					'Marketplaces and interfaces connected to operations.'
				],
				evidence: 'Platforms for tracking vehicles, recycling operations and litigation cases.'
			},
			'api-integrations': {
				need: 'The same information is entered into multiple systems, or partners need access to your services.',
				deliverables: [
					'Business APIs and secure partner interfaces.',
					'ERP, CRM, business software and third-party integrations.',
					'Synchronization, event-driven exchanges and error tracking.'
				],
				evidence:
					'An ERP-connected marketplace and Valorauto processes orchestrated through APIs and Azure messaging.'
			},
			'data-pilotage': {
				need: 'Your data is scattered and your teams spend more time preparing it than using it.',
				deliverables: [
					'Data collection, pipelines and warehouses.',
					'Transformation, quality checks and analytical models.',
					'Business dashboards, reporting and indicator tracking.'
				],
				evidence: 'A GCP data hub, a real-time retail warehouse and public lighting monitoring.'
			},
			'ia-documents': {
				need: 'Useful information is locked in documents, text and cases that are difficult to reconcile.',
				deliverables: [
					'Document extraction, classification and reconciliation.',
					'Corpus search and results linked to their sources.',
					'Analysis assistance, result checks and human validation.'
				],
				evidence:
					'Case analysis for commercial courts and decision extraction for collective litigation.'
			},
			'automatisation-agents': {
				need: 'A process still requires manual reminders, checks and transfers between tools.',
				deliverables: [
					'Orchestrated workflows, business rules and approvals.',
					'AI agents using tools and data within a defined scope.',
					'Action traceability, exception handling and human takeover.'
				],
				evidence:
					'Our references demonstrate process and document automation. The use of AI agents is assessed for each step.'
			},
			'infrastructure-exploitation': {
				need: 'Your application needs to be deployed, monitored and maintained in a controlled environment.',
				deliverables: [
					'Cloud environments, dedicated servers and on-premises deployments.',
					'CI/CD, service configuration and access management.',
					'Monitoring, backups, updates and recovery procedures.'
				],
				evidence:
					'Applications on Azure for Valorauto and a judicial AI API deployed on the client’s servers.'
			}
		}
	},
	es: {
		metaTitle: 'Soluciones web, datos, IA e infraestructura | FDTI',
		title: 'De la necesidad de negocio al software en producción.',
		description:
			'Aplicaciones web, API, datos, IA, automatización e infraestructura: FDTI desarrolla y opera software a medida en la nube o en sus servidores.',
		intro:
			'Crear una herramienta, conectar sistemas, aprovechar los datos o automatizar un proceso: combinamos las capacidades necesarias con sus herramientas existentes.',
		needs: 'Su necesidad',
		deliverables: 'Lo que construimos',
		evidence: 'Proyectos relacionados',
		more: 'Profundizar',
		deploymentTitle:
			'Nube, servidores dedicados o infraestructura propia: una decisión para cada proyecto.',
		deploymentText:
			'Aplicaciones, API, datos e IA pueden desplegarse en su nube, en infraestructura dedicada o en sus sistemas. Definimos con su equipo los accesos, la confidencialidad, las restricciones de red y las responsabilidades operativas. El alojamiento es una decisión de arquitectura transversal a las seis familias.',
		sectorText:
			'Descubra estas capacidades aplicadas a los actores, flujos y requisitos de la economía circular: vehículos, baterías y envases.',
		ctaText:
			'Partamos de un proceso real, sus usuarios y sus herramientas para definir un primer alcance útil.',
		families: {
			'applications-web': {
				need: 'Sus equipos y socios alternan entre archivos, correos y herramientas que no se adaptan a su trabajo.',
				deliverables: [
					'Aplicaciones empresariales, portales de clientes y socios, back offices.',
					'Gestión de expedientes, permisos y procesos con múltiples actores.',
					'Marketplaces e interfaces conectadas a las operaciones.'
				],
				evidence:
					'Plataformas para seguir vehículos, operaciones de reciclaje y expedientes judiciales.'
			},
			'api-integrations': {
				need: 'Los mismos datos se introducen en varios sistemas o sus socios necesitan acceder a sus servicios.',
				deliverables: [
					'API empresariales e interfaces seguras para socios.',
					'Conexiones con ERP, CRM, aplicaciones y servicios de terceros.',
					'Sincronización, intercambios por eventos y seguimiento de errores.'
				],
				evidence:
					'Un marketplace conectado a ERP y procesos Valorauto orquestados mediante API y mensajería Azure.'
			},
			'data-pilotage': {
				need: 'Los datos están dispersos y sus equipos dedican más tiempo a prepararlos que a utilizarlos.',
				deliverables: [
					'Recopilación, pipelines y almacenes de datos.',
					'Transformación, controles de calidad y modelos analíticos.',
					'Dashboards, reporting y seguimiento de indicadores.'
				],
				evidence:
					'Data hub en GCP, almacén retail en tiempo real y supervisión del alumbrado público.'
			},
			'ia-documents': {
				need: 'La información útil queda atrapada en documentos, textos y expedientes difíciles de conciliar.',
				deliverables: [
					'Extracción, clasificación y conciliación documental.',
					'Búsqueda en corpus y resultados vinculados a sus fuentes.',
					'Asistencia al análisis, controles y validación humana.'
				],
				evidence:
					'Análisis de expedientes para tribunales mercantiles y extracción de resoluciones en un litigio colectivo.'
			},
			'automatisation-agents': {
				need: 'Un proceso aún requiere recordatorios, controles y transferencias manuales entre herramientas.',
				deliverables: [
					'Flujos, reglas de negocio y validaciones orquestadas.',
					'Agentes de IA con herramientas y datos dentro de un alcance definido.',
					'Trazabilidad de acciones, gestión de excepciones e intervención humana.'
				],
				evidence:
					'Nuestras referencias ilustran automatizaciones de procesos y documentos. El uso de agentes de IA se decide según cada etapa.'
			},
			'infrastructure-exploitation': {
				need: 'Su aplicación debe desplegarse, supervisarse y mantenerse en un entorno controlado.',
				deliverables: [
					'Entornos cloud, servidores dedicados y despliegues on-premise.',
					'CI/CD, configuración de servicios y gestión de accesos.',
					'Supervisión, copias de seguridad, actualizaciones y recuperación.'
				],
				evidence:
					'Aplicaciones en Azure para Valorauto y una API de IA judicial alojada en servidores del cliente.'
			}
		}
	},
	de: {
		metaTitle: 'Web-, Daten-, KI- und Infrastrukturlösungen | FDTI',
		title: 'Vom Geschäftsbedarf zur Software im Betrieb.',
		description:
			'Webanwendungen, APIs, Daten, KI, Automatisierung und Infrastruktur: FDTI entwickelt und betreibt individuelle Software in der Cloud oder auf Ihren Servern.',
		intro:
			'Ein Werkzeug entwickeln, Systeme verbinden, Daten nutzen oder Prozesse automatisieren: Wir kombinieren die benötigten Fähigkeiten mit Ihren bestehenden Systemen.',
		needs: 'Ihr Bedarf',
		deliverables: 'Was wir entwickeln',
		evidence: 'Passende Referenzen',
		more: 'Mehr erfahren',
		deploymentTitle: 'Cloud, dedizierte Server oder On-Premises: eine Entscheidung je Projekt.',
		deploymentText:
			'Anwendungen, APIs, Daten und KI können in Ihrer Cloud, auf dedizierter Infrastruktur oder in Ihren eigenen Systemen betrieben werden. Gemeinsam legen wir Zugriffe, Vertraulichkeit, Netzwerkanforderungen und Betriebsverantwortung fest. Hosting ist eine übergreifende Architekturentscheidung für alle sechs Bereiche.',
		sectorText:
			'Entdecken Sie diese Fähigkeiten im Kontext der Kreislaufwirtschaft: Fahrzeuge, Batterien und Verpackungen.',
		ctaText:
			'Ausgangspunkt sind ein realer Prozess, Ihre Nutzer und vorhandene Werkzeuge, um einen sinnvollen ersten Umfang festzulegen.',
		families: {
			'applications-web': {
				need: 'Ihre Teams und Partner wechseln zwischen Dateien, E-Mails und Werkzeugen, die nicht zu ihren Abläufen passen.',
				deliverables: [
					'Fachanwendungen, Kunden- und Partnerportale, Backoffices.',
					'Fallbearbeitung, Zugriffsrechte und organisationsübergreifende Abläufe.',
					'Marktplätze und Schnittstellen für operative Prozesse.'
				],
				evidence: 'Plattformen für Fahrzeuge, Recyclingprozesse und Gerichtsverfahren.'
			},
			'api-integrations': {
				need: 'Informationen werden mehrfach eingegeben oder Partner benötigen Zugriff auf Ihre Dienste.',
				deliverables: [
					'Fachliche APIs und sichere Partnerschnittstellen.',
					'Anbindung von ERP, CRM, Fachsoftware und externen Diensten.',
					'Synchronisierung, ereignisbasierter Austausch und Fehlerüberwachung.'
				],
				evidence:
					'Ein ERP-verbundener Marktplatz und Valorauto-Prozesse mit APIs und Azure Messaging.'
			},
			'data-pilotage': {
				need: 'Ihre Daten sind verteilt und ihre Aufbereitung kostet mehr Zeit als ihre Nutzung.',
				deliverables: [
					'Datenerfassung, Pipelines und Data Warehouses.',
					'Transformation, Qualitätskontrollen und Analysemodelle.',
					'Fachliche Dashboards, Berichte und Kennzahlen.'
				],
				evidence:
					'Ein GCP Data Hub, ein Echtzeit-Warehouse im Handel und die Überwachung öffentlicher Beleuchtung.'
			},
			'ia-documents': {
				need: 'Wichtige Informationen stecken in Dokumenten, Texten und schwer abzugleichenden Akten.',
				deliverables: [
					'Extraktion, Klassifizierung und Abgleich von Dokumenten.',
					'Suche in Dokumentbeständen mit Quellenbezug.',
					'Analyseunterstützung, Ergebniskontrollen und menschliche Freigabe.'
				],
				evidence:
					'Aktenanalyse für Handelsgerichte und Extraktion von Entscheidungen in einem Sammelverfahren.'
			},
			'automatisation-agents': {
				need: 'Ein Prozess erfordert weiterhin manuelle Erinnerungen, Kontrollen und Übergaben zwischen Werkzeugen.',
				deliverables: [
					'Orchestrierte Workflows, Geschäftsregeln und Freigaben.',
					'KI-Agenten mit Werkzeugen und Daten in einem definierten Rahmen.',
					'Nachvollziehbare Aktionen, Ausnahmebehandlung und menschliche Übernahme.'
				],
				evidence:
					'Unsere Referenzen zeigen Prozess- und Dokumentenautomatisierung. Der Einsatz von KI-Agenten wird für jeden Schritt geprüft.'
			},
			'infrastructure-exploitation': {
				need: 'Ihre Anwendung muss in einer kontrollierten Umgebung bereitgestellt, überwacht und gewartet werden.',
				deliverables: [
					'Cloud-Umgebungen, dedizierte Server und On-Premises-Bereitstellung.',
					'CI/CD, Dienstkonfiguration und Zugriffsverwaltung.',
					'Überwachung, Backups, Updates und Wiederherstellungsverfahren.'
				],
				evidence:
					'Azure-Anwendungen für Valorauto und eine KI-API für die Justiz auf Kundenservern.'
			}
		}
	},
	it: {
		metaTitle: 'Soluzioni web, dati, IA e infrastruttura | FDTI',
		title: 'Dall’esigenza aziendale al software in produzione.',
		description:
			'Applicazioni web, API, dati, IA, automazione e infrastruttura: FDTI sviluppa e gestisce software su misura nel cloud o sui vostri server.',
		intro:
			'Creare uno strumento, collegare sistemi, utilizzare i dati o automatizzare un processo: combiniamo le competenze necessarie con gli strumenti già presenti.',
		needs: 'La vostra esigenza',
		deliverables: 'Cosa realizziamo',
		evidence: 'Progetti correlati',
		more: 'Approfondire',
		deploymentTitle: 'Cloud, server dedicati o on-premise: una scelta per ogni progetto.',
		deploymentText:
			'Applicazioni, API, dati e IA possono essere distribuiti nel vostro cloud, su infrastrutture dedicate o nei vostri sistemi. Definiamo insieme accessi, riservatezza, vincoli di rete e responsabilità operative. L’hosting è una scelta architetturale comune alle sei famiglie.',
		sectorText:
			'Scoprite queste capacità applicate agli attori, ai flussi e ai requisiti dell’economia circolare: veicoli, batterie e imballaggi.',
		ctaText:
			'Partiamo da un processo reale, dai vostri utenti e dagli strumenti esistenti per definire un primo perimetro utile.',
		families: {
			'applications-web': {
				need: 'Team e partner alternano file, email e strumenti che non seguono il vostro modo di lavorare.',
				deliverables: [
					'Applicazioni aziendali, portali clienti e partner, back office.',
					'Gestione delle pratiche, permessi e flussi multi-attore.',
					'Marketplace e interfacce collegate alle operazioni.'
				],
				evidence: 'Piattaforme per seguire veicoli, operazioni di riciclo e pratiche giudiziarie.'
			},
			'api-integrations': {
				need: 'Le stesse informazioni vengono reinserite in più sistemi, oppure i partner devono accedere ai vostri servizi.',
				deliverables: [
					'API aziendali e interfacce sicure per i partner.',
					'Collegamenti a ERP, CRM, software aziendali e servizi esterni.',
					'Sincronizzazione, scambi a eventi e monitoraggio degli errori.'
				],
				evidence:
					'Un marketplace collegato agli ERP e processi Valorauto orchestrati tramite API e messaggistica Azure.'
			},
			'data-pilotage': {
				need: 'I dati sono dispersi e i team dedicano più tempo a prepararli che a utilizzarli.',
				deliverables: [
					'Raccolta, pipeline e data warehouse.',
					'Trasformazione, controlli di qualità e modelli analitici.',
					'Dashboard aziendali, reporting e monitoraggio degli indicatori.'
				],
				evidence:
					'Data hub su GCP, warehouse retail in tempo reale e supervisione dell’illuminazione pubblica.'
			},
			'ia-documents': {
				need: 'Informazioni utili restano nei documenti, nei testi e nelle pratiche difficili da riconciliare.',
				deliverables: [
					'Estrazione, classificazione e riconciliazione documentale.',
					'Ricerca nei corpus e risultati collegati alle fonti.',
					'Assistenza all’analisi, controlli e validazione umana.'
				],
				evidence:
					'Analisi delle pratiche per tribunali commerciali ed estrazione di decisioni in un contenzioso collettivo.'
			},
			'automatisation-agents': {
				need: 'Un processo richiede ancora solleciti, controlli e trasferimenti manuali tra strumenti.',
				deliverables: [
					'Workflow, regole aziendali e approvazioni orchestrate.',
					'Agenti IA con strumenti e dati entro un perimetro definito.',
					'Tracciabilità delle azioni, gestione delle eccezioni e intervento umano.'
				],
				evidence:
					'Le nostre referenze mostrano automazioni di processi e documenti. L’uso di agenti IA viene valutato per ogni fase.'
			},
			'infrastructure-exploitation': {
				need: 'La vostra applicazione deve essere distribuita, monitorata e mantenuta in un ambiente controllato.',
				deliverables: [
					'Ambienti cloud, server dedicati e distribuzioni on-premise.',
					'CI/CD, configurazione dei servizi e gestione degli accessi.',
					'Monitoraggio, backup, aggiornamenti e procedure di ripristino.'
				],
				evidence:
					'Applicazioni Azure per Valorauto e un’API IA giudiziaria distribuita sui server del cliente.'
			}
		}
	}
};
