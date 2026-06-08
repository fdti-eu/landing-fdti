<script>
	import { locale } from 'svelte-i18n';
</script>

<section class="relative py-16 md:py-24 overflow-hidden">
	<div class="max-w-screen-wrap mx-auto px-3 wrap:px-5">
		<div class="flex flex-col gap-10">
			<div
				class="w-40 h-40 rounded-full bg-yellow/40 flex justify-center items-center mx-auto border-4 border-white p-5"
			>
				<img src="/images/icon-404.svg" class="" alt="404" title="404" />
			</div>
		</div>

		<div class="max-w-screen-mv mx-auto pt-10">
			<div class="flex gap-5 items-center justify-center">
				<h2 class="text-6xl sm:text-7xl text-center">Ooops...</h2>
				<img src="/images/sad-smile.svg" alt="sad smile" title="sad smile" class="w-16" />
			</div>
			<div class="flex justify-center my-2 relative h-4">
				<span class="bg-yellow h-2 w-18 absolute top-1/2 -translate-y-1/2 z-10"></span>
				<span class="bg-black h-px absolute inset-x-0 top-1/2 -translate-y-1/2"></span>
			</div>
		</div>
		<p class="text-2xl xl:text-3xl text-center pt-7 max-w-sm mx-auto">
			{$locale === 'en'
				? 'The page you are looking for does not exist'
				: "La page que vous cherchez n'existe pas"}
		</p>

		<div class="pt-4 flex justify-center">
			<a
				href="/"
				type="submit"
				class="inline-flex items-center justify-center px-8 py-2 border border-transparent text-base font-bold rounded-full text-white bg-darkGrey hover:bg-white hover:text-darkGrey hover:border-darkGrey transition-all ease-in-out duration-300 gap-4"
				><span>{$locale === 'en' ? 'Back to home' : "Retour à la page d'accueil"}</span><svg
					class="w-4"
					viewBox="0 0 13 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M6.69533 0.862397C6.82035 0.737416 6.98989 0.667206 7.16667 0.667206C7.34344 0.667206 7.51298 0.737416 7.638 0.862397L12.3047 5.52906C12.4296 5.65408 12.4999 5.82362 12.4999 6.0004C12.4999 6.17717 12.4296 6.34671 12.3047 6.47173L7.638 11.1384C7.51227 11.2598 7.34386 11.327 7.16907 11.3255C6.99427 11.324 6.82706 11.2539 6.70345 11.1303C6.57985 11.0067 6.50974 10.8395 6.50822 10.6647C6.5067 10.4899 6.57389 10.3215 6.69533 10.1957L10.224 6.66706H1.16667C0.989856 6.66706 0.820286 6.59683 0.695262 6.4718C0.570238 6.34678 0.5 6.17721 0.5 6.0004C0.5 5.82359 0.570238 5.65402 0.695262 5.52899C0.820286 5.40397 0.989856 5.33373 1.16667 5.33373H10.224L6.69533 1.80506C6.57035 1.68004 6.50014 1.51051 6.50014 1.33373C6.50014 1.15695 6.57035 0.987415 6.69533 0.862397Z"
						fill="currentColor"
					/></svg
				></a
			>
		</div>
	</div>
</section>
