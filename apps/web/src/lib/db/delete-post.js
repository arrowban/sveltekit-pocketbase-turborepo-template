import { pb } from '$lib/pocketbase';

/**
 * @param {string} id
 */
export async function deletePost(id) {
	try {
		await pb.collection('posts').delete(id);
		return {};
	} catch (err) {
		return { error: /** @type {Error} */ (err).message };
	}
}
