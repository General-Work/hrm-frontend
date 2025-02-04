import { redirect } from '@sveltejs/kit';

export function load({ cookies, url, locals }: any) {
	if (url.pathname === '/leave') {
		throw redirect(307, '/leave/leaveplan'); // TODO: Remove this
	}
}
