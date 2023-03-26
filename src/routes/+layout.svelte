<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import './globals.css';

	export let data: LayoutData;

	$: ({ supabase } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Tvirtovės Parkas - Laisvas Plotas</title>
	<meta name="description" content="Tvirtovės Parkas - Laisvas Plotas - Objektų užsakymo sistema" />
</svelte:head>

<main>
	<slot />
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		/* overflow-y: scroll;
		overflow-x: hidden;

		-ms-overflow-style: none;
		scrollbar-width: none; */
	}

	/* main::-webkit-scrollbar {
		display: none;
	} */

	@media (min-height: 768px) {
		main {
			margin-top: 5rem;
			height: 80vh;
			align-items: center;
		}
	}
</style>
