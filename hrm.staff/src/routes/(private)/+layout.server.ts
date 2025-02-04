import { generateMenutItems } from '$data/userStore';
import { STAFF_LOGIN_KEY, readAuthStaff } from '$svc/auth';

export async function load({ cookies, locals }) {
	// const par = await parent();
	const session = cookies.get(STAFF_LOGIN_KEY);
	if (session) {
		try {
			const ret = await readAuthStaff();
			//TODO: uncomment this even pushing to vercel
			// if (!ret.success && ret.message === 'Unauthorized') {
			// 	cookies.delete(LOGIN_KEY, { path: '/' });
			// 	authToken.set('');
			// 	return;
			// }
			if (ret.success) {
				const user = ret.data;
				locals.user = user;
			}
		} catch (e) {}
	}
	// console.log('hii')
	return {
		user: locals.user || null,
		menuItems: generateMenutItems(locals.user)
	};
}
