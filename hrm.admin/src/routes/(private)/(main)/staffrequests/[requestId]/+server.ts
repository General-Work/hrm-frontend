import { approveRequest, rejectRequest } from '$svc/staffrequests';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const body = await request.json();

	if (!body) return json({ message: 'Bad Request', status: 400, success: false });

	try {
		const res = await rejectRequest(body.id, body.description);
		if (!res.success) {
			return json({ message: res.message, status: 400, success: res.success });
		}

		return json({ message: res.message, status: 200, success: res.success });
	} catch (e: any) {
		return error(404, e);
	}
};

export const PATCH = async ({ request }) => {
	const body = await request.json();

	if (!body) return json({ message: 'Bad Request', status: 400, success: false });

	try {
		const res = await approveRequest(body.id);
		if (!res.success) {
			return json({ message: res.message, status: 400, success: res.success });
		}

		return json({ message: res.message, status: 200, success: res.success });
	} catch (e: any) {
		return error(404, e);
	}
};
