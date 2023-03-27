<script lang="ts">
	import type { ActionData } from './$types';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import logo from '$lib/images/logo.svg';

	export let form: ActionData;
	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			if (result.type === 'redirect') {
				await invalidate('supabase:auth');
			} else {
				await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<section>
	<div class="logo-container">
		<div class="logo">
			<img src={logo} alt="Tvirtovės Parkas" />
		</div>
	</div>
	<div class="form-container flex1">
		<h1 class="title">Prisijungti</h1>
		{#if form?.error}
			<div class="block notification is-danger">{form.error}</div>
		{/if}
		<form method="post" use:enhance={handleSubmit}>
			<div class="field">
				<label for="email" class="label">El. paštas</label>
				<p class="control">
					<input
						name="email"
						value={form?.values?.email ?? ''}
						type="email"
						placeholder="El. paštas"
					/>
				</p>
			</div>
			<div class="field">
				<label for="password" class="label">Password</label>
				<p class="control">
					<input
						id="password"
						name="password"
						class="input"
						type="password"
						placeholder="Password"
						required
					/>
				</p>
			</div>
			<div class="field">
				<p class="control">
					<button disabled={loading} class="button is-fullwidth is-link">Sign in</button>
				</p>
			</div>
		</form>
	</div>
</section>

<style>
	section {
		position: relative;
		display: inline-block;
		flex-direction: column;
		justify-content: flex-start;
		height: 100%;
		gap: 3rem;
	}

	.form-container {
		width: 480px;
		flex-grow: 1;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-size: 1.5rem;
	}

	input {
		width: 100%;
		box-sizing: border-box;
		padding: 0.5rem 1rem;
		border: 1px solid #d8d8d8;
		border-radius: 0.25rem;
		font-size: 1.2rem;
		font-family: var(--font-body);
	}

	input:focus {
		outline: none;
		border: 1px solid var(--color-theme-1);
	}

	.field {
		width: 100%;
	}

	.logo-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.flex1 {
		flex-grow: 1;
		flex-basis: 0;
	}

	.logo {
		display: flex;
		align-items: center;
		height: 8rem;
		width: 8em;
		margin-top: 4rem;
	}

	.logo img {
		width: 100%;
		height: 100%;
	}

	@media (max-width: 520px) {
		.form-container {
			width: 90vw;
		}

		.logo {
			height: 10rem;
			width: 10em;
		}
	}
</style>
