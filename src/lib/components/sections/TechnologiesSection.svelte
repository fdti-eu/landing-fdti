<script lang="ts">
	import SectionHeading from '#lib/components/SectionHeading.svelte';
	import TechnoItem from './TechnoItem.svelte';
	import TechnoList from './TechnoList.svelte';
	import type { Lang } from '#lib/data.ts';

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

	interface Props {
		locale?: Lang;
		content: {
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
	}

	let { locale = 'fr', content }: Props = $props();
	const copy = $derived(labels[locale]);

	const technologyList = $derived(content?.technology_category_list || []);

	let openIndex = $state<number | null>(null);

	const DEFAULT_IMG_WIDTH = 140;
	const DEFAULT_IMG_HEIGHT = 56;

	function handleToggle(index: number) {
		openIndex = openIndex === index ? null : index;
	}
</script>

{#if technologyList && content}
	<section class="technologies-section" id="technologies">
		<SectionHeading
			title={content.title || copy.title}
			subtitle={content.subtitle || copy.subtitle}
		/>
		<article class="technologies-grid">
			{#each technologyList as category, index (category)}
				{@const isOpen = openIndex === index}
				<TechnoList
					title={category?.title || ''}
					description={category?.description || ''}
					iconLink={category?.category_icon?.url || ''}
					{isOpen}
					onToggle={() => handleToggle(index)}
				>
					{#if category?.technology_list && category?.technology_list.length}
						{#each category.technology_list as technology (technology)}
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
