import { readAuthUser } from '$svc/auth';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const res = await readAuthUser();
	if (!res.success) {
		return json({ message: res.message, status: 400, success: res.success });
	}
	return json({
		// status: ,
		success: res.success,
		message: res.message,
		data: res.data
	});
};
