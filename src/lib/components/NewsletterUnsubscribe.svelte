<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { resolveNewsletterEndpoint } from '#lib/contact.ts';
	let token = '';
	type SubmissionState = 'loading' | 'ready' | 'pending' | 'success' | 'invalid' | 'error';
	let submissionState = $state<SubmissionState>('loading');
	let controller: AbortController | undefined;
	onMount(() => {
		token = window.location.hash.slice(1);
		window.history.replaceState(null, '', window.location.pathname);
		submissionState = /^[A-Za-z0-9_-]{43}$/.test(token) ? 'ready' : 'invalid';
	});
	onDestroy(() => controller?.abort());

	async function submit() {
		if (submissionState !== 'ready' && submissionState !== 'error') return;
		submissionState = 'pending';
		controller = new AbortController();
		const timeout = setTimeout(() => controller?.abort(), 10000);
		try {
			const response = await fetch(
				resolveNewsletterEndpoint(window.location.hostname, 'unsubscribe'),
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ token }),
					signal: controller.signal
				}
			);
			if (response.status === 422) {
				submissionState = 'invalid';
				return;
			}
			if (!response.ok) throw new Error('Unavailable');
			submissionState = 'success';
			token = '';
		} catch {
			submissionState = 'error';
		} finally {
			clearTimeout(timeout);
		}
	}
</script>

<svelte:head>
	<title>Me désinscrire | Newsletter FDTI</title>
	<meta name="robots" content="noindex, nofollow" />
	<meta name="referrer" content="no-referrer" />
</svelte:head>

<section class="newsletter-action" aria-labelledby="newsletter-action-title">
	<p class="eyebrow">NEWSLETTER FDTI</p>
	<h1 id="newsletter-action-title">
		{submissionState === 'success' ? 'Vous êtes désinscrit.' : 'Vous souhaitez vous désinscrire ?'}
	</h1>
	<div aria-live="polite">
		{#if submissionState === 'loading'}<p>Chargement…</p>
		{:else if submissionState === 'invalid'}<p>
				Ce lien de désinscription est invalide. Utilisez le lien du dernier email reçu ou
				contactez-nous à info@fdti.eu.
			</p>
		{:else if submissionState === 'success'}<p>Vous ne recevrez plus la newsletter FDTI.</p>
		{:else}
			<p>Votre adresse sera retirée de la liste de diffusion.</p>
			<button type="button" onclick={submit} disabled={submissionState === 'pending'}
				>{submissionState === 'pending' ? 'Un instant…' : 'Me désinscrire'}</button
			>
			{#if submissionState === 'error'}<p role="alert">
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
