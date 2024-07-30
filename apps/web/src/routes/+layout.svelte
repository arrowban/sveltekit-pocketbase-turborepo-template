<script>
	import { pb } from '$lib/pocketbase';
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import '../app.css';

	const token = writable(pb.authStore.token);
	const user = writable(pb.authStore.model);

	onMount(() => {
		const unsubscribe = pb.authStore.onChange((newToken, model) => {
			console.log(`### [/+layout.svelte:onChange]:`, { model, newToken });
			token.set(newToken);
			user.set(model);
			if (model) {
				localStorage.setItem('hasSignedIn', 'true');
			}
		}, true);
		return () => {
			unsubscribe();
		};
	});

	setContext('token', token);
	setContext('user', user);
</script>

<slot />
