<script>
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';

	let error = '';
	let loading = false;

	let email = '';
	let password = '';

	async function onSubmit() {
		if (!email || !password) {
			error = 'Please fill out all fields.';
			return;
		}
		loading = true;
		try {
			const authResult = await pb.collection('users').authWithPassword(email, password);
			console.log('### [Authenticated user]', authResult);
			await goto('/home');
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
	<div class="flex w-full flex-col items-center gap-8 p-4 lg:max-w-screen-md lg:flex-row">
		<div class="card bg-base-300 w-full max-w-sm shadow-2xl">
			<form on:submit|preventDefault={onSubmit} class="card-body">
				<h1 class="card-title">Sign in to your account</h1>
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
				<div class="form-control">
					<label class="label" for="password">
						<span class="label-text">Password</span>
					</label>
					<input
						bind:value={password}
						id="password"
						type="password"
						placeholder="password"
						class="input input-bordered"
						required
					/>
					<label class="label" for="forgot-password">
						<a id="forgot-password" class="link-hover link label-text-alt" href="/reset-password"
							>Forgot password?</a
						>
					</label>
				</div>
				<div class="form-control mt-6">
					<button class="btn btn-primary">
						{#if loading}
							<div class="loading loading-spinner" />
						{:else}
							Sign in
						{/if}
					</button>
					{#if error}
						<p class="text-error text-center pt-4">{error}</p>
					{/if}
				</div>
			</form>
		</div>
		<div class="text-center font-semibold sm:text-lg lg:text-right">
			<p>Don't have an account yet?</p>
			<a href="/create-account" class="link-hover link link-secondary">Click here to create one.</a>
		</div>
	</div>
</div>
