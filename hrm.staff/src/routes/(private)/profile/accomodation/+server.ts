import { postAccomodationDetail } from '$svc/staffdetails';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const ret = await request.json();

	if (!ret) return json({ message: 'Bad Request', status: 400, success: false });

	try {
		const res = await postAccomodationDetail(ret);
		if (!res.success) {
			return json({ message: res.message, status: 400, success: res.success });
		}

		return json({ message: res.message, status: 200, success: res.success });
	} catch (e: any) {
		return error(404, e);
	}
};

