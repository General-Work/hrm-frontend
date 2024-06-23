import { addNewAppointmentDetails } from '$svc/staffrequests/registration.js';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const body = await request.json();
	if (!body) return json({ message: 'Bad Request', status: 400, success: false });
	try {
		const res = await addNewAppointmentDetails(body);
		if (!res.success) {
			return json({ message: res.message, status: 400, success: res.success });
		}

		return json({ message: res.message, status: 200, success: res.success });
	} catch (e: any) {
		return error(404, e);
	}
};
