import { STAFF_LOGIN_KEY, authToken, clearInitStaff, initStaff } from '$svc/auth';
import { json } from '@sveltejs/kit';

export const POST = async ({ request, cookies }) => {
	const ret = await request.json();

	console.log(ret);

	if (!ret) {
		return json({ message: 'Bad Request', status: 400, success: false });
	} else {
		await new Promise((resolve) => setTimeout(resolve, 700));
		const expiresIn = 60 * 60 * 24 * 5 * 1000;
		const sessionCookie = 'sessionCookie';
		const options = {
			maxAge: expiresIn,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			path: '/'
		};
		cookies.set(STAFF_LOGIN_KEY, sessionCookie, options);

		initStaff();
		return json({ message: 'Created new record', status: 200, success: true });
	}
};

export async function DELETE({ cookies }) {
	cookies.delete(STAFF_LOGIN_KEY, { path: '/' });
	clearInitStaff();
	authToken.set('');
	return json({ status: 'unAuthenticated' });
}
