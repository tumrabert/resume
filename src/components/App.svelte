<script lang="ts">
	import { onMount } from 'svelte';
	import type { IProfileResp } from '../types';
	//import Hideable from './Hideable.svelte';
	import Intro from './Intro.svelte';
	import Kofi from './Kofi.svelte';
	import Work from './Work.svelte';

	let profile: IProfileResp;

	$: dataLink = `${sourceLink}/blob/main/static/data/profile.json`;
	$: ({
		intro = {} as IProfileResp['intro'],
		projects = [],
		certificates = [],
		technologies = [],
		workExperiences = [],
		educations = [],
		interests = [],
		resumeUrl: { sourceLink = '', fullVersionLink = '' } = {}
	} = profile || {});

	onMount(async () => (profile = await fetchResumeProfile()));

	async function fetchResumeProfile() {
		const resp = await fetch('/data/profile.json');
		return await resp.json();
	}
</script>

<!-- Remove this is you does not want Kofi widget on your site -->
<!-- {#if intro.github == 'narze'}
	<Kofi name={intro.github} />
{/if} -->

<header class="web-only text-center p-4 sm:p-6 bg-ferrari text-white w-screen">
	<h1 class="text-4xl">Resumette</h1>
	<h3>
		<button on:click={() => window.print()} class="underline text-lg">[Print]</button>
	</h3>
	<p>
		Printer-friendly standard résumé, any HTML tags with <code>web-only</code> CSS class will be hidden
		on print.
	</p>
	<p>You can click at any sections or lines hide some information before printing.</p>
	<a href={sourceLink} target="_blank" rel="noopener">[Source Original Repository]</a>
	<!-- <a href={dataLink} target="_blank" rel="noopener">[Data]</a> -->
</header>

<main class="text-center p-4 m-0 md:m-8 xl:mx-auto max-w-screen-xl">
	<Intro {...intro} />
	<!-- Technologies and Languages -->
	<section> 
		
			<h2 class="text-2xl print:text-4xl uppercase text-left">Technologies and Languages</h2>
			<hr />
			<ul class="text-left list-disc pl-8">
				{#each technologies as tech}
					
						<li>
							<span class="w-28 inline-block">{tech.section}</span>
							<span>{tech.details.join(', ')}</span>
						</li>
					
				{/each}
			</ul>
		
	</section>
	<!-- Education -->
	<section>
		
			<h2 class="text-2xl print:text-4xl uppercase text-left">Education</h2>
			<hr />

			<ul class="text-left list-disc pl-8">
				{#each educations as edu}
					
						<li>
							<div class="flex mb-2 font-bold print:mb-1">
								<div class="flex-1 text-left">{edu.head}</div>
								<div class="flex-1 text-right">{edu.years.join('-')}</div>
							</div>
							{edu.details}, GPAX: {edu.GPA}
						</li>
					
				{/each}
			</ul>
		
	</section>
	<!-- Work Experience -->
	<section>
		
			<h2 class="text-2xl print:text-4xl uppercase text-left">Work Experience</h2>
			<hr />

			{#each workExperiences as exp}
				<Work {...exp} />
			{/each}
		
	</section>
	<!-- Projects -->
	<section>
		
			<h2 class="text-2xl print:text-4xl uppercase text-left">Projects</h2>
			<hr />

			<ul class="text-left list-disc pl-8">
				{#each projects as project}
					
						<li>
							<strong>{project.name}</strong>

							{#if project.url !== ''}
								- <a
									href="https://{project.url}"
									target="_blank"
									rel="noreferrer"
									style="margin-right: 20px;"><strong>{project.url}</strong></a
								>
							{/if}
							<br />

							{#each project.details as detail}
								<li style="margin-left: 20px;">{detail}</li>
							{/each}
						</li>
					
				{/each}
			</ul>
		
	</section>
	<!-- Certifications -->
	<section>
		
		<h2 class="text-2xl print:text-4xl uppercase text-left">Certificates</h2>
		<hr />

		<ul class="text-left list-disc pl-8">
			{#each certificates as certificate}
				
					
						<strong>{certificate.title}</strong>

						{#if certificate.url !== ''}
							- <a
								href="{certificate.url}"
								target="_blank"
								rel="noreferrer"
								style="margin-right: 20px;"><strong>{certificate.url}</strong></a
							>
						{/if}
						<br />

						
							<li style="margin-left: 20px;">{certificate.description}</li>
						
					
				
			{/each}
		</ul>
	
</section>
	<!-- Interests -->
	<section>
		
			<h2 class="text-2xl print:text-4xl uppercase text-left">Interests</h2>
			<hr />

			<ul class="text-left list-disc pl-8">
				{#each interests as interest}
					
						<li>
							{interest.title}: {interest.details.join(', ')}
						</li>
					
				{/each}
			</ul>
		
	</section>

	<footer class="print-only">
		(See lasted update version of my resume : <a href={fullVersionLink} target="_blank" >Click Here!</a>)

	</footer>
</main>

<style lang="postcss">
	main {
		overflow-x: hidden;
	}

	a {
		text-decoration: underline;
	}

	section {
		@apply my-4;
	}

	section h2 {
		@apply font-semibold;
	}

	section hr {
		@apply mt-0 mb-2;
		border-color: darkgrey;
	}

	:global(.print-only) {
		display: none;
	}

	@media print {
		* {
			@apply text-xs;
		}

		:global(.print-only) {
			display: inherit;
		}

		:global(.web-only) {
			display: none;
		}

		ul {
			@apply pl-6;
		}

		section {
			@apply my-2;
		}

		section hr {
			@apply mt-0 mb-1;
		}

		main {
			margin: 0 0;
			padding: 0;
		}
	}
</style>
