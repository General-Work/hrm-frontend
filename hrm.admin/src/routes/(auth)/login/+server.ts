import { convertIsoToTimestamp } from '$lib/utils/index.js';
import { LOGIN_KEY, accountConfirmation, authToken, loginUser } from '$svc/auth.js';
import { json, redirect } from '@sveltejs/kit';

export const PATCH = async ({ request }) => {
	const body = await request.json();

	if (!body) {
		return json({ message: 'Bad Request', status: 400, success: false });
	} else {
		const ret = await loginUser(body);
		if (!ret.success) {
			return json({ message: 'Wrong Credentials', status: 400, success: false });
		}

		// throw redirect(302, '/register');

		return json({
			message: ret.data,
			status: 200,
			success: true
		});
	}
};

export const POST = async ({ request, cookies, locals }) => {
	const body = await request.json();
	if (!body) {
		return json({ message: 'Bad Request', status: 400, success: false });
	} else {
		const ret = await accountConfirmation(body);
		if (!ret.success) {
			return json({ message: ret.message, status: 400, success: false });
		}
		const sessionCookie = ret.data.accessToken;
		const expiresIn = convertIsoToTimestamp(ret.data.expiry);
		const options = {
			maxAge: expiresIn,
			httpOnly: false,
			secure: process.env.NODE_ENV === 'production',
			path: '/'
		};
		cookies.set(LOGIN_KEY, sessionCookie, options);

		return json({
			message: `Welcome ${ret.data.staff.firstName} ${ret.data.staff.otherNames ?? ''} ${ret.data.staff.lastName}`,
			status: 200,
			success: true
		});
	}
};

export async function DELETE({ cookies }) {
	cookies.delete(LOGIN_KEY, { path: '/' });
	authToken.set('');
	return json({ status: 'unAuthenticated' });
}
