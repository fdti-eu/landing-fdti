# FDTI Website

Site vitrine public de FDTI Consulting : `https://www.fdti.eu`.

Stack : SvelteKit, Svelte 5, TypeScript, Tailwind CSS.

## Contenu

Le contenu éditorial principal est stocké dans les fichiers JSON :

- `src/locales/fr.json`
- `src/locales/en.json`

Les pages, cas d’usage, métadonnées SEO, `sitemap.xml` et `llms.txt` sont générés à partir de ces fichiers pendant le build.

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
