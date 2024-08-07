import { postChildrenDetail, readChildrenDetails } from '$svc/staffdetails';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const ret = await request.json();

	if (!ret) return json({ message: 'Bad Request', status: 400, success: false });

	try {
		const res = await postChildrenDetail(ret);
		if (!res.success) {
			return json({ message: res.message, status: 400, success: res.success });
		}

		return json({ message: res.message, status: 200, success: res.success });
	} catch (e: any) {
		return error(404, e);
	}
};

export const GET = async () => {
	const res = await readChildrenDetails();
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
