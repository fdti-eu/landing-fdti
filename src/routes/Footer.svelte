<script lang="ts">
	import LinkedinIcon from '$lib/components/LinkedinIcon.svelte';
	import { locale } from 'svelte-i18n';
</script>

<!-- footer -->
<footer class="bg-darkGrey pt-10 pb-20 md:py-5">
	<div class="max-w-screen-wrap mx-auto px-3 wrap:px-5">
		<div class="flex flex-col gap-8 md:flex-row justify-between items-center">
			<p class="text-white text-center">&copy; FDTI</p>
			<div class="flex items-center gap-4 flex-wrap justify-center">
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
				{#if $locale === 'fr'}
					<a
						target="_blank"
						rel="noreferrer"
						href="https://docs.google.com/presentation/d/e/2PACX-1vTxf7KCRA90Jm1rClbzRMZqB7wprtcUv30NwlpyT7RsxcGCKEQxW9HneEJBxo0Ml50srOHn18p5ECpD/pub?start=false&loop=false&delayms=3000"
						class="font-medium leading-none text-white hover:text-yellow transition-all ease-in-out duration-300 sm:pl-2"
						>Plaquette
					</a>
				{:else}
					<a
						target="_blank"
						rel="noreferrer"
						href="https://docs.google.com/presentation/d/e/2PACX-1vTqoylpjD44uKvXaQVAsPAlGMXDLBP_cqpr7gnuj0S2qXDS07mXwww8rMfjU-nAeTyYgR6CRSICSj17/pub?start=false&loop=false&delayms=3000"
						class="font-medium leading-none text-white hover:text-yellow transition-all ease-in-out duration-300 sm:pl-2"
						>Brochure
					</a>
				{/if}
				<LinkedinIcon />
			</div>
		</div>
	</div>
</footer>
