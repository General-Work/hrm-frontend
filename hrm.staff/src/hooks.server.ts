// import { updateAxiosRequest } from '$lib/axios';
// import { updateAxiosRequest } from '$routes/+layout.svelte';
import { APPLICANT_LOGIN_KEY, STAFF_LOGIN_KEY, authToken } from '$svc/auth';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const applicantSession = event.cookies.get(APPLICANT_LOGIN_KEY);
	const staffSession = event.cookies.get(STAFF_LOGIN_KEY);

	// Todo try and do redirection for authenticated users
	if (applicantSession && !(event.route.id?.split('/')[1] === '(newstaff)')) {
		throw redirect(307, '/register');
	} else if (
		staffSession &&
		!(event.route.id?.split('/')[1] === '(private)') &&
		event.request.method !== 'DELETE'
	) {
		throw redirect(307, '/home');
	} else if (!staffSession && event.route.id?.split('/')[1] === '(private)') {
		throw redirect(307, `login?redirectTo=${event.url.pathname}`);
	} else if (!staffSession && event.url.pathname === '/') {
		throw redirect(307, `/login`);
	}

	try {
		if (applicantSession) {
			// updateAxiosRequest(applicantSession);
			authToken.set(applicantSession);
		} else if (staffSession) {
			authToken.set(staffSession);

			// updateAxiosRequest(staffSession);
		} else {
			// updateAxiosRequest('');
			authToken.set('');
		}
	} catch (e) {
		return resolve(event);
	}

	const res = await resolve(event);
	return res;
}) as Handle;
