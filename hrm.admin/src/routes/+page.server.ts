import { redirect } from '@sveltejs/kit';

export const load = ({ cookies, url, locals }: any) => {
	const userId = locals.userId;
	if (!userId) {
		throw redirect(303, `/login`);
	}
	throw redirect(307, '/dashboard');
};
