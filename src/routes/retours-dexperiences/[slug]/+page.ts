import { graphql, type getCaseStudyContent$input } from '$houdini';

// const getCaseStudyContent = graphql(`
// 	query getCaseStudyContent($slug: String!) {
// 		CaseStudy(filter: { slug: { _eq: $slug } }) {
// 			title
// 			content
// 			tags
// 			imgUrl
// 			slug
// 			img {
// 				id
// 			}
// 		}
// 	}
// `);

const getCaseStudyContent = graphql(`
	query getCaseStudyContent($slug: String!) {
		case_study(filter: { slug: { _eq: $slug } }) {
			tags
			slug
			img {
				id
			}
			translations {
				title
				languages_code {
					name
				}
				content
				description
			}
		}
	}
`);

export function _getCaseStudyContentVariables({ params }: any): getCaseStudyContent$input {
	return { slug: params.slug };
}

export const _houdini_load = [getCaseStudyContent];
