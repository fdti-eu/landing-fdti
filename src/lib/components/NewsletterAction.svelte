<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { resolveNewsletterEndpoint } from '$lib/contact';
	export let action: 'confirm' | 'unsubscribe';
	let token = '';
	let state: 'loading' | 'ready' | 'pending' | 'success' | 'invalid' | 'error' = 'loading';
	let controller: AbortController | undefined;
	$: confirm = action === 'confirm';

	onMount(() => {
		token = window.location.hash.slice(1);
		window.history.replaceState(null, '', window.location.pathname);
		state = /^[A-Za-z0-9_-]{43}$/.test(token) ? 'ready' : 'invalid';
	});
	onDestroy(() => controller?.abort());

	async function submit() {
		if (state !== 'ready' && state !== 'error') return;
		state = 'pending';
		controller = new AbortController();
		const timeout = setTimeout(() => controller?.abort(), 10000);
		try {
			const response = await fetch(resolveNewsletterEndpoint(window.location.hostname, action), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token }),
				signal: controller.signal
			});
			if (response.status === 422) {
				state = 'invalid';
				return;
			}
			if (!response.ok) throw new Error('Unavailable');
			state = 'success';
			token = '';
		} catch {
			state = 'error';
		} finally {
			clearTimeout(timeout);
		}
	}
</script>

<svelte:head>
	<title>{confirm ? 'Confirmer mon inscription' : 'Me désinscrire'} | Newsletter FDTI</title>
	<meta name="robots" content="noindex, nofollow" />
	<meta name="referrer" content="no-referrer" />
</svelte:head>

<section class="newsletter-action" aria-labelledby="newsletter-action-title">
	<p class="eyebrow">NEWSLETTER FDTI</p>
	<h1 id="newsletter-action-title">
		{state === 'success'
			? confirm
				? 'Votre inscription est confirmée.'
				: 'Vous êtes désinscrit.'
			: confirm
				? 'Confirmez votre inscription.'
				: 'Vous souhaitez vous désinscrire ?'}
	</h1>
	<div aria-live="polite">
		{#if state === 'loading'}<p>Chargement…</p>
		{:else if state === 'invalid'}<p>
				{confirm
					? 'Ce lien est invalide ou expiré. Pour vous inscrire, renseignez à nouveau votre email sur notre site.'
					: 'Ce lien de désinscription est invalide. Utilisez le lien du dernier email reçu ou contactez-nous à info@fdti.eu.'}
			</p>
		{:else if state === 'success'}<p>
				{confirm
					? 'Vous recevrez la newsletter FDTI : quatre actualités IA et tech, une fois par semaine. Vous pourrez vous désinscrire à tout moment.'
					: 'Vous ne recevrez plus la newsletter FDTI.'}
			</p>
		{:else}
			<p>
				{confirm
					? '4 actualités IA et tech. Un email par semaine. Désinscription à tout moment.'
					: 'Votre adresse sera retirée de la liste de diffusion.'}
			</p>
			<button type="button" onclick={submit} disabled={state === 'pending'}
				>{state === 'pending'
					? 'Un instant…'
					: confirm
						? 'Confirmer mon inscription'
						: 'Me désinscrire'}</button
			>
			{#if state === 'error'}<p role="alert">
					Le service est indisponible. Vous pouvez réessayer.
				</p>{/if}
		{/if}
	</div>
	<a href="/#contact">Retour au site FDTI</a>
</section>

<style>
	.newsletter-action {
		max-width: 720px;
		margin: auto;
		padding: 170px 24px 100px;
		min-height: 70vh;
	}
	.eyebrow {
		font-size: 12px;
		letter-spacing: 0.1em;
		margin-bottom: 22px;
	}
	h1 {
		font-size: clamp(30px, 5vw, 46px);
		font-weight: 700;
		letter-spacing: -0.03em;
		line-height: 1.15;
	}
	p {
		font-size: 16px;
		line-height: 1.7;
		margin-top: 20px;
		color: #5c6264;
	}
	button {
		margin-top: 26px;
		padding: 15px 22px;
		background: #1d2024;
		color: white;
		border-radius: 3px;
		font-size: 15px;
	}
	button:disabled {
		opacity: 0.6;
	}
	a {
		display: inline-block;
		margin-top: 35px;
		font-size: 13px;
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	button:focus-visible,
	a:focus-visible {
		outline: 2px solid #1d2024;
		outline-offset: 4px;
	}
</style>
