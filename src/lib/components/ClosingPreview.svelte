<script lang="ts">
	import { onDestroy, tick } from 'svelte';

	let email = '';
	let message = '';
	let newsletter = false;
	let submitted = false;
	let copied = false;
	let copyError = false;
	let copyTimer: ReturnType<typeof setTimeout> | undefined;
	let result: HTMLDivElement;
	$: hasMessage = message.trim().length > 0;
	$: submitLabel = hasMessage
		? 'Envoyer mon message'
		: newsletter
			? 'M’inscrire'
			: 'Être recontacté';

	async function copyEmail() {
		copyError = false;
		try {
			if (navigator.clipboard && window.isSecureContext) {
				await navigator.clipboard.writeText('info@fdti.eu');
			} else {
				const field = document.createElement('textarea');
				field.value = 'info@fdti.eu';
				field.setAttribute('readonly', '');
				field.style.position = 'fixed';
				field.style.opacity = '0';
				document.body.appendChild(field);
				try {
					field.select();
					if (!document.execCommand('copy')) throw new Error('Copy unavailable');
				} finally {
					field.remove();
				}
			}
			copied = true;
			clearTimeout(copyTimer);
			copyTimer = setTimeout(() => (copied = false), 4000);
		} catch {
			copyError = true;
		}
	}

	async function previewSubmission(event: SubmitEvent) {
		event.preventDefault();
		submitted = true;
		await tick();
		result.focus();
	}

	onDestroy(() => clearTimeout(copyTimer));
</script>

<section id="contact" class="contact-preview" aria-labelledby="closing-title">
	<div class="closing-shell">
		<div class="contact-intro">
			<h2 id="closing-title">On reste en contact ?</h2>
			<p>Un projet, une question ou simplement envie de suivre l’actualité IA et tech.</p>
			<div class="direct-contact">
				<p>Vous préférez nous écrire directement ?</p>
				<button
					type="button"
					class="copy-email"
					onclick={copyEmail}
					aria-label="Copier l’adresse info@fdti.eu"
				>
					<span>info@fdti.eu</span>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.6"
						aria-hidden="true"
						><rect x="8" y="8" width="11" height="11" rx="1" /><path d="M16 8V5H5v11h3" /></svg
					>
				</button>
				<span class="copy-feedback" role="status"
					>{copied
						? 'Adresse copiée'
						: copyError
							? 'Copie indisponible : sélectionnez l’adresse ci-dessus.'
							: 'Cliquer pour copier'}</span
				>
			</div>
		</div>
		<div class="contact-form-panel">
			{#if submitted}
				<div bind:this={result} class="preview-result" role="status" tabindex="-1">
					<h3>Aperçu de votre demande</h3>
					{#if hasMessage}<p>Message à FDTI depuis <strong>{email}</strong>.</p>
					{:else if !newsletter}<p>Demande de contact à <strong>{email}</strong>.</p>{/if}
					{#if newsletter}<p>
							Inscription à la <strong>newsletter FDTI</strong> pour {email}, après confirmation de
							l’adresse.
						</p>{/if}
					<p class="preview-note">
						Maquette locale : aucune donnée enregistrée, aucun message ni email envoyé.
					</p>
					<button type="button" class="back-button" onclick={() => (submitted = false)}
						>Revenir au formulaire</button
					>
				</div>
			{:else}
				<form onsubmit={previewSubmission}>
					<label for="closing-email">Votre adresse email</label>
					<input
						id="closing-email"
						name="email"
						type="email"
						bind:value={email}
						required
						autocomplete="email"
						maxlength="254"
						placeholder="vous@entreprise.fr"
					/>
					<label for="closing-message" class="message-label"
						>Votre message <span>(facultatif)</span></label
					>
					<textarea
						id="closing-message"
						name="message"
						bind:value={message}
						rows="2"
						maxlength="1000"
						placeholder="Parlez-nous de votre projet…"
					></textarea>
					<label class="newsletter-option" for="closing-newsletter">
						<input
							id="closing-newsletter"
							name="newsletter"
							type="checkbox"
							bind:checked={newsletter}
						/>
						<span
							><strong>Recevoir la newsletter FDTI</strong><span class="newsletter-description"
								>4 actualités IA et Tech. Un email par semaine.</span
							></span
						>
					</label>
					<div class="form-bottom">
						<p class="privacy">
							{newsletter
								? 'Inscription à confirmer par email. Désinscription en un clic.'
								: 'Vos coordonnées servent uniquement à vous répondre.'}
							<a href="/confidentialite">Confidentialité</a>
						</p>
						<button type="submit" class="submit-button"
							>{submitLabel}<span aria-hidden="true">→</span></button
						>
					</div>
				</form>
			{/if}
		</div>
	</div>
</section>

<style>
	.contact-preview {
		background: #f5f4ee;
		color: #1d2024;
		padding: 46px var(--design-gutter);
		border-top: 1px solid #d5d6ce;
		scroll-margin-top: 100px;
	}
	.closing-shell {
		max-width: 1080px;
		margin: auto;
		display: grid;
		grid-template-columns: 0.8fr 1.2fr;
		gap: clamp(35px, 6vw, 90px);
		align-items: start;
	}
	h2 {
		margin: 0;
		font-size: clamp(27px, 2.5vw, 34px);
		line-height: 1.15;
		letter-spacing: -0.035em;
		font-weight: 700;
		text-align: left;
	}
	.contact-intro > p {
		margin-top: 14px;
		font-size: 15px;
		line-height: 1.65;
		max-width: 340px;
		color: #5c6264;
	}
	.direct-contact {
		margin-top: 37px;
	}
	.direct-contact > p {
		font-size: 12px;
		color: #656b6d;
		margin-bottom: 9px;
	}
	.copy-email {
		display: inline-flex;
		align-items: center;
		gap: 14px;
		padding: 0;
		font-size: 21px;
		font-weight: 700;
		text-align: left;
	}
	.copy-email svg {
		width: 17px;
		height: 17px;
	}
	.copy-email:hover > span {
		text-decoration: underline;
		text-underline-offset: 5px;
	}
	.copy-feedback {
		display: block;
		min-height: 18px;
		margin-top: 5px;
		font-size: 11px;
		color: #686e70;
	}
	form > label:not(.newsletter-option) {
		display: block;
		font-size: 13px;
		font-weight: 700;
		margin-bottom: 8px;
	}
	.message-label {
		margin-top: 18px;
	}
	.message-label span {
		font-weight: 400;
		color: #747a7c;
	}
	input[type='email'],
	textarea {
		width: 100%;
		min-height: 46px;
		border: 1px solid #a5aaa8;
		border-radius: 3px;
		padding: 11px 13px;
		font: inherit;
		font-size: 16px;
		background: white;
		color: #1d2024;
	}
	textarea {
		display: block;
		resize: vertical;
		min-height: 76px;
	}
	.newsletter-option {
		display: flex;
		gap: 12px;
		align-items: flex-start;
		margin-top: 20px;
		cursor: pointer;
	}
	.newsletter-option input {
		width: 17px;
		height: 17px;
		margin-top: 3px;
		flex-shrink: 0;
		accent-color: #1d2024;
	}
	.newsletter-option strong {
		display: block;
		font-size: 14px;
		font-weight: 700;
	}
	.newsletter-description {
		display: block;
		margin-top: 3px;
		font-size: 12px;
		color: #63696b;
		line-height: 1.5;
	}
	.form-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		margin-top: 22px;
	}
	.privacy {
		max-width: 280px;
		font-size: 11px;
		line-height: 1.6;
		color: #686e70;
	}
	.privacy a {
		text-decoration: underline;
		text-underline-offset: 3px;
		white-space: nowrap;
	}
	.submit-button {
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		gap: 24px;
		padding: 13px 18px;
		min-height: 46px;
		background: #1d2024;
		color: white;
		border: 1px solid #1d2024;
		border-radius: 3px;
		font-size: 14px;
		font-weight: 700;
		white-space: nowrap;
	}
	.submit-button:hover {
		background: var(--color-yellow);
		color: #1d2024;
		border-color: var(--color-yellow);
	}
	.preview-result {
		padding: 24px;
		background: white;
		border-left: 3px solid var(--color-yellow);
		overflow-wrap: anywhere;
	}
	h3 {
		font-size: 20px;
		font-weight: 700;
		margin-bottom: 14px;
	}
	.preview-result p {
		font-size: 14px;
		line-height: 1.7;
		margin-top: 10px;
	}
	.preview-result .preview-note {
		font-size: 12px;
		color: #63696b;
		margin-top: 20px;
	}
	.back-button {
		font-size: 13px;
		text-decoration: underline;
		text-underline-offset: 4px;
		margin-top: 20px;
	}
	button:focus-visible,
	input:focus-visible,
	textarea:focus-visible,
	a:focus-visible {
		outline: 2px solid #1d2024;
		outline-offset: 4px;
	}
	@media (max-width: 760px) {
		.contact-preview {
			padding-block: 32px;
		}
		.closing-shell {
			grid-template-columns: 1fr;
			gap: 27px;
		}
		.contact-intro > p {
			max-width: none;
		}
		.direct-contact {
			margin-top: 20px;
		}
		.form-bottom {
			flex-direction: column-reverse;
			align-items: stretch;
			gap: 12px;
			margin-top: 20px;
		}
		.submit-button {
			width: 100%;
		}
		.privacy {
			max-width: none;
		}
	}
</style>
