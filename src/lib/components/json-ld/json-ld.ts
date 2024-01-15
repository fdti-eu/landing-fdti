export function serializeSchema(thing: { [key: string]: any }) {
	return `<script type="application/ld+json">${JSON.stringify(thing, null, 2)}</script>`;
}

export const schema = (
	type: 'WebSite' | 'WebPage' | 'AboutPage',
	name: string,
	imageUrl: string,
	description: string,
	url: string
) => ({
	'@context': 'https://schema.org',
	'@type': type,
	name: name,
	description: description,
	image: imageUrl,
	url: url
});
