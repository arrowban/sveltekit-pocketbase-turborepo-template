import { pb } from '$lib/pocketbase';

export async function getPosts() {
	try {
		/** @type {PostRecordModel[]} */
		const fullList = await pb.collection('posts').getFullList({ expand: 'user', sort: '-created' });
		return { data: fullList };
	} catch (err) {
		return { error: /** @type {Error} */ (err).message };
	}
}
