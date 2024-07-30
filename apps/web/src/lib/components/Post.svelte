<script>
	import Trash from '$lib/icons/Trash.svelte';

	/** @type {PostRecordModel} */
	export let post;
	/** @type {function(): Promise<void>} */
	export let deletePost;
	/** @type {function(): Promise<void>} */
	export let incrementCount;

	/** @type {"idle" | "deleting" | "incrementing"} */
	let state = 'idle';

	async function onClickDeletePost() {
		state = 'deleting';
		await deletePost();
		state = 'idle';
	}

	async function onClickIncrementCount() {
		state = 'incrementing';
		await incrementCount();
		state = 'idle';
	}

	$: deleteDisabled = state === 'deleting';
	$: incrementDisabled = state === 'incrementing';
</script>

<div class="card bg-base-300 w-96 shadow-xl">
	<div class="card-body">
		<h2 class="card-title">Post ID: {post.id}</h2>
		<p>User ID: {post.user}</p>
		{#if post.expand}
			<p>Username: {post.expand.user.username}</p>
		{/if}
		<p>Count: {post.count}</p>
		<div class="card-actions justify-end">
			<button
				on:click={onClickDeletePost}
				class="btn btn-error btn-outline"
				disabled={deleteDisabled}
			>
				<Trash />
			</button>
			<button on:click={onClickIncrementCount} class="btn btn-outline" disabled={incrementDisabled}>
				Increment count
			</button>
		</div>
		<div class="pt-2 text-sm italic">
			<p>Created: {post.created}</p>
			<p>Updated: {post.updated}</p>
		</div>
	</div>
</div>
