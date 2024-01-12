import { graphql, type GetDNAPageContent$input, GetDNAPageContentStore } from '$houdini';
import { getLocalCode } from '$lib/functions/getLocalCode';
import type { ILocal } from '$lib/interface';

export const _houdini_load: GetDNAPageContentStore = graphql`
	query GetDNAPageContent($code: String!, $url: String!) {
		DNA_content {
			status
			card_list(filter: { status: { _eq: "published" } }, sort: ["order"]) {
				title
				order
				icon {
					filename_disk
				}
				translations(filter: { languages_code: { code: { _eq: $code } } }) {
					title
					description
				}
			}
			RGPD_img {
				id
			}
			translations(filter: { languages_code: { code: { _eq: $code } } }) {
				title
				description
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

export function _GetDNAPageContentVariables({
	params
}: {
	params: { local?: string };
}): GetDNAPageContent$input {
	const local = (params?.local as ILocal) || 'fr';
	const code = getLocalCode(local);
	return { code, url: '/' };
}
