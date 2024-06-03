import { cubicOut } from 'svelte/easing';

export default function slideTransition(
	node: HTMLElement,
	{ delay = 0, duration = 400, easing = cubicOut }
) {
	return {
		delay,
		duration,
		easing,
		css: function (transition: any) {
			return `
                --slide-transition: ${transition};
            `;
		}
	};
}
