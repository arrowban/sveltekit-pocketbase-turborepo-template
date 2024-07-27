import { POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD } from '$env/static/private';
import { newPocketBase } from '$lib/server/pocketbase';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		/** @type {ApiCreateAccountParams} */
		const body = await request.json();
		const { email, password, passwordConfirm } = body;

		const pb = newPocketBase();
		await pb.admins.authWithPassword(POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD);
		const createUserRecordModel = await pb
			.collection('users')
			.create({ email, password, passwordConfirm });
		pb.authStore.clear();

		return json({
			data: { createUserRecordModel }
		});
	} catch (err) {
		return json({
			error: /** @type {Error} */ (err).message
		});
	}
}
