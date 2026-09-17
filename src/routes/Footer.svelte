<script lang="ts">
	import LinkedinIcon from '$lib/components/LinkedinIcon.svelte';
	import { locale } from 'svelte-i18n';
	import { isSupportedLocale, type Lang } from '$lib/data';

	const labels: Record<Lang, { jobs: string; privacy: string; terms: string }> = {
		fr: {
			jobs: 'Offres',
			privacy: 'Politique de confidentialité',
			terms: 'Conditions d’utilisation'
		},
		en: { jobs: 'Jobs', privacy: 'Privacy', terms: 'Terms of use' },
		es: {
			jobs: 'Empleo',
			privacy: 'Política de privacidad',
			terms: 'Condiciones de uso'
		}
	};
	$: currentLocale = isSupportedLocale($locale) ? $locale : 'fr';
	$: copy = labels[currentLocale];
</script>

<!-- footer -->
<footer class="fdti-footer bg-darkGrey pt-10 pb-20 md:py-5">
	<div class="max-w-screen-wrap mx-auto px-3 wrap:px-5">
		<div class="flex flex-col gap-8 md:flex-row justify-between items-center">
			<div class="flex items-center gap-10 h-full">
				<p class="text-white text-center m-0 leading-none flex items-center">&copy; FDTI</p>
			</div>
			<div class="flex items-center gap-4 flex-wrap justify-center h-full">
				<a
					href="/{currentLocale}/offres-emploi"
					class="font-medium leading-none text-white hover:text-yellow transition-all ease-in-out duration-300"
					>{copy.jobs}</a
				>
				<a
					href="/{currentLocale}/confidentialite"
					class="font-medium leading-none text-white hover:text-yellow transition-all ease-in-out duration-300"
					>{copy.privacy}</a
				>
				<a
					href="/{currentLocale}/condition-utilisation"
					class="font-medium leading-none text-white hover:text-yellow transition-all ease-in-out duration-300 sm:pl-2"
					>{copy.terms}</a
				>
				<LinkedinIcon />
			</div>
		</div>
	</div>
</footer>
