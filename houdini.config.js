/** @type {import('houdini').ConfigFile} */
const config = {
	plugins: {
		'houdini-svelte': {
			client: './src/client'
		}
	},
	scalars: {
		JSON: {
			// <- The GraphQL Scalar
			type: 'YourType_JSON' // <-  The TypeScript type
		},
		json: {
			type: 'object'
		},
		timestamptz: {
			type: 'Date'
		},
		uuid: {
			type: 'string'
		}
	}
};

export default config;
