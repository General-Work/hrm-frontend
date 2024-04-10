import { userInfo } from '$svc/auth.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
	const { userId, isNewStaff } = locals;
	if (userId && !isNewStaff) {
		throw redirect(307, '/home');
	}
	let user;
	userInfo.subscribe((x) => (user = x));
	return {
		isAuthencticated: userId && isNewStaff ? true : false,
		user: user ?? null
	};
};
