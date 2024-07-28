<script>
	import { goto } from '$app/navigation';

	async function onClick() {
		let route = '/create-account';
		const hasSignedIn = localStorage.getItem('hasSignedIn') === 'true';
		if (hasSignedIn) {
			route = '/sign-in';
		}
		await goto(route);
	}
</script>

<div class="hero bg-base-200 min-h-screen">
	<div class="hero-content text-center">
		<div class=" max-w-3xl">
			<h1 class="text-5xl font-bold">SvelteKit, Pocketbase, Turborepo Template</h1>
			<p class="py-6">Don't forget to name this thing.</p>
			<button on:click={onClick} class="btn btn-primary">Get Started</button>
		</div>
	</div>
</div>
