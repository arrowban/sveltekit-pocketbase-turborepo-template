<script>
	import Post from '$lib/components/Post.svelte';
	import { createPost } from '$lib/db/create-post';
	import { deletePost } from '$lib/db/delete-post';
	import { getPosts } from '$lib/db/get-posts';
	import { updatePost } from '$lib/db/update-post';
	import { getContext, onMount } from 'svelte';

	/** @type {UserStore} */
	const user = getContext('user');

	/** @type {PostRecordModel[] | null} */
	let data = null;
	let error = '';
	let loading = false;

	async function onClickNewPost() {
		if (!$user) {
			error = 'You must sign in to create a post';
			alert(`Error: ${error}`);
			return;
		}

		error = '';
		loading = true;

		const createPostRes = await createPost({ count: 0, user: $user.id });

		if (createPostRes.error) {
			error = createPostRes.error;
		} else if (createPostRes.data) {
			data = [createPostRes.data, ...(data ?? [])];
		} else {
			error = 'No data';
		}

		if (error) {
			alert(`Error creating new post: ${error}`);
		}

		loading = false;
	}

	/** @param {number} index */
	async function onClickIncrementCount(index) {
		if (!data) {
			error = 'No data';
			alert(`Error incrementing count: ${error}`);
			return;
		}

		error = '';
		const post = data[index];
		const updatePostRes = await updatePost(post.id, { count: post.count + 1 });

		if (updatePostRes.error) {
			error = updatePostRes.error;
		} else if (updatePostRes.data) {
			data = data.map((p, i) => (i === index ? updatePostRes.data : p));
		} else {
			error = 'No data';
		}

		if (error) {
			alert(`Error incrementing count: ${error}`);
		}
	}

	/** @param {number} index */
	async function onClickDeletePost(index) {
		if (!data) {
			error = 'No data';
			alert(`Error deleting post: ${error}`);
			return;
		}

		error = '';
		const post = data[index];
		const deletePostRes = await deletePost(post.id);

		if (deletePostRes.error) {
			error = deletePostRes.error;
		} else {
			data = data.filter((_, i) => i !== index);
		}

		if (error) {
			alert(`Error deleting post: ${error}`);
		}
	}

	onMount(async () => {
		const getPostsRes = await getPosts();

		if (getPostsRes.error) {
			error = getPostsRes.error;
		} else if (getPostsRes.data) {
			data = getPostsRes.data;
		} else {
			error = 'No data';
		}

		if (error) {
			alert(`Error getting posts: ${error}`);
		}
	});
</script>

<main class="flex flex-col items-center gap-4 h-full p-4">
	<h1 class="text-xl">CRUD example</h1>
	{#if error}
		<p class="text-error">{error}</p>
	{/if}
	<button on:click={onClickNewPost} class="btn btn-primary" disabled={loading}>New post</button>
	{#if data === null}
		<div class="loading loading-spinner" />
	{:else}
		<ul class="flex flex-col gap-4">
			{#each data as post, index}
				<li>
					<Post
						{post}
						deletePost={() => onClickDeletePost(index)}
						incrementCount={() => onClickIncrementCount(index)}
					/>
				</li>
			{/each}
		</ul>
	{/if}
</main>
