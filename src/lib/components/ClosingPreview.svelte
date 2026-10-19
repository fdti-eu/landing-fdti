<script lang="ts">
	import { page } from '$app/stores';

	let mode: 'write' | 'callback' | 'newsletter' = 'write';
	let email = '';
	let contact = '';
	let note = '';
	let time = '08:30';
	let consent = false;
	let newsletterDone = false;
	let callbackDone = false;
	let copied = false;
	$: variant = $page.url.searchParams.get('footer') === 'b' ? 'b' : 'a';

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText('info@fdti.eu');
			copied = true;
		} catch {
			copied = false;
		}
	}
</script>

{#snippet callbackForm()}
	<div class="callback-panel">
		{#if callbackDone}
			<p role="status" class="result">
				Aperçu : votre demande serait transmise à FDTI. Rien n’a été envoyé.
			</p>
			<button type="button" class="text-button" onclick={() => (callbackDone = false)}
				>Modifier ma demande</button
			>
		{:else}
			<form
				class="callback-form"
				onsubmit={(event) => {
					event.preventDefault();
					callbackDone = true;
				}}
			>
				<div>
					<label for="preview-contact">Votre email ou téléphone</label><input
						id="preview-contact"
						bind:value={contact}
						required
						maxlength="254"
						autocomplete="email"
						placeholder="vous@entreprise.fr ou +33 6…"
					/>
				</div>
				<div>
					<label for="preview-note">Un mot sur votre projet <span>(facultatif)</span></label><input
						id="preview-note"
						bind:value={note}
						maxlength="1000"
						placeholder="Comment peut-on vous aider ?"
					/>
				</div>
				<button type="submit" class="solid-button"
					>Être recontacté <span aria-hidden="true">→</span></button
				>
			</form>
			<p class="fine-print">
				Vos coordonnées servent uniquement à vous répondre. Aucune inscription à la newsletter.
			</p>
		{/if}
	</div>
{/snippet}

{#snippet newsletterForm()}
	{#if newsletterDone}
		<div class="newsletter-result" role="status">
			<p>
				<strong>Prochaine étape : confirmer votre email.</strong> Aperçu uniquement : aucun email
				envoyé à {email}.
			</p>
			<button type="button" class="text-button" onclick={() => (newsletterDone = false)}
				>Modifier</button
			>
		</div>
	{:else}
		<form
			class="newsletter-form"
			onsubmit={(event) => {
				event.preventDefault();
				newsletterDone = true;
			}}
		>
			<div class="newsletter-line">
				<div class="newsletter-copy">
					<h2>Le Radar FDTI</h2>
					<p>4 actualités IA & tech. Un email par semaine.</p>
				</div>
				<div class="signup-controls">
					<label class="sr-only" for="preview-email">Votre email pour Le Radar FDTI</label><input
						id="preview-email"
						type="email"
						bind:value={email}
						required
						maxlength="254"
						autocomplete="email"
						placeholder="Votre adresse email"
					/><button class="solid-button gold" type="submit"
						>M’inscrire <span aria-hidden="true">→</span></button
					>
				</div>
			</div>
			<div class="newsletter-meta">
				<label class="consent"
					><input type="checkbox" bind:checked={consent} required /><span
						>J’accepte de recevoir Le Radar FDTI. Désinscription en un clic.</span
					></label
				>
				<details class="preferences">
					<summary>Mardi, {time.replace(':', ' h ')} · Modifier</summary>
					<div>
						<label for="preview-time">Heure de réception · Paris</label><select
							id="preview-time"
							bind:value={time}
							><option value="07:00">7 h</option><option value="08:30">8 h 30</option><option
								value="12:30">12 h 30</option
							><option value="18:00">18 h</option></select
						><a href="/confidentialite">Confidentialité</a>
					</div>
				</details>
			</div>
		</form>
	{/if}
{/snippet}

<div id="contact" class="closing-preview">
	<div class="comparison">
		<span>APERÇUS LOCAUX · AUCUN ENVOI</span>
		<nav aria-label="Comparer les variantes">
			<a href="?footer=a#contact" aria-current={variant === 'a' ? 'page' : undefined}
				>A · Deux bandeaux</a
			><a href="?footer=b#contact" aria-current={variant === 'b' ? 'page' : undefined}
				>B · Un seul bloc</a
			>
		</nav>
	</div>
	{#if variant === 'a'}
		<section class="contact-strip" aria-label="Contacter FDTI">
			<div class="strip-shell contact-line">
				<div>
					<h2>Un projet, une question ?</h2>
					<p>Choisissez comment échanger avec nous.</p>
				</div>
				<div class="contact-actions">
					<a class="email-link" href="mailto:info@fdti.eu"
						>Nous écrire <span aria-hidden="true">↗</span><small>info@fdti.eu</small></a
					><span class="or">ou</span><button
						type="button"
						class="outline-button"
						aria-expanded={mode === 'callback'}
						onclick={() => (mode = mode === 'callback' ? 'write' : 'callback')}
						>Être recontacté <span aria-hidden="true">{mode === 'callback' ? '−' : '+'}</span
						></button
					>
				</div>
			</div>
			{#if mode === 'callback'}<div class="strip-shell">{@render callbackForm()}</div>{/if}
		</section>
		<section id="radar" class="newsletter-strip" aria-label="Newsletter Le Radar FDTI">
			<div class="strip-shell">{@render newsletterForm()}</div>
		</section>
	{:else}
		<section class="combined-strip" aria-label="Contact et newsletter FDTI">
			<div class="strip-shell">
				<div class="combined-heading">
					<h2>Contact & veille</h2>
					<div class="intent-options" role="group" aria-label="Que souhaitez-vous faire ?">
						<button type="button" aria-pressed={mode === 'write'} onclick={() => (mode = 'write')}
							>Nous écrire</button
						><button
							type="button"
							aria-pressed={mode === 'callback'}
							onclick={() => (mode = 'callback')}>Être recontacté</button
						><button
							type="button"
							aria-pressed={mode === 'newsletter'}
							onclick={() => (mode = 'newsletter')}>Recevoir le Radar</button
						>
					</div>
				</div>
				<div class="intent-panel">
					{#if mode === 'write'}<div class="write-panel">
							<p>Un projet ou une question ? Écrivez-nous directement.</p>
							<div>
								<a href="mailto:info@fdti.eu">info@fdti.eu <span aria-hidden="true">↗</span></a
								><button type="button" class="text-button" onclick={copyEmail}
									>{copied ? 'Adresse copiée' : 'Copier l’adresse'}</button
								>
							</div>
						</div>
					{:else if mode === 'callback'}{@render callbackForm()}
					{:else}<div id="radar">{@render newsletterForm()}</div>{/if}
				</div>
			</div>
		</section>
	{/if}
</div>

<style>
	.closing-preview {
		color: #1d2024;
		scroll-margin-top: 100px;
	}
	.comparison {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		max-width: 1280px;
		margin: auto;
		padding: 14px 0;
		font-size: 11px;
	}
	.comparison > span {
		color: #737779;
		font-size: 9px;
		letter-spacing: 0.08em;
	}
	.comparison nav {
		display: flex;
		gap: 6px;
	}
	.comparison a {
		padding: 8px 12px;
		border: 1px solid #dedfd8;
		border-radius: 3px;
	}
	.comparison a[aria-current='page'] {
		background: #1d2024;
		border-color: #1d2024;
		color: white;
	}
	.contact-strip,
	.combined-strip {
		background: #f5f4ee;
		border-top: 1px solid #d8dad1;
	}
	.strip-shell {
		max-width: 1280px;
		margin: auto;
	}
	.contact-strip {
		padding: 29px var(--design-gutter);
	}
	.contact-line,
	.contact-actions,
	.newsletter-line,
	.signup-controls,
	.combined-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 28px;
	}
	h2 {
		font-size: 23px;
		font-weight: 700;
		letter-spacing: -0.025em;
		line-height: 1.2;
		margin: 0;
		text-align: left;
	}
	p {
		font-size: 14px;
		line-height: 1.6;
		margin: 5px 0 0;
		color: #5a6062;
	}
	.contact-actions {
		gap: 22px;
	}
	.email-link {
		font-size: 15px;
		font-weight: 700;
	}
	.email-link > span {
		margin-left: 16px;
	}
	.email-link small {
		display: block;
		font-size: 12px;
		font-weight: 400;
		color: #656b6d;
		margin-top: 3px;
	}
	.or {
		color: #747a7b;
		font-size: 12px;
	}
	button,
	input,
	select {
		font: inherit;
	}
	.outline-button,
	.solid-button {
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		gap: 24px;
		padding: 12px 18px;
		min-height: 46px;
		border: 1px solid #1d2024;
		border-radius: 3px;
		font-weight: 700;
		font-size: 14px;
		white-space: nowrap;
	}
	.outline-button:hover {
		background: white;
	}
	.solid-button {
		color: white;
		background: #1d2024;
	}
	.solid-button:hover {
		background: #3b4145;
	}
	.solid-button.gold {
		background: var(--color-yellow);
		color: #1d2024;
		border-color: var(--color-yellow);
	}
	.solid-button.gold:hover {
		border-color: #1d2024;
	}
	.newsletter-strip {
		padding: 24px var(--design-gutter) 20px;
		background: white;
		border-top: 1px solid #dedfd8;
	}
	.newsletter-copy h2 {
		font-size: 19px;
	}
	.newsletter-copy p {
		font-size: 13px;
	}
	.signup-controls {
		gap: 8px;
		flex: 0 1 480px;
	}
	input:not([type='checkbox']),
	select {
		width: 100%;
		min-width: 0;
		min-height: 46px;
		border: 1px solid #b3b7b5;
		border-radius: 3px;
		padding: 10px 13px;
		font-size: 15px;
		background: white;
	}
	.newsletter-meta {
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;
		gap: 22px;
		margin-top: 10px;
		font-size: 11px;
	}
	.consent {
		display: flex;
		gap: 7px;
		align-items: flex-start;
		color: #606668;
		line-height: 1.5;
	}
	.consent input {
		width: 14px;
		height: 14px;
		flex-shrink: 0;
		margin-top: 1px;
		accent-color: #1d2024;
	}
	.preferences summary {
		cursor: pointer;
		color: #51585a;
		text-decoration: underline;
		text-underline-offset: 3px;
		white-space: nowrap;
		list-style: none;
	}
	.preferences summary::-webkit-details-marker {
		display: none;
	}
	.preferences > div {
		display: grid;
		gap: 10px;
		padding-top: 13px;
	}
	.preferences select {
		min-height: 38px;
		font-size: 13px;
	}
	.preferences a {
		text-decoration: underline;
	}
	.callback-panel {
		border-top: 1px solid #d8dad1;
		padding-top: 22px;
		margin-top: 24px;
	}
	.callback-form {
		display: grid;
		grid-template-columns: 1fr 1fr auto;
		gap: 16px;
		align-items: end;
	}
	.callback-form label {
		font-size: 12px;
		font-weight: 700;
		display: block;
		margin-bottom: 7px;
	}
	.callback-form label span {
		font-weight: 400;
		color: #727879;
	}
	.fine-print {
		font-size: 11px;
		margin-top: 10px;
	}
	.newsletter-result {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		padding-block: 10px;
		overflow-wrap: anywhere;
	}
	.text-button {
		font-size: 12px;
		text-decoration: underline;
		text-underline-offset: 4px;
		white-space: nowrap;
	}
	.combined-strip {
		padding: 25px var(--design-gutter);
	}
	.combined-heading {
		gap: 30px;
		padding-bottom: 20px;
		border-bottom: 1px solid #d1d4cb;
	}
	.combined-heading h2 {
		font-size: 19px;
	}
	.intent-options {
		display: flex;
		gap: 5px;
	}
	.intent-options button {
		font-size: 13px;
		padding: 10px 15px;
		border: 1px solid transparent;
		border-radius: 3px;
	}
	.intent-options button[aria-pressed='true'] {
		background: white;
		border-color: #bfc3bb;
		font-weight: 700;
	}
	.intent-options button:hover {
		background: #e7e8df;
	}
	.intent-panel {
		padding-top: 22px;
	}
	.intent-panel .callback-panel {
		border: 0;
		padding: 0;
		margin: 0;
	}
	.write-panel {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 25px;
	}
	.write-panel > div {
		display: flex;
		gap: 24px;
		align-items: center;
	}
	.write-panel a {
		font-size: 20px;
		font-weight: 700;
	}
	.write-panel p {
		margin: 0;
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
	a:focus-visible,
	button:focus-visible,
	input:focus-visible,
	summary:focus-visible,
	select:focus-visible {
		outline: 2px solid #1d2024;
		outline-offset: 4px;
	}
	@media (max-width: 1440px) {
		.comparison {
			margin-inline: var(--design-gutter);
		}
	}
	@media (max-width: 800px) {
		.comparison {
			flex-direction: column;
			align-items: flex-start;
			gap: 8px;
		}
		.contact-line,
		.newsletter-line,
		.combined-heading,
		.write-panel {
			flex-direction: column;
			align-items: stretch;
			gap: 20px;
		}
		.contact-actions {
			justify-content: flex-start;
		}
		.signup-controls {
			flex-basis: auto;
		}
		.newsletter-meta {
			justify-content: flex-start;
			flex-wrap: wrap;
			gap: 10px;
		}
		.callback-form {
			grid-template-columns: 1fr;
		}
		.combined-heading {
			gap: 14px;
		}
		.intent-options {
			flex-wrap: wrap;
			gap: 4px;
		}
		.intent-options button {
			padding: 10px;
			font-size: 12px;
		}
		.write-panel > div {
			flex-wrap: wrap;
			gap: 12px 24px;
		}
		h2 {
			font-size: 21px;
		}
		.newsletter-result {
			align-items: flex-start;
			flex-direction: column;
			gap: 12px;
		}
	}
	@media (max-width: 380px) {
		.contact-actions {
			gap: 12px;
		}
		.outline-button {
			gap: 12px;
			padding-inline: 12px;
		}
		.signup-controls {
			flex-wrap: wrap;
		}
		.signup-controls .solid-button {
			width: 100%;
		}
	}
</style>
