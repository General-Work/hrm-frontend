import { redirect } from '@sveltejs/kit';

export function load({ url, locals, cookies }) {
	const { userId, isNewStaff } = locals;

	if (url.pathname === '/register') {
		throw redirect(303, '/register');
	} else if (userId && !isNewStaff) {
		throw redirect(303, '/home');
	} else if (userId && isNewStaff) throw redirect(303, '/register');
	else if (!userId) {
		throw redirect(307, '/login');
	}
}
