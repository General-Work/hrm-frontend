import { readAuthUser } from '$svc/auth';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	console.log('here');
	const res = await readAuthUser();
	if (!res.success) {
		return json({ message: res.message, status: 400, success: res.success });
	}
	return res;
};
