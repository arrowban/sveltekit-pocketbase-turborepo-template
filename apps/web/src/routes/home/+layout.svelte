<script>
	import { goto } from '$app/navigation';
	import MenuListItems from '$lib/components/MenuListItems.svelte';
	import { getContext, onMount } from 'svelte';

	/** @type {UserStore} */
	const user = getContext('user');

	onMount(() => {
		const unsubscribe = user.subscribe(async (value) => {
			if (!value) {
				await goto('/sign-in');
			}
		});
		return () => {
			unsubscribe();
		};
	});
</script>

{#if $user}
	<div class="drawer">
		<input id="my-drawer" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content min-h-screen flex flex-col">
			<!-- Navbar -->
			<div class="navbar bg-base-300 w-full">
				<div class="flex-none lg:hidden">
					<label for="my-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="inline-block h-6 w-6 stroke-current"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							></path>
						</svg>
					</label>
				</div>
				<div class="flex-1 px-2"><a class="btn btn-ghost" href="/home">Home</a></div>
				<div class="hidden flex-none lg:block">
					<ul class="menu menu-horizontal">
						<!-- Navbar menu content here -->
						<MenuListItems />
					</ul>
				</div>
			</div>
			<!-- Page content here -->
			<slot />
		</div>
		<div class="drawer-side">
			<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
			<ul class="menu bg-base-200 min-h-full w-80 p-4">
				<!-- Sidebar content here -->
				<MenuListItems />
			</ul>
		</div>
	</div>
{/if}
