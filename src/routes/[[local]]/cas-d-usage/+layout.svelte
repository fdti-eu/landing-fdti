<script lang="ts">
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';

	let scrollPosition = 0;
	let lastVisitedSlug = '';

	// Store pour partager le slug visité avec la page liste
	const highlightedUseCaseStore = writable<string | null>(null);
	setContext('highlightedUseCase', highlightedUseCaseStore);

	beforeNavigate((nav) => {
		// Si on quitte la page liste pour aller vers un use case
		if (
			browser &&
			nav.to?.route.id?.includes('[slug]') &&
			!nav.from?.route.id?.includes('[slug]')
		) {
			scrollPosition = window.scrollY;
			// Extraire le slug de l'URL
			const slug = nav.to.url.pathname.split('/').pop();
			if (slug) {
				lastVisitedSlug = slug;
			}
		}
	});

	afterNavigate((nav) => {
		// Restaurer le scroll uniquement si on revient à la liste depuis un use case
		if (
			browser &&
			nav.from?.route.id?.includes('[slug]') &&
			!nav.to?.route.id?.includes('[slug]')
		) {
			// Restaurer immédiatement le scroll (avant la view transition visuelle)
			window.scrollTo(0, scrollPosition);

			// Highlight la carte après un court délai
			if (lastVisitedSlug) {
				setTimeout(() => {
					highlightedUseCaseStore.set(lastVisitedSlug);
					// Retirer le highlight après 2.5 secondes (durée de l'animation)
					setTimeout(() => {
						highlightedUseCaseStore.set(null);
					}, 2500);
				}, 200);
			}
		}
	});
</script>

<slot />
