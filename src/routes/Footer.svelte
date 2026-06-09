<script lang="ts">
	import LinkedinIcon from '$lib/components/LinkedinIcon.svelte';
	import { locale } from 'svelte-i18n';
</script>

<!-- footer -->
<footer class="bg-darkGrey pt-10 pb-20 md:py-5">
	<div class="max-w-screen-wrap mx-auto px-3 wrap:px-5">
		<div class="flex flex-col gap-8 md:flex-row justify-between items-center">
			<div class="flex items-center gap-10 h-full">
				<p class="text-white text-center m-0 leading-none flex items-center">&copy; FDTI</p>
			</div>
			<div class="flex items-center gap-4 flex-wrap justify-center h-full">
				<a
					href="/{$locale}/offres-emploi"
					class="font-medium leading-none text-white hover:text-yellow transition-all ease-in-out duration-300"
					>{$locale === 'fr' ? 'Offres' : 'Jobs'}</a
				>
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
