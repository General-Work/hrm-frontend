import type { IUserInfo } from '$lib/types';
import { LOGIN_KEY, authToken, readAuthUser } from '$svc/auth';

export async function load({ cookies }: any) {
	let user: IUserInfo | null = null;
	const session = cookies.get(LOGIN_KEY);
	if (session) {
		try {
			const ret = await readAuthUser();
			//TODO: uncomment this even pushing to vercel
			// if (!ret.success && ret.message === 'Unauthorized') {
			// 	cookies.delete(LOGIN_KEY, { path: '/' });
			// 	authToken.set('');
			// 	return
			// }
			if (ret.success) user = ret.data;
		} catch (e) {}
	}

	return {
		user: user
	};
}
