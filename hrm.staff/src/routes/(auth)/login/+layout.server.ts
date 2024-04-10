import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	const { userId, isNewStaff } = locals;
	if (userId && !isNewStaff) {
		throw redirect(307, '/home');
	} else if (userId && isNewStaff) {
		throw redirect(307, '/register');
	}
}
