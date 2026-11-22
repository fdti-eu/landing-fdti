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

### Voix éditoriale FDTI

Écrire comme lors du premier échange entre une équipe métier et les personnes qui vont concevoir son outil : « Vous connaissez votre métier. Nous confrontons vos besoins aux possibilités techniques pour construire une réponse adaptée. » Cette phrase donne le ton ; ce n’est pas une signature à répéter.

**Formulations de référence, par intention.** Choisir celle qui correspond au moment du raisonnement. Ne pas les empiler comme une liste de promesses.

| Moment de la discussion | Formulation retenue |
| --- | --- |
| Questionner la commande | « Nous questionnons la demande initiale pour définir ce qui mérite réellement d’être développé. » |
| Ouvrir une alternative concrète | « Développer un nouvel outil n’est pas toujours la meilleure réponse. Nous pouvons aussi adapter l’existant, connecter vos logiciels ou simplifier un processus. » |
| Défendre une décision en interne | « Nous présentons les options et leurs conséquences sur le coût, les délais, la maintenance et le fonctionnement de vos équipes. » |
| Expliquer un choix technique | « Nous choisissons les outils en fonction du problème, de votre existant et de ce que vos équipes devront maintenir. » |
| Expliquer qui travaille avec le client | « Vous échangez directement avec les personnes qui conçoivent votre solution. » Un interlocuteur central coordonne ces échanges ; ne pas promettre que ce sera toujours la même personne. |
| Décrire la première livraison | « Nous privilégions un premier périmètre utilisable, puis nous le faisons évoluer à partir des retours du terrain. » |

**Où se situe la nuance ?** « On regarde ce qui bloque dans votre métier » est trop familier. « Nous commençons par comprendre vos opérations, vos contraintes et le résultat attendu » est correct, mais trop neutre pour une accroche. « Une demande de logiciel est un point de départ » pose un principe abstrait. La phrase d’ouverture préférée ci-dessus donne plutôt un rôle à chacun : le client connaît son métier, FDTI apporte le jugement technique. Le premier échange commercial doit déjà faire avancer le travail : préciser un choix, montrer une conséquence ou proposer une première étape utile.

- **Partir du travail.** Nommer la personne, son geste et la difficulté. Au lieu de « Nous accélérons votre transformation documentaire », écrire « Votre équipe ouvre chaque dossier pour y ranger une pièce. Elle pourrait déposer le lot, puis vérifier les rapprochements proposés. »
- **Expliquer le choix.** Adapter l’existant, connecter deux logiciels, simplifier une étape ou ne rien développer sont de vraies réponses. Dire ce que chaque option change pour le coût, le délai, la maintenance et les équipes. Une technologie mérite d’être nommée si elle explique cet arbitrage.
- **Montrer la preuve et ses limites.** Préférer un parcours concret à « robuste », « innovant » ou « performant ». Distinguer ce qui fonctionne déjà, ce qui a été commandé et ce qui reste à mesurer. Ni promesse générique d’IA, ni comparaison de prix invérifiable.
- **Parler en “nous” et “vous”.** Phrases courtes, vocabulaire métier, ton oral professionnel. Un interlocuteur coordonne le projet ; les équipes peuvent échanger directement avec les personnes qui conçoivent la solution. Ne pas opposer les deux.

À la relecture, le lecteur doit pouvoir expliquer à un collègue : « Voilà le problème, les options, pourquoi celle-ci et ce que cela change. » Si le texte conviendrait à n’importe quel prestataire en changeant seulement son nom, reprendre l’exemple. Les traductions conservent le sens et le degré de certitude, pas les tournures françaises.

### Réalisations

Une réalisation raconte un travail métier, jamais l’identité du client. Désigner l’acteur par son rôle (« un recycleur de batteries », « les équipes chargées de la reprise des véhicules »). Écarter noms de sociétés et de partenaires identifiants, marques applicatives propres au client, logos, domaines et liens vers ses sites ou ses avis. Une technologie publique ou un service tiers peut être nommé si cela explique le travail. Les références institutionnelles de l’accueil sont distinctes : ne pas associer leurs logos aux fiches.

Cette règle vaut pour la fiche, son URL, les cartes et liens entrants, les métadonnées, les données structurées, les exports et toutes les langues. Garder les sources commerciales et les correspondances client/projet hors du contenu publié.

Chaque fiche suit le même ordre :

1. **Situation de départ** (`challenge`) : qui effectue quelle tâche, avec quelle difficulté ou quel risque ?
2. **Solution** (`approach`) : que change la réponse de FDTI dans cet outil ou ce processus ? Décrire le fonctionnement au présent, du point de vue de la personne qui s’en sert : « La gestionnaire dépose le lot. Le logiciel lit le numéro de série et lui propose le dossier à valider. »
3. **Parcours métier** (`details`) : décrire les opérations concrètes dans leur ordre utile, de l’entrée à la sortie ; préciser les exceptions et la décision humaine lorsqu’elles comptent.
4. **Résultat** : décrire un usage ou un effet établi (`impact`), ou, pour un projet commandé, un objectif explicitement **attendu** (`expectedOutcome`). Ne pas transformer une estimation en gain mesuré. Chiffres, dates et technologies sont facultatifs ; ne les ajouter que s’ils sont étayés et utiles.

**Titres et descriptions de l’index, dans toutes les langues.** Choisir une réalisation par problème d’achat. Le titre annonce le fait que l’acheteur doit retenir : une opération rendue possible, un changement de pratique ou une échelle significative. La description ajoute une ou deux phrases au présent : qui fait quoi, sur quel objet, et ce que la personne suivante peut en faire. Écarter les intitulés génériques et les détails d’intégration qui ne sont pas le sujet principal. Le présent décrit le parcours ; les mentions de déploiement, d’usage observé et de gains mesurés reposent sur leurs preuves.

**Test de relecture : masquer les noms des technologies.** Peut-on encore suivre un véhicule, une pièce ou une demande d’un acteur à l’autre, et comprendre ce que chacun sait ou peut faire ensuite ? Si la « Solution » se résume à une architecture ou le « Parcours métier » à une liste de livrables techniques, réécrire ces passages. Dans la fiche VHU, « le centre enregistre séparément l’arrivée de la voiture et celle de ses papiers » explique pourquoi le logiciel est utile ; « portail, API et base de données » ne l’explique pas. Garder la stack dans les tags. Mentionner un choix technique dans le récit seulement si sa conséquence mérite d’y figurer (par exemple, traiter des pièces sensibles sur les serveurs du client).

Avant livraison, relire la fiche et ses renvois en contexte, vérifier les cinq langues et lancer `npm run check` puis `npm run build`. Le contrôle éditorial détecte des identifiants connus ; il ne remplace pas la relecture des nouveaux noms, visuels et liens.

**Méthode de rédaction et de revue.** Commencer par les sources et la fiche existante, puis prendre un dossier représentatif. Qui le reçoit ? Quels gestes cette personne répète-t-elle aujourd’hui ? Quel passage montrerait-on en démo ? Qui peut agir ensuite, et sur quelle information ? Poser uniquement les questions encore ouvertes. Raconter l’avant et l’après dans le vocabulaire de l’équipe ; réserver les choix techniques à ceux qui expliquent une décision métier. Soumettre le texte français et les hypothèses à l’opérateur avant de décliner la version validée dans les autres langues. La [fiche OCR](src/locales/fr.json) (`ocr-dossiers-vhu`) illustre la méthode ; ses chiffres ne sont pas des valeurs par défaut.

#### KPI des réalisations

Avant de retenir un chiffre, répondre à la question de l’acheteur : **qu’est-ce que cette solution change pour mes équipes, mon budget, mon activité ou mon risque ?** Privilégier le temps net rendu aux équipes (heures ou jours-personnes), le délai d’un processus, le coût par dossier, les reprises évitées ou un résultat métier pertinent pour le décideur. Ne pas confondre capacité libérée et économie budgétaire effective.

Un volume de pièces, de pays, de formats, de tables ou de fonctionnalités situe le projet. Seul, il reste dans le contexte ou le périmètre ; ne pas en faire un KPI pour remplir une carte. Ne pas compter deux fois le même indicateur.

Pour une plateforme exploitée en réseau, distinguer **activité, couverture et délai**. Nommer l’événement compté, les acteurs inclus et les deux événements qui bornent le délai. Pour une médiane, cette dernière précision suffit sur la carte. Vérifier l’effectif, les exclusions et la période d’observation en privé : ne pas les publier dans le texte, les traductions, les métadonnées, les exports ou le dépôt public. La validation d’un KPI arrondi n’autorise pas la divulgation des volumes précis sous-jacents.

Exprimer une approximation **une seule fois** : si la valeur porte « ≈ », ne répéter ni « environ » ni « ordre de grandeur » dans le libellé ou la note. La note précise ce qui est compté, par exemple « Véhicules enregistrés sur la plateforme. »

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
