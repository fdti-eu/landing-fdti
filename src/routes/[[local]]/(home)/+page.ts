import { graphql, type GetHomePageContent$input, GetHomePageContentStore } from '$houdini';
import { getLocalCode } from '$lib/functions/getLocalCode';
import type { ILocal } from '$lib/interface';

export const _houdini_load: GetHomePageContentStore = graphql`
	query GetHomePageContent($code: String!, $url: String!) {
		hero_section {
			title
			status
			translations(filter: { languages_code: { code: { _eq: $code } } }) {
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
			paragraphs {
				icon {
					id
				}
				translations(filter: { languages_code: { code: { _eq: $code } } }) {
					content
				}
			}
			translations(filter: { languages_code: { code: { _eq: $code } } }) {
				subtitle
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
				translations(filter: { languages_code: { code: { _eq: $code } } }) {
					description
				}
				category_icon {
					id
				}
				technology_list(filter: { status: { _eq: "published" } }, sort: ["sort"]) {
					status
					id
					name
					img {
						id
					}
					url
				}
			}

			translations(filter: { languages_code: { code: { _eq: $code } } }) {
				title
				subtitle
			}
		}
		trust_content {
			status
			company_list(filter: { status: { _eq: "published" } }) {
				name
				img {
					id
				}
			}

			translations(filter: { languages_code: { code: { _eq: $code } } }) {
				title
			}
		}
		contact_section {
			status
			address
			company
			mail
			title
			translations(filter: { languages_code: { code: { _eq: $code } } }) {
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
				img {
					id
				}
				translations(filter: { languages_code: { code: { _eq: $code } } }) {
					title
					languages_code {
						code
					}
					content
				}
			}
			translations(filter: { languages_code: { code: { _eq: $code } } }) {
				title
				description
			}
		}
		CII {
			translations(filter: { languages_code: { code: { _eq: $code } } }) {
				description
			}
			status
			image {
				id
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

export function _GetHomePageContentVariables({
	params
}: {
	params: { local?: string };
}): GetHomePageContent$input {
	const local = (params?.local as ILocal) || 'fr';
	const code = getLocalCode(local);
	return { code, url: '/' };
}
