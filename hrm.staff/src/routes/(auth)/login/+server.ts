import { LOGIN_KEY, clearInitStaff, initStaff } from '$svc/auth.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ request, cookies }) => {
	const ret = await request.json();

	if (!ret) {
		return json({ message: 'Bad Request', status: 400, success: false });
	} else {
		await new Promise((resolve) => setTimeout(resolve, 5000));
		const expiresIn = 60 * 60 * 24 * 5 * 1000;
		const sessionCookie = 'sessionCookie';
		const options = {
			maxAge: expiresIn,
			httpOnly: true,
			secure: true,
			path: '/home'
		};
		cookies.set(LOGIN_KEY, sessionCookie, options);

		initStaff();
		return json({ message: 'Created new record', status: 200, success: true });
	}
};

export async function DELETE({ cookies }) {
	cookies.delete(LOGIN_KEY, { path: '/' });
	clearInitStaff();
	return json({ status: 'unAuthenticated' });
}
