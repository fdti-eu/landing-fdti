import { graphql, type GetPrivacyContent$input, GetPrivacyContentStore } from '$houdini';
import { getLocalCode } from '$lib/functions/getLocalCode';
import type { ILocal } from '$lib/interface';

export const _houdini_load: GetPrivacyContentStore = graphql`
	query GetPrivacyContent($code: String!) {
		privacy {
			translations(filter: { languages_code: { code: { _eq: $code } } }) {
				title
				content
			}
		}
	}
`;

export function _GetPrivacyContentVariables({
	params
}: {
	params: { local?: string };
}): GetPrivacyContent$input {
	const local = (params?.local as ILocal) || 'fr';
	const code = getLocalCode(local);
	return { code };
}
