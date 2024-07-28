<script>
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';

	async function signOut() {
		pb.authStore.clear();
		await goto('/sign-in');
	}
</script>

<button on:click={signOut}>Sign out</button>
