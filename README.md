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

### Contrat de données des réalisations

Les réalisations sont décrites dans `GetUseCasesContent.use_case_list` de chaque fichier de langue. Le français fait référence : les cinq langues gardent la même structure et changent dans le même commit.

Chaque réalisation renseigne :

- `challenge`, `approach`, `details` (liste non vide) et `impact` ;
- `metrics` : exactement trois indicateurs, chacun avec `label` et `value`, et une `note` facultative ;
- `indexCard.proof` et `indexCard.note` : l’indicateur affiché sur la carte de l’index et son contexte.

Le champ `expectedOutcome` n’est pas accepté. Les indicateurs ne décrivent ni scénario ni simulation. Aucun nom de client ne figure dans une réalisation ni dans les cartes de l’analyse documentaire : `npm run check:i18n` refuse les noms des références de l’accueil.

`src/lib/components/CaseIndicators.svelte` affiche les indicateurs. Sur la fiche, ils s’empilent dans la colonne de droite sur ordinateur et suivent le flux sur mobile, sans défilement horizontal.

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
