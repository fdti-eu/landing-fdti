import { writable } from 'svelte/store';

export let is_on_view_port_accueil = writable(false);
export let is_on_view_port_fdti = writable(false);
export let is_on_view_port_partenaires = writable(false);
export let is_on_view_port_contact = writable(false);
export let is_on_view_port_expertise = writable(false);

export let selected_departement = writable(null);
export let selected_chiffres_affaires = writable(null);
export let selected_nombre_employees = writable(null);
export let selected_secteur = writable(null);
export let selected_nombre_clients = writable(null);
export let selected_processus = writable(null);
export let selected_own_data = writable(null);
export let selected_utilisation = writable(null);
export let selected_identification = writable(null);
export let selected_difficulte = writable(null);
export let selected_impact = writable(null);
export let selected_niveau = writable(null);
export let selected_aide_data = writable(null);
export let selected_strategie = writable(null);
export let selected_profit_data = writable(null);
export let selected_responsable_data = writable(null);
export let selected_equipe_data = writable(null);

// import { _, locale, getLocaleFromNavigator } from 'svelte-i18n';
// import { browser } from '$app/env';

// export let localeStored;

// if (browser) {
// 	localeStored = writable(localStorage.content || 'fr');
// 	// Anytime the store changes, update the local storage value.
// 	locale.subscribe((value) => (localStorage.content = value));
// }
