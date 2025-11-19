import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import assetMap from './asset-map.json' assert { type: 'json' };

// Polyfill for fetch if needed (Node 18+ has it natively)
// Assuming Node 18+ based on "darwin 24.3.0" (macOS Sequoia)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const ENV_FILE = path.join(ROOT_DIR, '.env');
const IMAGES_DIR = path.join(ROOT_DIR, 'static', 'images', 'cms');
const LOCALES_DIR = path.join(ROOT_DIR, 'src', 'locales');

// Ensure directories exist
if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}
if (!fs.existsSync(LOCALES_DIR)) {
    fs.mkdirSync(LOCALES_DIR, { recursive: true });
}

const envValueRegex = /VITE_CLIENT_URL\s*=\s*(.*)/;

function stripQuotes(value) {
    const trimmed = value.trim();
    if (
        (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
        return trimmed.slice(1, -1);
    }
    return trimmed;
}

function resolveClientUrl(rawValue) {
    let normalized = stripQuotes(rawValue);
    if (!normalized.startsWith('http')) {
        normalized = `https://${normalized}`;
    }

    const url = new URL(normalized);
    const origin = url.origin;
    let pathname = url.pathname || '';
    pathname = pathname === '/' ? '' : pathname.replace(/\/$/, '');
    const graphqlPath = pathname ? pathname : '/graphql';
    return { origin, graphqlPath };
}

// Read .env
let baseOrigin = 'https://cms.fdti.eu';
let graphqlPath = '/graphql';
if (fs.existsSync(ENV_FILE)) {
    try {
        const envConfig = fs.readFileSync(ENV_FILE, 'utf-8');
        const match = envConfig.match(envValueRegex);
        if (match && match[1]) {
            const { origin, graphqlPath: resolvedPath } = resolveClientUrl(match[1]);
            baseOrigin = origin;
            graphqlPath = resolvedPath;
        }
    } catch (e) {
        console.log('Could not read .env, using default URL');
    }
}

const GRAPHQL_URL = `${baseOrigin}${graphqlPath}`;
const ASSETS_URL = `${baseOrigin}/assets`;

console.log(`Using Client URL: ${GRAPHQL_URL}`);

const queries = {
    GetHomePageContent: `
    query GetHomePageContent {
      hero_section {
        title
        status
        translations {
          languages_code { code }
          subtitle
          description
          btn_brochure
          btn_contact
          brochure_link
        }
      }
      fdti_section {
        title
        status
        translations {
          languages_code { code }
          subtitle
          icon_1 { filename_disk }
          content_1
          icon_2 { filename_disk }
          content_2
          btn_label
          btn_name
        }
      }
      technology_content {
        status
        technology_category_list(filter: { status: { _eq: "published" } }, sort: ["order"]) {
          status
          title
          order
          translations {
            languages_code { code }
            description
          }
          category_icon { filename_disk }
          technology_list(filter: { status: { _eq: "published" } }) {
            status
            id
            name
            img { filename_disk }
            url
          }
        }
        translations {
          languages_code { code }
          title
          subtitle
        }
      }
      trust_content {
        status
        company_list(filter: { status: { _eq: "published" } }) {
          name
          img { filename_disk }
        }
        translations {
          languages_code { code }
          title
        }
      }
      contact_section {
        status
        address
        company
        mail
        title
        translations {
          languages_code { code }
          btn_contact
          subtitle
        }
      }
      case_study_section {
        status
        id
        case_study_list {
          tags
          slug
          img { filename_disk }
          translations {
            languages_code { code }
            title
            content
          }
        }
        translations {
          languages_code { code }
          title
          description
        }
      }
      CII {
        translations {
          languages_code { code }
          description
        }
        status
        image { filename_disk }
      }
      meta_tags {
        page_tags {
          url
          img { filename_disk }
          translations {
            languages_code { code }
            title
            description
          }
        }
      }
    }
  `,
    GetCGUContent: `
    query GetCGUContent {
      CGU {
        translations {
          languages_code { code }
          title
          content
        }
      }
    }
  `,
    GetDNAPageContent: `
    query GetDNAPageContent {
      DNA_content {
        status
        card_list(filter: { status: { _eq: "published" } }, sort: ["order"]) {
          title
          order
          icon { filename_disk }
          translations {
            languages_code { code }
            title
            description
          }
        }
        RGPD_img { filename_disk }
        translations {
          languages_code { code }
          title
          description
        }
      }
      meta_tags {
        page_tags {
          url
          img { filename_disk }
          translations {
            languages_code { code }
            title
            description
          }
        }
      }
    }
  `,
    GetApproachPageContent: `
    query GetApproachPageContent {
      approach_intro {
        status
        translations {
          languages_code { code }
          title
          description
          description_2
        }
      }
      approach_category(sort: ["order_value"], filter: { status: { _eq: "published" } }) {
        charge
        value
        order_value
        translations {
          languages_code { code }
          title
        }
        icon { filename_disk }
        card_list(sort: ["order"], filter: { status: { _eq: "published" } }) {
          name
          order
          icon { filename_disk }
          translations {
            languages_code { code }
            title
            description
          }
        }
      }
      meta_tags {
        page_tags {
          url
          img { filename_disk }
          translations {
            languages_code { code }
            title
            description
          }
        }
      }
    }
  `,
    GetPrivacyContent: `
    query GetPrivacyContent {
      privacy {
        translations {
          languages_code { code }
          title
          content
        }
      }
    }
  `
};

// Helper to download image
function resolveAssetName(filename) {
	const mapped = assetMap[filename];
	return mapped || filename;
}

async function downloadImage(filename) {
	if (!filename) return null;
	const targetName = resolveAssetName(filename);
	const localPath = path.join(IMAGES_DIR, targetName);
	const webPath = `/images/cms/${targetName}`;
	fs.mkdirSync(path.dirname(localPath), { recursive: true });

	if (fs.existsSync(localPath)) {
		return { filename: targetName, url: webPath };
	}

	const url = `${ASSETS_URL}/${filename}`;
	try {
		const res = await fetch(url);
		if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
		const arrayBuffer = await res.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		fs.writeFileSync(localPath, buffer);
		console.log(`Downloaded: ${filename} -> ${targetName}`);
		return { filename: targetName, url: webPath };
	} catch (e) {
		console.error(`Error downloading ${filename}:`, e.message);
		return null;
	}
}

// Helper to process object and extract images + flatten translations
async function processData(obj, lang) {
    if (!obj) return obj;
    if (Array.isArray(obj)) {
        return await Promise.all(obj.map(item => processData(item, lang)));
    }
    if (typeof obj === 'object') {
		if (obj.filename_disk) {
			const asset = await downloadImage(obj.filename_disk);
			if (asset) {
				return {
					filename_disk: asset.filename,
					url: asset.url,
					id: asset.filename
				};
			}
			return obj;
		}

        const newObj = {};
        
        // Handle translations if present
        if (obj.translations && Array.isArray(obj.translations)) {
            // Find translation for current lang
            // Note: DB codes are often 'fr-FR', 'en-US', but sometimes just 'fr'.
            // We map 'fr' -> 'fr-FR' or check startsWith.
            const t = obj.translations.find(tr => {
                const code = tr.languages_code?.code;
                if (!code) return false;
                return code === lang || code.startsWith(lang + '-');
            });
            
            if (t) {
                // Merge translation fields into parent
                for (const key in t) {
                    if (key !== 'languages_code') {
                        newObj[key] = await processData(t[key], lang);
                    }
                }
            }
        }

        // Copy other fields
        for (const key in obj) {
            if (key === 'translations') continue;
            
            // Check for image fields (directus_files)
            // They usually have 'filename_disk'
			if (obj[key] && obj[key].filename_disk) {
				const asset = await downloadImage(obj[key].filename_disk);
				if (asset) {
					newObj[key] = {
						filename_disk: asset.filename,
						url: asset.url,
						id: asset.filename
					};
				}
			} else {
                newObj[key] = await processData(obj[key], lang);
            }
        }
        return newObj;
    }
    return obj;
}

// Main execution
async function main() {
    const frData = {};
    const enData = {};

    for (const [key, query] of Object.entries(queries)) {
        console.log(`Fetching ${key}...`);
        try {
            const res = await fetch(GRAPHQL_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });
            
            const json = await res.json();
            if (json.errors) {
                console.error(`Errors in ${key}:`, json.errors);
                continue;
            }

            const data = json.data;
            
            // Process for FR
            frData[key] = await processData(JSON.parse(JSON.stringify(data)), 'fr');
            // Process for EN
            enData[key] = await processData(JSON.parse(JSON.stringify(data)), 'en');

        } catch (e) {
            console.error(`Failed to run ${key}:`, e);
        }
    }

    // Save locales
    fs.writeFileSync(path.join(LOCALES_DIR, 'fr.json'), JSON.stringify(frData, null, 2));
    fs.writeFileSync(path.join(LOCALES_DIR, 'en.json'), JSON.stringify(enData, null, 2));
    
    console.log('Done! translations saved to src/locales/');
}

main();

