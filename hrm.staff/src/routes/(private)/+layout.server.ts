import { userInfo } from '$svc/auth.js';
import { redirect } from '@sveltejs/kit';

export function load({ cookies, url, locals }) {
	const { userId, isNewStaff } = locals;
	if (!userId) {
		throw redirect(307, `/login?redirectTo=${url.pathname}`);
	} else if (userId && isNewStaff) {
		throw redirect(307, '/register');
	}
	let user;
	userInfo.subscribe((x) => (user = x));
	return {
		userId,
		user: user ?? null
	};
}
