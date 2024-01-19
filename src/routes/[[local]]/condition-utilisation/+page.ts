import { graphql, type GetCGUContent$input, GetCGUContentStore } from '$houdini';
import { getLocalCode } from '$lib/functions/getLocalCode';
import type { ILocal } from '$lib/interface';

export const _houdini_load: GetCGUContentStore = graphql`
	query GetCGUContent($code: String!) {
		CGU {
			translations(filter: { languages_code: { code: { _eq: $code } } }) {
				title
				content
			}
		}
	}
`;

export function _GetCGUContentVariables({
	params
}: {
	params: { local?: string };
}): GetCGUContent$input {
	const local = (params?.local as ILocal) || 'fr';
	const code = getLocalCode(local);
	return { code };
}
