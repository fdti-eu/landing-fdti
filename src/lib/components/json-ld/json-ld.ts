export function serializeSchema(thing: Record<string, any>) {
	return `<script type="application/ld+json">${JSON.stringify(thing, null, 2)}</script>`;
}

type SchemaData = {
	name: string;
	description: string;
	url: string;
	image?: string;
} & Record<string, any>;

export const schema = (type: string, data: SchemaData) => {
	const cleanedEntries = Object.entries(data).filter(([, value]) => value !== undefined && value !== null);

	return {
		'@context': 'https://schema.org',
		'@type': type,
		...Object.fromEntries(cleanedEntries)
	};
};
