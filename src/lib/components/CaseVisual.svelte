<script lang="ts">
	import type { CaseImage } from '#lib/case-studies.ts';

	interface Props {
		image: CaseImage;
		class?: string;
		style?: string;
		loading?: 'lazy' | 'eager';
		fetchpriority?: 'high' | 'low' | 'auto';
	}

	let { image, class: className = '', style, loading, fetchpriority }: Props = $props();
	const { x, y, width, height } = $derived(image.focus);
</script>

<!-- Crops the 3:2 photograph like object-fit: cover and keeps the gold frame on its focal point. -->
<div class="case-visual {className}" {style} aria-hidden="true">
	<div class="case-visual-stage">
		<img src={image.src} alt="" width="1200" height="800" {loading} {fetchpriority} />
		<span
			class="case-visual-frame"
			style={`left: ${x}%; top: ${y}%; width: ${width}%; height: ${height}%;`}
		>
			<i></i><i></i><i></i><i></i>
		</span>
	</div>
</div>

<style>
	.case-visual {
		position: relative;
		overflow: hidden;
		container-type: size;
		view-transition-class: case-image;
	}
	.case-visual-stage {
		position: absolute;
		top: 50%;
		left: 50%;
		width: max(100cqw, 150cqh);
		height: max(100cqh, 66.667cqw);
		transform: translate(-50%, -50%);
	}
	.case-visual-stage img {
		display: block;
		width: 100%;
		height: 100%;
	}
	.case-visual-frame {
		position: absolute;
		--arm: clamp(6px, 1.4cqmax, 18px);
	}
	.case-visual-frame i {
		position: absolute;
		width: var(--arm);
		height: var(--arm);
		border: 0 solid var(--color-yellow);
	}
	.case-visual-frame i:nth-child(1) {
		top: 0;
		left: 0;
		border-top-width: 2px;
		border-left-width: 2px;
	}
	.case-visual-frame i:nth-child(2) {
		top: 0;
		right: 0;
		border-top-width: 2px;
		border-right-width: 2px;
	}
	.case-visual-frame i:nth-child(3) {
		bottom: 0;
		left: 0;
		border-bottom-width: 2px;
		border-left-width: 2px;
	}
	.case-visual-frame i:nth-child(4) {
		right: 0;
		bottom: 0;
		border-right-width: 2px;
		border-bottom-width: 2px;
	}
	@media (prefers-reduced-motion: no-preference) {
		.case-visual-frame {
			transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
		}
		:global(a:hover) .case-visual-frame,
		:global(a:focus-visible) .case-visual-frame {
			transform: scale(0.9);
		}
		.case-visual.reveal .case-visual-frame {
			animation: case-frame-in 0.6s 0.45s cubic-bezier(0.2, 0, 0, 1) both;
		}
	}
	@keyframes case-frame-in {
		from {
			opacity: 0;
			transform: scale(1.35);
		}
	}
</style>
