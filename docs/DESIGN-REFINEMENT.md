# Refonte du design FDTI — prévisualisation

## Périmètre

Demandée par Jean : reprendre le design, **sans réécriture des textes ni changement d'identité**.

- Branche locale : `design/visual-refinement`, base `8f9d1fd`.
- Aucun commit, push, changement DNS ou déploiement sur le site FDTI en production.
- Conservation de Quattrocento Sans, du jaune `#f9d089`, de l'anthracite `#1d2024`, des logos et illustrations d'origine.
- Conservation des traductions FR/EN, données, routes, destinations des liens, métadonnées SEO et formulaire Tally.
- Dépendances et configuration de build inchangées.

## Design

- Navigation fixe, alignements stables, menu mobile au clavier (Échap + restitution du focus).
- Hero recomposé en deux colonnes, grille technique discrète et illustration d'origine dans un cadre asymétrique.
- Hiérarchie typographique et espacements communs, approche en grille éditoriale.
- Expertises sur fond anthracite avec trois schémas SVG décoratifs, sans nouveaux textes ni allégations.
- Cas client principal mis en avant, chiffres agrandis, descriptions entièrement lisibles plutôt que tronquées.
- Technologies dépliables par boutons accessibles, sans ouverture intempestive au survol.
- Références dans une grille fixe ; doublon décoratif du défilement d'origine masqué.
- Contact, footer, ADN, cas d'usage, offres et pages légales harmonisés.
- Contrastes corrigés avec les couleurs existantes ; respect de `prefers-reduced-motion`.
- La nouvelle feuille `src/lib/styles/design.css` est limitée à **`@media screen`** pour ne pas modifier l'impression des offres A4.

## Vérifications du 6 septembre 2026

```bash
npm run check
npm run build
python3 scripts/check-design-preservation.py
git diff --check
```

Résultats :

- Parité i18n OK, Svelte : **0 erreur, 0 avertissement**.
- Build statique réussi.
- **36 pages** comparées au build d'origine : même séquence de mots, mêmes destinations/attributs des liens, mêmes sources/alternatives d'images, mêmes métadonnées.
- Traductions, fichiers d'assets, tokens/polices, données, dépendances, configuration et composant A4 identiques à la base Git.
- **113 contrôles navigateur réussis, 0 échec** dans Chrome Bernard : FR/EN, 320 à 1440 px, menu mobile, Échap/focus, langue, accordéons, filtres, navigation aller/retour des cas clients, présence du formulaire et du composant A4.
- Axe WCAG 2 A/AA + 2.1 AA : aucune violation sur les pages auditées (accueils FR/EN mobile et desktop ; ADN, listes/détails de cas, listes d'offres et deux pages légales en mobile). Ce contrôle automatique ne constitue pas un audit exhaustif d'accessibilité ; le formulaire tiers n'a pas été soumis.
- Inspection visuelle du hero desktop/mobile, de la page entière et de la grille de logos mobile.
- Security quick-check Bernard : OK ; port d'aperçu lié uniquement à l'IP Tailscale.

Le snapshot `scripts/design-content-baseline.json` a été créé **avant** modification, depuis `/home/jean/clawd/tmp/fdti-design/before`. Le script refuse d'écraser une référence existante. Il compare les textes rendus, pas la structure des composants.

La fixture navigateur est dans `scripts/design-browser-check.html`. La servir uniquement pour les tests sous `/__qa`, avec axe sous `/__axe`, sur le même origin que le build. Elle n'est pas publiée dans `build/`. Cliquer sur « Tester ». Les paramètres `?width=1440`, `?width=390&section=trust` ou `?width=390&page=/fr/cas-d-usage` servent à l'inspection visuelle.

### Contre-revue automatique bloquée

Commande tentée :

```bash
~/clawd/skills/autoreview/scripts/autoreview \
  --mode local --model gpt-5.6-sol --thinking high \
  --output ~/clawd/tmp/fdti-design/review.md \
  --json-output ~/clawd/tmp/fdti-design/review.json
```

Le helper refuse le lancement : `Trusted Pi package version mismatch: expected 0.84.4, got 0.85.1`.

Aucun verdict de contre-revue n'a été obtenu. Le runtime et le garde-fou n'ont pas été modifiés ni contournés. À relancer avant publication lorsque le helper sera compatible. Les vérifications manuelles et navigateur ont notamment corrigé la grille de logos, le contraste des CTA et des petits libellés des cas clients, et les transitions d'opacité de leurs tags.

## Aperçu privé Bernard

- FR : http://jml.me:4178/fr
- EN : http://jml.me:4178/en
- QA : http://jml.me:4178/__qa
- Service user : `fdti-design-preview`.
- Serveur : `/home/jean/clawd/tmp/fdti-design/preview.py`.
- Bind : `100.65.16.11:4178` (Tailscale uniquement), `noindex`, pas de listing de dossiers.
- Arrêt automatique : **9 septembre 2026 à 08:10, Europe/Paris** (durée maximale : 72 h).

```bash
systemctl --user status fdti-design-preview
systemctl --user stop fdti-design-preview
```

La suite attendue est la validation visuelle par Jean ; commit et publication sur le domaine FDTI restent soumis à sa demande explicite.

## Share public de 7 jours — demandé par Jean

- URL : https://share.jml.me/s/2d85e4d4
- Expiration API vérifiée : **13 septembre 2026 à 09:10:34, Europe/Paris** (`2026-09-13T07:10:34.004902+00:00`).
- Accessible sans authentification ni Tailscale, indépendamment du serveur d'aperçu privé qui expire plus tôt.
- Export autonome compressé (~911 Ko), avec les 56 images/polices nécessaires embarquées et les styles/JS intégrés. Aucun port public ni changement Caddy/DNS.
- La copie jetable `/home/jean/clawd/tmp/fdti-share/work` utilise le routeur SvelteKit hash (`#/fr`, `#/en`, etc.) pour conserver une navigation complète sous un seul share. Adaptation des chemins uniquement dans cette copie ; le code source du site et son build statique initial restent inchangés.
- Scripts d'export et relevé d'expiration : `/home/jean/clawd/tmp/fdti-share/` (`prepare.py`, `bundle.mjs`, `package.py`, `publication.json`).
- **58 contrôles navigateur réussis sur le share public** : FR/EN, chargement effectif des deux polices et des images, responsive 320–1440 px, menu, Échap, technologies, langue, pages intérieures, filtres, cas détaillés/retour, offres et présence du formulaire/A4. Aucun formulaire envoyé.
- La fixture QA temporaire a été repassée en visibilité interne après les tests.
