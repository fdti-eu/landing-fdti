import { graphql, type GetApproachPageContent$input, GetApproachPageContentStore } from '$houdini';
import { getLocalCode } from '$lib/functions/getLocalCode';
import type { ILocal } from '$lib/interface';

export const _houdini_load: GetApproachPageContentStore = graphql`
	query GetApproachPageContent($code: String!, $url: String!) {
		approach_intro {
			status
			translations(filter: { languages_code: { code: { _eq: $code } } }) {
				title
				description
				description_2
			}
		}
		approach_category(sort: ["order_value"], filter: { status: { _eq: "published" } }) {
			charge
			value
			order_value
			translations(filter: { languages_code: { code: { _eq: $code } } }) {
				title
			}
			icon {
				filename_disk
			}
			card_list(sort: ["order"], filter: { status: { _eq: "published" } }) {
				name
				order
				icon {
					id
				}
				translations(filter: { languages_code: { code: { _eq: $code } } }) {
					title
					description
				}
			}
		}
		meta_tags {
			page_tags(filter: { url: { _eq: $url } }) {
				url
				img {
					id
				}
				translations(filter: { languages_code: { code: { _eq: $code } } }) {
					title
					description
				}
			}
		}
	}
`;

export function _GetApproachPageContentVariables({
	params
}: {
	params: { local?: string };
}): GetApproachPageContent$input {
	const local = (params?.local as ILocal) || 'fr';
	const code = getLocalCode(local);
	return { code, url: '/approche-fdti' };
}
