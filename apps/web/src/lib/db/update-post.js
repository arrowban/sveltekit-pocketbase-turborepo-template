import { pb } from '$lib/pocketbase';

/**
 * @param {string} id
 * @param {Partial<Omit<Post, "id" | "created" | "updated" | "user">>} data
 */
export async function updatePost(id, data) {
	try {
		/** @type {PostRecordModel} */
		const record = await pb.collection('posts').update(id, data, { expand: 'user' });
		return { data: record };
	} catch (err) {
		return { error: /** @type {Error} */ (err).message };
	}
}
