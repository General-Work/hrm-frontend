// import { LOGIN_KEY, authToken, readAuthUser } from '$svc/auth';
// import type { LayoutServerLoadEvent } from './$types';

// export async function load({ cookies, locals }) {
// 	// const par = await parent();
// 	const session = cookies.get(LOGIN_KEY);
// 	if (session) {
// 		try {
// 			const ret = await readAuthUser();

// 			//TODO: uncomment this even pushing to vercel
// 			// if (!ret.success && ret.message === 'Unauthorized') {
// 			// 	cookies.delete(LOGIN_KEY, { path: '/' });
// 			// 	authToken.set('');
// 			// 	return;
// 			// }
// 			if (ret.success) {
// 				const user = ret.data;
// 				locals.user = user;
// 			}
// 		} catch (e) {}
// 	}

// 	return {
// 		user: locals.user || null
// 	};
// }

// import { authToken } from '$svc/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.auth();
	// if (session) {
	// 	//@ts-ignore
	// 	authToken.set(session.accessToken);
	// }
	return {
		session
	};
};
