<script lang="ts">
	import LinkedinIcon from '$lib/components/LinkedinIcon.svelte';
	import { locale } from 'svelte-i18n';
	import { onMount } from 'svelte';

	onMount(() => {
		const script = document.createElement('script');
		script.src = 'https://unpkg.com/website-carbon-badges@1.1.3/b.min.js';
		script.defer = true;
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	});
</script>

<style>
/* Global styles to override badge specificities and enforce vertical alignment */
:global(#wcb.carbonbadge) {
    --b1: #1e1e1e; /* Dark grey background matching footer */
    --b2: #fbc531; /* Yellow accent */
    display: flex !important;
    align-items: center !important;
    margin: 0 !important;
}
</style>

<!-- footer -->
<footer class="bg-darkGrey pt-10 pb-20 md:py-5">
	<div class="max-w-screen-wrap mx-auto px-3 wrap:px-5">
		<div class="flex flex-col gap-8 md:flex-row justify-between items-center">
			<div class="flex items-center gap-10 h-full">
				<p class="text-white text-center m-0 leading-none flex items-center">&copy; FDTI</p>
				<div class="flex items-center h-[40px]"> <!-- Fixed height container to constrain badge -->
					<div id="wcb" class="carbonbadge wcb-d flex items-center"></div>
				</div>
			</div>
			<div class="flex items-center gap-4 flex-wrap justify-center h-full">
				<a
					href="/{$locale}/confidentialite"
					class="font-medium leading-none text-white hover:text-yellow transition-all ease-in-out duration-300"
					>{$locale === 'fr' ? 'Politique de confidentialité' : 'Privacy'}</a
				>
				<a
					href="/{$locale}/condition-utilisation"
					class="font-medium leading-none text-white hover:text-yellow transition-all ease-in-out duration-300 sm:pl-2"
					>{$locale === 'fr' ? 'Conditions d’utilisation' : 'Terms of use'}</a
				>
				<LinkedinIcon />
			</div>
		</div>
	</div>
</footer>
