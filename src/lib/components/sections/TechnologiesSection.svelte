<script lang="ts">
	import TechnoItem from './TechnoItem.svelte';
	import TechnoList from './TechnoList.svelte';
	import type { Lang } from '$lib/data';

	export let locale: Lang = 'fr';
	const labels: Record<Lang, { title: string; subtitle: string; documentation: string }> = {
		fr: {
			title: 'Technologies',
			subtitle:
				'Nous utilisons des outils modernes adaptés à chaque situation rencontrée lors du traitement de vos données',
			documentation: 'Lien vers la documentation'
		},
		en: {
			title: 'Technologies',
			subtitle:
				'We use modern tools suited to every situation encountered when processing your data',
			documentation: 'Link to the documentation'
		},
		es: {
			title: 'Tecnologías',
			subtitle:
				'Utilizamos herramientas modernas adaptadas a cada situación que surge al tratar sus datos',
			documentation: 'Enlace a la documentación'
		},
		de: {
			title: 'Technologien',
			subtitle:
				'Wir setzen moderne Werkzeuge ein, die auf die jeweilige Aufgabe bei der Verarbeitung Ihrer Daten abgestimmt sind',
			documentation: 'Link zur Dokumentation'
		},
		it: {
			title: 'Tecnologie',
			subtitle:
				'Utilizziamo strumenti moderni, scelti in base alle esigenze specifiche di elaborazione dei vostri dati',
			documentation: 'Link alla documentazione'
		}
	};
	$: copy = labels[locale];

	export let content: {
		status?: string | null;
		title?: string | null;
		subtitle?: string | null;
		technology_category_list?: {
			title?: string | null;
			description?: string | null;
			category_icon?: { url?: string | null } | null;
			technology_list?: {
				name?: string | null;
				url?: string | null;
				img?: { url?: string | null; width?: number | null; height?: number | null } | null;
			}[];
		}[];
	} | null;

	$: technologyList = content?.technology_category_list || [];

	let openIndex: number | null = null;

	const DEFAULT_IMG_WIDTH = 140;
	const DEFAULT_IMG_HEIGHT = 56;

	function handleToggle(index: number) {
		openIndex = openIndex === index ? null : index;
	}
</script>

{#if technologyList && content}
	<section class="technologies-section" id="technologies">
		<div class="section-heading">
			<div class="group">
				<h2 class="text-3xl font-bold text-center md:text-4xl">
					{content.title || copy.title}
				</h2>
			</div>
			<h3 class="text-xl font-bold text-center sm:text-2xl md:text-3xl lg:text-4xl">
				{content.subtitle || copy.subtitle}
			</h3>
		</div>
		<article class="technologies-grid">
			{#each technologyList as category, index}
				{@const isOpen = openIndex === index}
				<TechnoList
					title={category?.title || ''}
					description={category?.description || ''}
					iconLink={category?.category_icon?.url || ''}
					{isOpen}
					onToggle={() => handleToggle(index)}
				>
					{#if category?.technology_list && category?.technology_list.length}
						{#each category.technology_list as technology}
							<TechnoItem
								link={technology?.url || ''}
								imgUrl={technology?.img?.url || null}
								imgWidth={technology?.img?.width ?? DEFAULT_IMG_WIDTH}
								imgHeight={technology?.img?.height ?? DEFAULT_IMG_HEIGHT}
								ariaLabel={technology?.name
									? `${copy.documentation}: ${technology.name}.`
									: `${copy.documentation}.`}
								name={technology?.name}
							/>
						{/each}
					{/if}
				</TechnoList>
			{/each}
		</article>
	</section>
{/if}
