import { userInfo } from '$svc/auth';
import { redirect } from '@sveltejs/kit';

export function load({ cookies, url, locals }: any) {
	const userId = locals.userId;
	if (!userId) {
		throw redirect(307, `/login?redirectTo=${url.pathname}`);
	}
	let user;
	userInfo.subscribe((x) => (user = x));
	return {
		userId,
		user: user
	};
}
