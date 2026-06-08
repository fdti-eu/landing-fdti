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

### Activation côté GitHub

Dans le repo GitHub :

1. aller dans **Settings → Pages** ;
2. choisir **Source: GitHub Actions** ;
3. vérifier que le domaine custom est `www.fdti.eu` ;
4. activer **Enforce HTTPS** quand GitHub le permet.

### DNS attendu

Pour le domaine apex `fdti.eu`, configurer les enregistrements A GitHub Pages :

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Pour `www.fdti.eu`, configurer un CNAME `www` vers `fdti-eu.github.io`.

Le domaine canonique est `https://www.fdti.eu`. GitHub Pages redirige l'apex `https://fdti.eu` vers `https://www.fdti.eu`.

## Routes statiques importantes

- `/fr` et `/en`
- `/fr/cas-d-usage` et `/en/cas-d-usage`
- pages détaillées des cas d’usage
- `/sitemap.xml`
- `/llms.txt`
- `/llm.txt` — même contenu que `/llms.txt` pour compatibilité

## Déploiement Vercel historique

Le projet utilisait auparavant `@sveltejs/adapter-vercel` et le script `npm run deploy` pour déclencher Vercel. Cette voie est considérée legacy depuis la préparation GitHub Pages.
