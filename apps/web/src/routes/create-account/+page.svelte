<script>
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';

	let error = '';
	let loading = false;

	let email = '';
	let password = '';
	let passwordConfirm = '';

	async function onSubmit() {
		if (!email || !password || !passwordConfirm) {
			error = 'Please fill out all fields.';
			return;
		}
		if (password.length < 8 || passwordConfirm.length > 72) {
			error = 'Password must be between 8 and 72 characters.';
			return;
		}
		if (password !== passwordConfirm) {
			error = 'Passwords do not match.';
			return;
		}
		loading = true;
		try {
			const res = await fetch(`/api/create-account`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password, passwordConfirm })
			});
			const resJson = await res.json();
			if (!res.ok) {
				throw new Error(resJson.error);
			}
			console.log('### [Created new user]:', resJson.data);
			const authResult = await pb.collection('users').authWithPassword(email, password);
			console.log('### [Authenticated user]:', authResult);
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
	<div
		class="flex w-full flex-col items-center justify-center gap-8 p-4 lg:max-w-screen-md lg:flex-row-reverse"
	>
		<div class="card bg-base-300 w-full max-w-sm shadow-2xl">
			<form on:submit|preventDefault={onSubmit} class="card-body">
				<h1 class="card-title">Create your account</h1>
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
				</div>
				<div class="form-control">
					<label class="label" for="confirm-password">
						<span class="label-text">Confirm password</span>
					</label>
					<input
						bind:value={passwordConfirm}
						id="confirm-password"
						type="password"
						placeholder="confirm password"
						class="input input-bordered"
						required
					/>
				</div>
				<div class="form-control mt-6 gap-4">
					<button class="btn btn-primary">
						{#if loading}
							<div class="loading loading-spinner" />
						{:else}
							Create account
						{/if}
					</button>
					{#if error}
						<p class="text-error text-center pt-4">{error}</p>
					{/if}
				</div>
			</form>
		</div>
		<div class="text-center font-semibold sm:text-lg lg:text-right">
			<p>Already have an account?</p>
			<a href="/sign-in" class="link-hover link link-secondary">Click here to sign in.</a>
		</div>
	</div>
</div>
