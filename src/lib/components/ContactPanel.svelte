<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { page } from '$app/stores';
	import { _, locale } from 'svelte-i18n';
	import { resolveContactEndpoint } from '$lib/contact';
	import { isSupportedLocale } from '$lib/data';

	type SubmissionState = 'idle' | 'pending' | 'success' | 'error';

	let contactInput: HTMLInputElement;
	let successMessage: HTMLParagraphElement;
	let contact = '';
	let note = '';
	let website = '';
	let fieldError = '';
	let state: SubmissionState = 'idle';
	let requestId = '';
	let submissionController: AbortController | null = null;
	let copyResetTimer: number | null = null;
	let emailCopied = false;
	let pagePath = '/';

	$: currentLocale = isSupportedLocale($locale) ? $locale : 'fr';
	$: pagePath = $page.url.pathname;

	function track(event: string) {
		if (typeof window === 'undefined') return;
		const umami = (window as Window & { umami?: { track: (name: string, data?: object) => void } })
			.umami;
		umami?.track(event, { placement: 'contact_section', locale: currentLocale, path: pagePath });
	}

	function isValidContact(value: string) {
		if (value.includes('@')) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
		const digits = value.replace(/\D/g, '');
		return /^\+?[\d\s().-]+$/.test(value) && digits.length >= 7 && digits.length <= 15;
	}

	function createRequestId() {
		if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
		const bytes = crypto.getRandomValues(new Uint8Array(16));
		bytes[6] = (bytes[6] & 0x0f) | 0x40;
		bytes[8] = (bytes[8] & 0x3f) | 0x80;
		const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
		return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
	}

	async function submit() {
		if (state === 'pending') return;
		const normalizedContact = contact.trim();
		fieldError = '';
		if (!isValidContact(normalizedContact)) {
			fieldError = $_('contact_panel.validation');
			contactInput.focus();
			return;
		}

		const controller = new AbortController();
		const timeout = window.setTimeout(() => controller.abort(), 8000);
		submissionController = controller;
		state = 'pending';
		try {
			requestId ||= createRequestId();
			const response = await fetch(resolveContactEndpoint(window.location.hostname), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				signal: controller.signal,
				body: JSON.stringify({
					contact: normalizedContact,
					note: note.trim(),
					website,
					page: pagePath,
					locale: currentLocale,
					request_id: requestId
				})
			});
			if (!response.ok) throw new Error(`Contact request failed with status ${response.status}`);
			state = 'success';
			contact = '';
			note = '';
			requestId = '';
			track('contact_callback_success');
			await tick();
			successMessage.focus();
		} catch {
			state = 'error';
			track('contact_callback_error');
		} finally {
			window.clearTimeout(timeout);
			if (submissionController === controller) submissionController = null;
		}
	}

	function resetRequestId() {
		if (state !== 'pending') requestId = '';
	}

	async function copyEmail() {
		const email = 'info@fdti.eu';
		emailCopied = true;
		if (copyResetTimer !== null) window.clearTimeout(copyResetTimer);
		copyResetTimer = window.setTimeout(() => {
			emailCopied = false;
			copyResetTimer = null;
		}, 5000);
		try {
			await navigator.clipboard.writeText(email);
		} catch {
			const fallback = document.createElement('textarea');
			fallback.value = email;
			fallback.setAttribute('readonly', '');
			fallback.style.position = 'fixed';
			fallback.style.opacity = '0';
			document.body.appendChild(fallback);
			fallback.select();
			document.execCommand('copy');
			fallback.remove();
		}
		track('contact_email_copy');
	}

	onMount(() => {
		return () => {
			submissionController?.abort();
			if (copyResetTimer !== null) window.clearTimeout(copyResetTimer);
		};
	});
</script>

<section id="contact" class="contact-section" aria-labelledby="contact-title">
	<div class="contact-shell">
		<header class="contact-heading">
			<p class="contact-eyebrow">FDTI / Contact</p>
			<h2 id="contact-title">{$_('contact_panel.title')}</h2>
			<p>{$_('contact_panel.promise')}</p>
		</header>

		<div class="contact-grid">
			<div class="contact-email">
				<h3>{$_('contact_panel.write_title')}</h3>
				<button
					class:copied={emailCopied}
					class="contact-email-copy"
					type="button"
					on:click={copyEmail}
					aria-label={`${emailCopied ? $_('contact_panel.copied') : $_('contact_panel.copy_email')} info@fdti.eu`}
				>
					<span>info@fdti.eu</span>
					{#if emailCopied}
						<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>
					{:else}
						<svg viewBox="0 0 24 24" aria-hidden="true"
							><rect x="8" y="8" width="11" height="11" rx="1" /><path d="M16 8V5H5v11h3" /></svg
						>
					{/if}
					<span class="contact-sr-only" aria-live="polite">
						{emailCopied ? $_('contact_panel.copied') : ''}
					</span>
				</button>
				<noscript>
					<style>
						.contact-email-copy,
						.contact-callback {
							display: none !important;
						}
					</style>
					<a href="mailto:info@fdti.eu">info@fdti.eu</a>
				</noscript>
			</div>

			<div class="contact-callback">
				<h3>{$_('contact_panel.callback_title')}</h3>
				{#if state === 'success'}
					<p bind:this={successMessage} class="contact-success" role="status" tabindex="-1">
						{$_('contact_panel.success')}
					</p>
				{:else}
					<form method="post" action="/contact" on:submit|preventDefault={submit} novalidate>
						<label for="contact-value">{$_('contact_panel.contact_label')}</label>
						<input
							bind:this={contactInput}
							bind:value={contact}
							on:input={resetRequestId}
							id="contact-value"
							name="contact"
							type="text"
							required
							disabled={state === 'pending'}
							autocomplete="email"
							maxlength="254"
							placeholder={$_('contact_panel.contact_placeholder')}
							aria-invalid={fieldError ? 'true' : undefined}
							aria-describedby={fieldError ? 'contact-value-error' : undefined}
						/>
						{#if fieldError}<p id="contact-value-error" class="contact-error">{fieldError}</p>{/if}

						<label for="contact-note">{$_('contact_panel.note_label')}</label>
						<textarea
							bind:value={note}
							on:input={resetRequestId}
							id="contact-note"
							name="note"
							rows="2"
							maxlength="1000"
							disabled={state === 'pending'}
						></textarea>

						<div class="contact-honeypot" aria-hidden="true">
							<label for="contact-website">Website</label>
							<input
								bind:value={website}
								id="contact-website"
								name="website"
								type="text"
								disabled={state === 'pending'}
								tabindex="-1"
								autocomplete="off"
							/>
						</div>

						<button
							class="contact-submit"
							type="submit"
							disabled={state === 'pending'}
							data-umami-event="contact_callback_submit"
							data-umami-event-placement="contact_section"
						>
							{state === 'pending' ? $_('contact_panel.pending') : $_('contact_panel.submit')}
						</button>
						<div class="contact-status" aria-live="polite" aria-atomic="true">
							{#if state === 'error'}<p class="contact-error">{$_('contact_panel.error')}</p>{/if}
						</div>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	#contact.contact-section {
		scroll-margin-top: -24px;
		min-height: calc(100svh - 88px);
		background: #f5f4ee;
		padding: 0;
		color: var(--color-dark-grey, #1d2024);
		font-family: var(--font-quattrocento, 'Quattrocento Sans', sans-serif);
	}

	.contact-shell {
		width: min(1080px, calc(100% - 3rem));
		margin: 0 auto;
		padding: clamp(2.5rem, 4vw, 3.5rem) 0;
	}

	.contact-heading,
	.contact-grid {
		display: grid;
		grid-template-columns: minmax(0, 0.8fr) minmax(18rem, 1.2fr);
		column-gap: clamp(2.5rem, 5vw, 3.5rem);
	}

	.contact-heading {
		row-gap: 0.5rem;
		align-items: end;
		padding-bottom: 1.15rem;
		border-bottom: 1px solid #c9c8c2;
	}

	.contact-eyebrow {
		grid-column: 1 / -1;
		margin: 0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.13em;
		text-transform: uppercase;
	}

	.contact-heading h2 {
		margin: 0;
		max-width: 10ch;
		font-size: clamp(2.5rem, 5vw, 3.75rem);
		font-weight: 700;
		letter-spacing: -0.045em;
		line-height: 1;
	}

	.contact-heading > p:last-child {
		max-width: 40rem;
		margin: 0;
		color: #555;
		font-size: 0.92rem;
		line-height: 1.5;
	}

	.contact-grid {
		row-gap: 2.25rem;
		padding-top: clamp(1.5rem, 2.5vw, 2rem);
	}

	.contact-grid h3 {
		margin: 0;
		font-size: clamp(1.3rem, 2vw, 1.6rem);
		font-weight: 700;
	}

	.contact-email-copy {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		margin-top: 0.65rem;
		border: 0;
		background: transparent;
		padding: 0;
		color: var(--color-dark-grey, #1d2024);
		text-align: left;
	}

	.contact-email-copy span {
		font-size: clamp(1rem, 1.6vw, 1.15rem);
		font-weight: 700;
	}

	.contact-email-copy svg {
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
		transition: transform 160ms ease;
	}

	.contact-email-copy:hover,
	.contact-email-copy:focus-visible {
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}

	.contact-email-copy:hover svg,
	.contact-email-copy:focus-visible svg {
		transform: translateY(-1px);
	}

	.contact-email-copy.copied svg {
		stroke: #9a6700;
	}

	form {
		display: grid;
		grid-template-columns: 1fr;
	}

	label {
		margin: 0 0 0.4rem;
		font-weight: 700;
	}

	label:not(:first-child) {
		margin-top: 1rem;
	}

	input,
	textarea {
		width: 100%;
		border: 1px solid #8a8e91;
		border-radius: 3px;
		background: white;
		padding: 0.65rem 0.75rem;
		color: #1d2024;
	}

	input:focus-visible,
	textarea:focus-visible {
		border-color: var(--color-dark-grey, #1d2024);
		outline: none;
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-dark-grey, #1d2024) 18%, transparent);
	}

	textarea {
		resize: vertical;
	}

	.contact-submit {
		min-height: 2.75rem;
		margin-top: 1rem;
		border: 1px solid var(--color-dark-grey, #1d2024);
		border-radius: 3px;
		background: var(--color-dark-grey, #1d2024);
		padding: 0.6rem 0.9rem;
		color: white;
		font-weight: 700;
		transition: 160ms ease;
	}

	.contact-submit:hover:not(:disabled),
	.contact-submit:focus-visible {
		border-color: var(--color-yellow, #f9d089);
		background: var(--color-yellow, #f9d089);
		color: var(--color-dark-grey, #1d2024);
	}

	.contact-submit:disabled {
		cursor: wait;
		opacity: 0.65;
	}

	.contact-email-copy:focus-visible,
	.contact-submit:focus-visible,
	a:focus-visible {
		outline: 2px solid var(--color-dark-grey, #1d2024);
		outline-offset: 3px;
	}

	.contact-status {
		min-height: 1.25rem;
	}

	.contact-error {
		margin: 0.4rem 0 0;
		color: #a21b1b;
		font-size: 0.9rem;
	}

	.contact-success {
		border-left: 4px solid var(--color-yellow, #f9d089);
		background: white;
		padding: 1rem;
		font-weight: 700;
	}

	.contact-honeypot {
		position: absolute;
		left: -10000px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}

	.contact-sr-only {
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

	@media (max-width: 760px) {
		#contact.contact-section {
			scroll-margin-top: -35px;
		}

		.contact-shell {
			width: min(100% - 2rem, 36rem);
			padding: 2.75rem 0;
		}

		.contact-heading,
		.contact-grid {
			grid-template-columns: 1fr;
		}

		.contact-heading {
			gap: 1rem;
		}

		.contact-grid {
			gap: 2.25rem;
		}

		.contact-submit {
			min-height: 3rem;
		}

		input,
		textarea {
			padding: 0.75rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.contact-email-copy,
		.contact-submit {
			transition: none;
		}
	}
</style>
