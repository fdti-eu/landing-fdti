/** Editorial order of published case study cards. */
export const CASE_CARD_ORDER = ['2', '1', '7', '4', '3', '6', '9', '5', '10', '8'];

export const sortCaseCards = <T extends { id?: string | null }>(cases: T[]): T[] =>
	[...cases].sort(
		(a, b) => CASE_CARD_ORDER.indexOf(a.id ?? '') - CASE_CARD_ORDER.indexOf(b.id ?? '')
	);
