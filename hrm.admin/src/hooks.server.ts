import { extractQueryParam } from '$lib/utils';
import { LOGIN_KEY, authToken } from '$svc/auth.js';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get(LOGIN_KEY);

	if (
		sessionCookie &&
		!(event.route.id?.split('/')[1] === '(private)') &&
		event.request.method !== 'DELETE'
	) {
		const path = extractQueryParam(event.url.search, 'redirectTo');
		if (path) throw redirect(307, `${path}`);
		throw redirect(307, '/dashboard');
	} else if (!sessionCookie && event.route.id?.split('/')[1] === '(private)') {
		throw redirect(307, `login?redirectTo=${event.url.pathname}`);
	} else if (!sessionCookie && event.url.pathname !== '/login') {
		throw redirect(307, '/login');
	}

	try {
		if (sessionCookie) {
			authToken.set(sessionCookie);
		} else {
			authToken.set('');
		}
	} catch (e) {
		return resolve(event);
	}

	const res = await resolve(event);
	return res;
}) as Handle;
