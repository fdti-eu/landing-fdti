# FDTI Website

Site vitrine public de FDTI Consulting : `https://www.fdti.eu`.

Stack : SvelteKit, Svelte 5, TypeScript, Tailwind CSS.

## Contenu

Le contenu éditorial principal est stocké dans les fichiers JSON :

- `src/locales/fr.json`
- `src/locales/en.json`
- `src/locales/es.json`
- `src/locales/de.json`
- `src/locales/it.json`

Le français est servi sous `/`, l’anglais sous `/en`, l’espagnol sous `/es`, l’allemand sous `/de` et l’italien sous `/it`. Les pages, cas d’usage, métadonnées SEO, `sitemap.xml` et `llms.txt` sont générés à partir de ces fichiers pendant le build.

Le sitemap de référence déclaré dans `robots.txt` est `https://www.fdti.eu/sitemap-control.xml`, déjà accepté par Google. Il réutilise le générateur de `sitemap.xml` à chaque build, avec les URL canoniques et leurs variantes linguistiques ; ce n’est pas une copie statique à maintenir manuellement. `sitemap.xml` reste disponible et produit le même contenu.

L’ajout au sitemap facilite la découverte des pages, sans garantir leur indexation. Laisser Google les explorer normalement et réserver les demandes manuelles d’indexation aux exceptions, plutôt que les répéter pour chaque page.

### Réalisations

Une réalisation raconte un travail métier, jamais l’identité du client. Désigner l’acteur par son rôle (« un recycleur de batteries », « les équipes chargées de la reprise des véhicules »). Écarter noms de sociétés et de partenaires identifiants, marques applicatives propres au client, logos, domaines et liens vers ses sites ou ses avis. Une technologie publique ou un service tiers peut être nommé si cela explique le travail. Les références institutionnelles de l’accueil sont distinctes : ne pas associer leurs logos aux fiches.

Cette règle vaut pour la fiche, son URL, les cartes et liens entrants, les métadonnées, les données structurées, les exports et toutes les langues. Garder les sources commerciales et les correspondances client/projet hors du contenu publié.

Chaque fiche suit le même ordre :

1. **Situation de départ** (`challenge`) : qui effectue quelle tâche, avec quelle difficulté ou quel risque ?
2. **Solution** (`approach`) : que change la réponse de FDTI dans cet outil ou ce processus ? Employer le futur ou préciser « prévu » si le projet n’est pas livré.
3. **Parcours métier** (`details`) : décrire les opérations concrètes dans leur ordre utile, de l’entrée à la sortie ; préciser les exceptions et la décision humaine lorsqu’elles comptent.
4. **Résultat** : décrire un usage ou un effet établi (`impact`), ou, pour un projet commandé, un objectif explicitement **attendu** (`expectedOutcome`). Ne pas transformer une estimation en gain mesuré. Chiffres, dates et technologies sont facultatifs ; ne les ajouter que s’ils sont étayés et utiles.

Avant livraison, relire la fiche et ses renvois en contexte, vérifier les cinq langues et lancer `npm run check` puis `npm run build`. Le contrôle éditorial détecte des identifiants connus ; il ne remplace pas la relecture des nouveaux noms, visuels et liens.

**Méthode de rédaction et de revue.** Commencer par les sources et la fiche existante, puis prendre un dossier représentatif. Qui le reçoit ? Quels gestes cette personne répète-t-elle aujourd’hui ? Quel passage montrerait-on en démo ? Qui peut agir ensuite, et sur quelle information ? Poser uniquement les questions encore ouvertes. Raconter l’avant et l’après dans le vocabulaire de l’équipe ; réserver les choix techniques à ceux qui expliquent une décision métier. Soumettre le texte français et les hypothèses à l’opérateur avant de décliner la version validée dans les autres langues. La [fiche OCR](src/locales/fr.json) (`ocr-dossiers-vhu`) illustre la méthode ; ses chiffres ne sont pas des valeurs par défaut.

#### KPI des réalisations

Avant de retenir un chiffre, répondre à la question de l’acheteur : **qu’est-ce que cette solution change pour mes équipes, mon budget, mon activité ou mon risque ?** Privilégier le temps net rendu aux équipes (heures ou jours-personnes), le délai d’un processus, le coût par dossier, les reprises évitées ou un résultat métier pertinent pour le décideur. Ne pas confondre capacité libérée et économie budgétaire effective.

Un volume de pièces, de pays, de formats, de tables ou de fonctionnalités situe le projet. Seul, il reste dans le contexte ou le périmètre ; ne pas en faire un KPI pour remplir une carte. Ne pas compter deux fois le même indicateur.

Pour un résultat observé, vérifier la source, la période, le périmètre et, si l’on annonce un gain, le point de comparaison. Pour un projet non mesuré, préférer l’absence de chiffre à un gain inventé. Un scénario de décision est possible si ses hypothèses et sa nature conditionnelle restent visibles **sur la carte elle-même**, y compris sur l’index. Préciser la durée d’une journée si l’on convertit des heures en jours-personnes. Ne pas publier le prix d’un contrat client pour illustrer un ROI.

Distinguer dans la même note la donnée réelle (« 3 000 pièces reçues par mois ») du paramètre à vérifier (« si chaque pièce demande une minute de moins »). Présenter plusieurs repères complémentaires quand les sources le permettent : capacité rendue, valeur de cette capacité au coût horaire retenu, budget maximal à l’équilibre sur une durée donnée. Ces lectures d’un même gain ne s’additionnent pas. Pour un autre projet, délai de décision, qualité ou risque peuvent être plus pertinents ; ne pas imposer trois chiffres à tout prix.

**Présentation de référence :** utiliser `CaseIndicators.svelte` avec `metrics[].label`, `value` et `note`. Sur la fiche, empiler les indicateurs dans la colonne de droite sur ordinateur ; sur mobile, les placer dans le flux sans défilement horizontal. Afficher un libellé bref, une valeur lisible avec unité et horizon, puis sa base de calcul. Sur l’index, utiliser la variante compacte sans couper la note. Vérifier le rendu réel sur les deux tailles.

## Développement local

```bash
npm install
npm run dev
```

Ouvrir l’URL affichée par Vite, généralement `http://localhost:5173`.

## Vérifications

```bash
npm run check
npm run build
```

Le build génère un site statique dans `build/`.

## Déploiement GitHub Pages

Le site est préparé pour GitHub Pages via `.github/workflows/pages.yml`.

À chaque push sur `master`, GitHub Actions :

1. installe les dépendances avec `npm ci` ;
2. lance `npm run check` ;
3. lance `npm run build` ;
4. publie le dossier `build/` sur GitHub Pages.

Le domaine custom est déclaré dans `static/CNAME` :

```text
www.fdti.eu
```
