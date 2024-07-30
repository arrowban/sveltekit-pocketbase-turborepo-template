import { pb } from '$lib/pocketbase';

/**
 * @param {Pick<Post, "user" | "count">} data
 */
export async function createPost(data) {
	try {
		/** @type {PostRecordModel} */
		const record = await pb.collection('posts').create(data, { expand: 'user' });
		return { data: record };
	} catch (err) {
		return { error: /** @type {Error} */ (err).message };
	}
}
