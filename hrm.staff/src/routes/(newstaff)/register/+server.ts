import { APPLICANT_LOGIN_KEY, authToken, loginNewStaff } from '$svc/auth.js';
import { json, redirect } from '@sveltejs/kit';

export const POST = async ({ request, cookies }) => {
	const body = await request.json();

	if (!body) {
		return json({ message: 'Bad Request', status: 400, success: false });
	} else {
		const ret = await loginNewStaff(body);
		if (!ret.success) {
			return json({ message: 'Wrong OTP', status: 400, success: false });
		}
		const sessionCookie = ret.data.accessToken;
		const expiresIn = 60 * 60 * 24 * 5 * 1000;
		console;
		const options = {
			maxAge: expiresIn,
			httpOnly: false,
			secure: process.env.NODE_ENV === 'production',
			path: '/'
		};
		cookies.set(APPLICANT_LOGIN_KEY, sessionCookie, options);

		// throw redirect(302, '/register');

		return json({
			message: `Welcome ${ret.data.firstName} ${ret.data.lastName}`,
			status: 200,
			success: true
		});
	}
};

export async function DELETE({ cookies }) {
	cookies.delete(APPLICANT_LOGIN_KEY, { path: '/' });
	authToken.set('');
	return json({ status: 'unAuthenticated' });
}
