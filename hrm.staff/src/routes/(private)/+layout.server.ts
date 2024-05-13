import { userInfo } from '$svc/auth.js';
import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
	let user;
	userInfo.subscribe((x) => (user = x));
	return {
		user: user ?? null
	};
}
