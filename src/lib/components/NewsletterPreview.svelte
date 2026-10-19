<script lang="ts">
	let email = '';
	let time = '08:30';
	let submitted = false;
	let consent = false;

	function previewSubscription(event: SubmitEvent) {
		event.preventDefault();
		submitted = true;
	}
</script>

<section id="radar" class="radar" aria-labelledby="radar-title">
	<div class="radar-shell">
		<div class="radar-heading">
			<p class="radar-kicker"><span></span> LE RADAR FDTI / CHAQUE SEMAINE</p>
			<h2 id="radar-title">La tech avance vite.<br />Gardez <em>l’essentiel.</em></h2>
			<p class="radar-description">
				Quatre actualités IA et tech qui valent votre attention. Ce qui change, pourquoi c’est utile
				et les sources pour creuser. Dans votre boîte mail, une fois par semaine.
			</p>
			<div class="radar-promises">
				<span>4 sujets sélectionnés</span><span>5 minutes de lecture</span><span>Gratuit</span>
			</div>
			<details class="radar-editorial">
				<summary>Qu’est-ce qu’on y trouve ? <span aria-hidden="true">↗</span></summary>
				<p>
					Des agents IA à essayer, des modèles à connaître, des outils et des usages concrets. Pour
					chaque sujet : un résumé, son intérêt pratique et un lien vers la source. Pas une
					avalanche de liens.
				</p>
			</details>
		</div>
		<div class="radar-subscription">
			<div class="radar-card-heading">
				<span>VOTRE RENDEZ-VOUS TECH</span><span aria-hidden="true">↗</span>
			</div>
			{#if submitted}
				<div class="radar-result" role="status">
					<p class="radar-kicker">APERÇU DU PARCOURS</p>
					<h3>Et ensuite ?<br />On confirme votre email.</h3>
					<p>
						Dans la version finale, un lien de confirmation sera envoyé à <strong>{email}</strong>.
						Après confirmation : le mardi à {time.replace(':', ' h ')} (heure de Paris).
					</p>
					<p class="radar-demo-note">
						Ceci est une maquette : aucune adresse enregistrée, aucun email envoyé.
					</p>
					<button class="radar-reset" type="button" onclick={() => (submitted = false)}
						>Revenir au formulaire ←</button
					>
				</div>
			{:else}
				<h3>Un peu de recul.<br />Directement dans votre boîte.</h3>
				<form onsubmit={previewSubscription}>
					<label for="radar-email">Votre adresse email</label>
					<input
						id="radar-email"
						name="email"
						type="email"
						autocomplete="email"
						placeholder="vous@entreprise.fr"
						bind:value={email}
						required
						maxlength="254"
					/>
					<div class="radar-delivery"><span>Chaque mardi</span><span>Europe/Paris</span></div>
					<details class="radar-time">
						<summary
							>À {time.replace(':', ' h ')} · Modifier l’heure
							<span aria-hidden="true">⌄</span></summary
						>
						<label for="radar-time">Votre heure préférée</label>
						<select id="radar-time" name="time" bind:value={time}>
							<option value="07:00">7 h — Avant de commencer</option>
							<option value="08:30">8 h 30 — Le café du matin</option>
							<option value="12:30">12 h 30 — La pause déjeuner</option>
							<option value="18:00">18 h — En fin de journée</option>
						</select>
					</details>
					<label class="radar-consent"
						><input type="checkbox" bind:checked={consent} required /><span
							>Je souhaite recevoir Le Radar FDTI par email. Je peux me désinscrire à tout moment.</span
						></label
					>
					<button class="radar-submit" type="submit"
						>Recevoir le Radar <span aria-hidden="true">→</span></button
					>
					<p class="radar-privacy">
						Un email par semaine. Désinscription en un clic.<br /><a href="/confidentialite"
							>Comment vos données seront utilisées</a
						>
					</p>
				</form>
			{/if}
			<div class="radar-preview-label">MAQUETTE INTERACTIVE · AUCUN ENVOI</div>
		</div>
	</div>
</section>

<style>
	.radar {
		background: #f5f4ee;
		color: var(--color-dark-grey);
		padding: 90px var(--design-gutter);
		border-top: 1px solid #d9d9cf;
	}
	.radar-shell {
		max-width: var(--design-width);
		margin: auto;
		display: grid;
		grid-template-columns: 1.15fr 1fr;
		gap: clamp(40px, 7vw, 110px);
		align-items: center;
	}
	.radar-kicker {
		font-size: 11px;
		letter-spacing: 0.13em;
		font-weight: 700;
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.radar-kicker > span {
		height: 7px;
		width: 7px;
		background: var(--color-yellow);
		border: 1px solid #b19c35;
		border-radius: 50%;
	}
	h2 {
		font-size: clamp(36px, 4.1vw, 58px);
		line-height: 1.09;
		letter-spacing: -0.045em;
		font-weight: 700;
		margin: 26px 0;
		text-align: left;
	}
	em {
		font-style: normal;
		background: linear-gradient(transparent 65%, var(--color-yellow) 65%);
	}
	.radar-description {
		color: #565c61;
		font-size: 17px;
		line-height: 1.8;
		max-width: 510px;
	}
	.radar-promises {
		display: flex;
		flex-wrap: wrap;
		gap: 12px 20px;
		font-size: 12px;
		margin-top: 27px;
		font-weight: 700;
	}
	.radar-promises span + span::before {
		content: '/';
		color: #878b83;
		margin-right: 20px;
	}
	.radar-editorial {
		margin-top: 38px;
		border-top: 1px solid #d0d2c9;
		padding-top: 18px;
		max-width: 510px;
	}
	summary {
		cursor: pointer;
		font-size: 14px;
		list-style: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary > span {
		float: right;
	}
	.radar-editorial p {
		color: #565c61;
		font-size: 14px;
		line-height: 1.7;
		margin-top: 16px;
	}
	.radar-subscription {
		background: white;
		border: 1px solid #d4d6ce;
		padding: clamp(25px, 3vw, 40px);
		box-shadow: 8px 8px 0 #e7e7dc;
	}
	.radar-card-heading {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 10px;
		letter-spacing: 0.12em;
		color: #62686c;
		border-bottom: 1px solid #e0e2da;
		padding-bottom: 18px;
	}
	.radar-card-heading > span:last-child {
		color: var(--color-dark-grey);
		font-size: 22px;
	}
	h3 {
		font-size: 28px;
		line-height: 1.2;
		font-weight: 700;
		letter-spacing: -0.025em;
		margin: 25px 0;
	}
	form > label,
	.radar-time label {
		display: block;
		font-size: 13px;
		font-weight: 700;
		margin-bottom: 9px;
	}
	input[type='email'],
	select {
		box-sizing: border-box;
		display: block;
		width: 100%;
		min-height: 52px;
		padding: 13px 15px;
		border: 1px solid #aeb3b1;
		border-radius: 2px;
		background: white;
		color: var(--color-dark-grey);
		font: inherit;
		font-size: 16px;
	}
	input:focus-visible,
	select:focus-visible,
	summary:focus-visible {
		outline: 2px solid var(--color-dark-grey);
		outline-offset: 4px;
	}
	.radar-delivery {
		display: flex;
		justify-content: space-between;
		font-size: 13px;
		margin: 23px 0 10px;
		font-weight: 700;
	}
	.radar-delivery > span:last-child {
		color: #747a7d;
		font-size: 11px;
		font-weight: 400;
	}
	.radar-time {
		padding: 13px 0;
		border-top: 1px solid #e0e2da;
		border-bottom: 1px solid #e0e2da;
	}
	.radar-time summary {
		font-size: 13px;
	}
	.radar-time label {
		margin-top: 18px;
	}
	form > .radar-consent {
		display: flex;
		gap: 10px;
		align-items: flex-start;
		font-size: 11px;
		font-weight: 400;
		line-height: 1.6;
		margin: 22px 0;
	}
	.radar-consent input {
		flex-shrink: 0;
		width: 16px;
		height: 16px;
		margin-top: 2px;
		accent-color: var(--color-dark-grey);
	}
	.radar-submit {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		background: var(--color-yellow);
		color: var(--color-dark-grey);
		padding: 17px 20px;
		font-size: 15px;
		font-weight: 700;
		border: 1px solid transparent;
		border-radius: 2px;
	}
	.radar-submit:hover {
		border-color: var(--color-dark-grey);
	}
	.radar-submit span {
		font-size: 23px;
		line-height: 1;
	}
	.radar-privacy {
		font-size: 10px;
		text-align: center;
		line-height: 1.8;
		color: #62686c;
		margin-top: 15px;
	}
	.radar-privacy a {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.radar-preview-label {
		margin-top: 24px;
		font-size: 9px;
		letter-spacing: 0.1em;
		color: #747a7d;
		text-align: center;
	}
	.radar-result {
		padding-block: 20px;
	}
	.radar-result p:not(.radar-kicker) {
		font-size: 14px;
		line-height: 1.7;
		overflow-wrap: anywhere;
	}
	.radar-demo-note {
		margin-top: 20px;
		background: #f5f4ee;
		padding: 15px;
	}
	.radar-reset {
		font-size: 13px;
		text-decoration: underline;
		margin-top: 25px;
	}
	@media (max-width: 800px) {
		.radar {
			padding-block: 60px;
		}
		.radar-shell {
			grid-template-columns: 1fr;
			gap: 35px;
		}
		h2 {
			font-size: 40px;
		}
		.radar-description,
		.radar-editorial {
			max-width: none;
		}
	}
	@media (max-width: 420px) {
		h2 {
			font-size: 34px;
		}
		.radar-promises {
			gap: 10px;
			font-size: 10px;
		}
		.radar-promises span + span::before {
			margin-right: 10px;
		}
		h3 {
			font-size: 25px;
		}
	}
</style>
