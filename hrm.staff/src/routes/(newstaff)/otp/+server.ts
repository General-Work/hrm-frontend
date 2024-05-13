import { extractQueryParam } from '$lib/utils';
import { generateOtp } from '$svc/auth';
import { error, json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const id = extractQueryParam(url.search);
	if (!id) return json({ message: 'Bad Request', status: 400, success: false });
	try {
		const res = await generateOtp(id);
    // console.log(res)
		if (!res.success) {
			return json({ message: res.message, status: 400, success: res.success });
		}

		return json({ message: res.message, status: 200, success: res.success });
	} catch (e: any) {
		return error(404, e);
	}
};
