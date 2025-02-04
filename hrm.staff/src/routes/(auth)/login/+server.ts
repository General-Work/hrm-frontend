import { convertIsoToTimestamp } from '$lib/utils';
import { STAFF_LOGIN_KEY, authToken, loginStaff } from '$svc/auth';
import { json } from '@sveltejs/kit';

export const POST = async ({ request, cookies }) => {
	const body = await request.json();

	if (!body) {
		return json({ message: 'Bad Request', status: 400, success: false });
	} else {
		const ret = await loginStaff(body);
		if (!ret.success) {
			return json({ message: ret.message, status: 400, success: false });
		}
		const sessionCookie = ret.data.accessToken;
		const expiresIn = convertIsoToTimestamp(ret.data.expires);
		const options = {
			maxAge: expiresIn,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			path: '/'
		};
		cookies.set(STAFF_LOGIN_KEY, sessionCookie, options);

		return json({ message: 'Login Successful', status: 200, success: true });
	}
};

export async function DELETE({ cookies }) {
	cookies.delete(STAFF_LOGIN_KEY, { path: '/' });
	authToken.set('');
	return json({ status: 'unAuthenticated' });
}
