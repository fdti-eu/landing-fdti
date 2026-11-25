/** Editorial order of published case study cards. */
export const CASE_CARD_ORDER = ['2', '1', '7', '4', '3', '6', '9', '5', '10', '8'];

export const sortCaseCards = <T extends { id?: string | null }>(cases: T[]): T[] =>
	[...cases].sort(
		(a, b) => CASE_CARD_ORDER.indexOf(a.id ?? '') - CASE_CARD_ORDER.indexOf(b.id ?? '')
	);

/** Focal point of a 3:2 case photograph, in percent of the image. */
export type CaseFocus = { x: number; y: number; width: number; height: number };
export type CaseImage = { src: string; focus: CaseFocus };

/** Illustration of each published case study and the gold element framed by the site. */
const CASE_IMAGES: Record<string, { file: string; focus: CaseFocus }> = {
	'1': { file: 'registry-files', focus: { x: 37, y: 43, width: 26, height: 20 } },
	'2': { file: 'vehicle-pickup', focus: { x: 53.5, y: 34, width: 7, height: 11 } },
	'3': { file: 'battery-shipment', focus: { x: 30, y: 40, width: 40, height: 40 } },
	'4': { file: 'street-lamp', focus: { x: 44.5, y: 5, width: 11, height: 16 } },
	'5': { file: 'campaign-proofs', focus: { x: 45.5, y: 33, width: 16.5, height: 29.5 } },
	'6': { file: 'product-returns', focus: { x: 46, y: 37, width: 9, height: 18 } },
	'7': { file: 'store-receipt', focus: { x: 42.5, y: 17, width: 13, height: 43 } },
	'8': { file: 'battery-intake', focus: { x: 46.5, y: 43, width: 8, height: 17 } },
	'9': { file: 'claim-evidence', focus: { x: 45.5, y: 38, width: 11, height: 28 } },
	'10': { file: 'parts-shelf', focus: { x: 46, y: 54, width: 9, height: 18 } }
};

export const caseImage = (id?: string | null): CaseImage | undefined => {
	const entry = id ? CASE_IMAGES[id] : undefined;
	return entry && { src: `/images/cases/${entry.file}.webp`, focus: entry.focus };
};
