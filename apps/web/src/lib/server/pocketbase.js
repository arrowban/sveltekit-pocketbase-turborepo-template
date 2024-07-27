import { env } from '$env/dynamic/private';
import { PUBLIC_POCKETBASE_BASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';

export function newPocketBase() {
	const baseUrl = env.POCKETBASE_BASE_URL || PUBLIC_POCKETBASE_BASE_URL;
	return new PocketBase(baseUrl);
}
