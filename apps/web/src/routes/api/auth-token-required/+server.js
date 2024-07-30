import { newPocketBase } from '$lib/server/pocketbase';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const authHeader = request.headers.get('x-auth-token');
		if (!authHeader) {
			throw new Error('Unauthorized.');
		}

		const body = await request.json();

		const pb = newPocketBase();
		pb.authStore.save(authHeader);

		/** @type {UserAuthRefresh} */
		const user = await pb.collection('users').authRefresh();

		// Do stuff...

		pb.authStore.clear();

		return json({
			data: { body, user }
		});
	} catch (err) {
		return json({
			error: /** @type {Error} */ (err).message
		});
	}
}
