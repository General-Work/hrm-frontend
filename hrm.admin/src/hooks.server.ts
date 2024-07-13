// import type { DecodedSession } from '$lib/types';
// import { extractQueryParam, isSessionExpired } from '$lib/utils';
// import { LOGIN_KEY, authToken } from '$svc/auth.js';
// import { redirect, type Handle } from '@sveltejs/kit';
// import jwt from 'jsonwebtoken';

// export const handle = (async ({ event, resolve }) => {
// 	const sessionCookie = event.cookies.get(LOGIN_KEY);

// 	// console.log(sessionCookie && isSessionExpired(jwt.verify(sessionCookie) as DecodedSession));

// 	if (
// 		sessionCookie &&
// 		!(event.route.id?.split('/')[1] === '(private)') &&
// 		event.request.method !== 'DELETE'
// 	) {
// 		const path = extractQueryParam(event.url.search, 'redirectTo');
// 		if (path) throw redirect(307, `${path}`);
// 		throw redirect(307, '/dashboard');
// 	} else if (!sessionCookie && event.route.id?.split('/')[1] === '(private)') {
// 		throw redirect(307, `login?redirectTo=${event.url.pathname}`);
// 	} else if (!sessionCookie && event.url.pathname !== '/login') {
// 		throw redirect(307, '/login');
// 	}

// 	try {
// 		if (sessionCookie) {
// 			authToken.set(sessionCookie);
// 		} else {
// 			authToken.set('');
// 		}
// 	} catch (e) {
// 		return resolve(event);
// 	}

// 	const res = await resolve(event);
// 	return res;
// }) as Handle;

import { redirect, type Handle } from '@sveltejs/kit';
import { handle as authenticationHandle } from './services/authentication';
import { sequence } from '@sveltejs/kit/hooks';

async function authorizationHandle({ event, resolve }: any) {
	const authenticatedPath = event.route.id?.split('/')[1] === '(private)';
	const authPath = event.route.id?.split('/')[1] === '(auth)';

	const session = await event.locals.auth();
	if (authenticatedPath) {
		if (!session) {
			throw redirect(307, `login?redirectTo=${event.url.pathname}`);
		}
	} else if (authPath) {
		if (session) {
			throw redirect(307, '/dashboard');
		}
	} else {
		if (session) throw redirect(307, '/dashboard');
		throw redirect(307, '/login');
	}

	return resolve(event);
}

export const handle: Handle = sequence(authenticationHandle, authorizationHandle);
