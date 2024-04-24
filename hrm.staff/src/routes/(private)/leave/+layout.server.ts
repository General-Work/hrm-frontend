import { redirect } from '@sveltejs/kit';

export function load({ cookies, url, locals }: any) {
	const { userId, isNewStaff } = locals;
	if (!userId) {
		throw redirect(307, `/login?redirectTo=${url.pathname}`);
	} else if (userId && isNewStaff) {
		throw redirect(307, '/register');
	} else if (url.pathname === '/leave') {
		throw redirect(307, '/leave/leaveplan'); // TODO: Remove this
	}
	let user;

	return {
		userId,
		user: user ?? null
	};
}
