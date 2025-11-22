import enLocale from '$locales/en.json';

// Recursively remove all 'img', 'icon', and 'category_icon' fields from an object
function removeImageFields(obj: any): any {
	if (Array.isArray(obj)) {
		return obj.map(item => removeImageFields(item));
	} else if (obj !== null && typeof obj === 'object') {
		const newObj: any = {};
		for (const key in obj) {
			if (key !== 'img' && key !== 'icon' && key !== 'category_icon') {
				newObj[key] = removeImageFields(obj[key]);
			}
		}
		return newObj;
	}
	return obj;
}

export async function GET() {
	// Exclude GetCGUContent and GetPrivacyContent from the response
	const { GetCGUContent, GetPrivacyContent, ...filteredLocale } = enLocale as any;

	// Remove all image-related fields
	const cleanedLocale = removeImageFields(filteredLocale);

	return new Response(JSON.stringify(cleanedLocale, null, 2), {
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
