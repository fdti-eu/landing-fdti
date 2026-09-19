<script lang="ts">
	import LinkedinIcon from '$lib/components/LinkedinIcon.svelte';
	import { locale } from 'svelte-i18n';
	import { isSupportedLocale, type Lang } from '$lib/data';
	import { buildLocalizedPath } from '$lib/functions/seo';

	const labels: Record<Lang, { jobs: string; privacy: string; terms: string; linkedin: string }> = {
		fr: {
			jobs: 'Offres',
			privacy: 'Politique de confidentialité',
			terms: 'Conditions d’utilisation',
			linkedin: 'Page LinkedIn de FDTI'
		},
		en: {
			jobs: 'Jobs',
			privacy: 'Privacy',
			terms: 'Terms of use',
			linkedin: 'FDTI LinkedIn page'
		},
		es: {
			jobs: 'Empleo',
			privacy: 'Política de privacidad',
			terms: 'Condiciones de uso',
			linkedin: 'Página de LinkedIn de FDTI'
		},
		de: {
			jobs: 'Karriere',
			privacy: 'Datenschutzerklärung',
			terms: 'Nutzungsbedingungen',
			linkedin: 'LinkedIn-Seite von FDTI'
		},
		it: {
			jobs: 'Lavora con noi',
			privacy: 'Informativa sulla privacy',
			terms: 'Condizioni d’uso',
			linkedin: 'Pagina LinkedIn di FDTI'
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
					href={buildLocalizedPath('/offres-emploi', currentLocale)}
					class="font-medium leading-none text-white hover:text-yellow transition-all ease-in-out duration-300"
					>{copy.jobs}</a
				>
				<a
					href={buildLocalizedPath('/confidentialite', currentLocale)}
					class="font-medium leading-none text-white hover:text-yellow transition-all ease-in-out duration-300"
					>{copy.privacy}</a
				>
				<a
					href={buildLocalizedPath('/condition-utilisation', currentLocale)}
					class="font-medium leading-none text-white hover:text-yellow transition-all ease-in-out duration-300 sm:pl-2"
					>{copy.terms}</a
				>
				<LinkedinIcon ariaLabel={copy.linkedin} />
			</div>
		</div>
	</div>
</footer>
