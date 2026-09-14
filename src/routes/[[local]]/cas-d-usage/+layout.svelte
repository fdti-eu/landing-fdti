<script lang="ts">
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';

	let scrollPosition = 0;
	let lastVisitedSlug = '';

	const isUseCaseList = (routeId?: string | null) => routeId?.endsWith('/cas-d-usage') ?? false;

	const restoreScrollImmediately = (top: number) => {
		const root = document.documentElement;
		const previousScrollBehavior = root.style.scrollBehavior;
		root.style.scrollBehavior = 'auto';
		window.scrollTo(0, top);
		requestAnimationFrame(() => {
			root.style.scrollBehavior = previousScrollBehavior;
		});
	};

	// Store pour partager le slug visité avec la page liste
	const highlightedUseCaseStore = writable<string | null>(null);
	setContext('highlightedUseCase', highlightedUseCaseStore);

	beforeNavigate((nav) => {
		// Si on quitte la page liste pour aller vers un use case
		if (browser && nav.to?.route.id?.includes('[slug]') && isUseCaseList(nav.from?.route.id)) {
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
		if (browser && nav.from?.route.id?.includes('[slug]') && isUseCaseList(nav.to?.route.id)) {
			// La feuille globale active le scroll fluide pour les ancres. On le neutralise ici afin
			// que la destination de la View Transition soit capturée directement au bon niveau.
			restoreScrollImmediately(scrollPosition);

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
