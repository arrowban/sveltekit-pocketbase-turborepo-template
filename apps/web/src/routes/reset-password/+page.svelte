<script>
	import { goto } from '$app/navigation';
	import Check from '$lib/icons/Check.svelte';
	import { pb } from '$lib/pocketbase';

	let error = '';
	let loading = false;

	let email = '';
	let success = false;

	async function onSubmit() {
		if (!email) {
			error = 'Please fill out all fields.';
			return;
		}
		loading = true;
		try {
			success = await pb.collection('users').requestPasswordReset(email);
			if (!success) {
				error = 'Failed to send password reset email.';
			}
		} catch (err) {
			error = /** @type {Error} */ (err).message;
		}
		loading = false;
	}
</script>

<a href="/" class="absolute w-full p-2 text-center text-lg font-bold"
	>SvelteKit, Pocketbase, Turborepo Template</a
>
<div class="flex min-h-screen w-full items-center justify-center">
	<div
		class="flex w-full flex-col items-center justify-center gap-8 p-4 lg:max-w-screen-md lg:flex-row-reverse"
	>
		<div class="card bg-base-300 w-full max-w-sm shadow-2xl">
			<form on:submit|preventDefault={onSubmit} class="card-body">
				<h1 class="card-title">
					{#if success}Reset password email sent!{:else}Reset your password{/if}
				</h1>
				{#if !success}
					<div class="form-control">
						<label class="label" for="email">
							<span class="label-text">Email</span>
						</label>
						<input
							bind:value={email}
							id="email"
							type="email"
							placeholder="email"
							class="input input-bordered"
							required
						/>
					</div>
				{/if}
				<div class="form-control mt-6 gap-4">
					<button on:click={success ? () => goto('/sign-in') : undefined} class="btn btn-primary">
						{#if loading}
							<div class="loading loading-spinner" />
						{:else if success}
							<Check />
						{:else}
							Request password reset
						{/if}
					</button>
					{#if error}
						<p class="text-error text-center">{error}</p>
					{/if}
				</div>
			</form>
		</div>
		<div class="text-center font-semibold sm:text-lg lg:text-right">
			<p>Remember your password?</p>
			<a href="/sign-in" class="link-hover link link-secondary">Click here to sign in.</a>
		</div>
	</div>
</div>
