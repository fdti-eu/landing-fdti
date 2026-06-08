# Organisation des images CMS

Ce dossier contient toutes les images utilisées dans le CMS du site FDTI, organisées en sous-dossiers par catégorie.

## Structure des dossiers

### 📁 `approach/` (19 fichiers)

Illustrations et icônes représentant l'approche FDTI en 5 étapes :

- Identification des données
- Structuration des données
- Modélisation des données
- Interprétation des prévisions
- Co-construction de solutions

### 📁 `branding/` (4 fichiers)

Logos et éléments de marque FDTI :

- Logo principal FDTI
- Variations du logo "From Data To Insight"
- Images de branding institutionnel

### 📁 `companies/` (7 fichiers)

Logos des clients et partenaires qui font confiance à FDTI :

- Samsung
- Cognac
- Mastercard
- Euro-CRM
- Stellantis
- Galloo
- Agence Française de Développement

### 📁 `technologies/` (25 fichiers)

Logos et icônes des technologies utilisées, répartis en 5 catégories :

- **Data Science** : Python, R, Bash, DuckDB
- **Cloud** : Terraform, Azure, AWS, Google Cloud, Docker
- **Data Warehouse** : Redshift, Snowflake, BigQuery
- **IA & Machine Learning** : Scikit-learn, Hugging Face, PyTorch, OpenAI
- **Data Engineering** : Spark, PostgreSQL, Airflow, DBT

### 📁 `values/` (7 fichiers)

Icônes représentant les valeurs et l'ADN de FDTI :

- Flexibilité
- Expérience
- Pertinence (Relevance)
- Engagement (Commitment)
- Exécution
- Coopération

## Formats supportés

- `.svg` : Graphiques vectoriels (logos, icônes)
- `.webp` : Images optimisées pour le web
- `.png` : Images matricielles

## Utilisation dans les fichiers de traduction

Les chemins d'images suivent le format :

```
/images/cms/{catégorie}/{nom-fichier}
```

Exemple :

```json
{
	"url": "/images/cms/technologies/python.webp"
}
```

## Maintenance

Pour ajouter de nouvelles images :

1. Placer l'image dans le dossier approprié
2. Mettre à jour les fichiers de traduction (`src/locales/fr.json` et `src/locales/en.json`)
3. Utiliser des formats optimisés (WebP de préférence pour les photos, SVG pour les logos)
