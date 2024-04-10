import { LOGIN_KEY, userInfo } from '$svc/auth';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get(LOGIN_KEY);

	try {
		let user: any;
		userInfo.subscribe((x) => (user = x));
		event.locals.userId = user?.id;
		event.locals.isNewStaff = user?.isNewStaff;
	} catch (e) {
		return resolve(event);
	}

	const res = await resolve(event);
	return res;
}) as Handle;
