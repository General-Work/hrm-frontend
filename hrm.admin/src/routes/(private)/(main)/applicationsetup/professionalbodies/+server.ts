import { error, json } from '@sveltejs/kit';
import { postProfessionalBody, readProfessionalBodies, updateProfessionalBody } from '$svc/setup';
import { extractMultipleSearchParams, generateDataTableProps } from '$lib/utils';

export const POST = async ({ request }) => {
	const ret = await request.json();

	if (!ret) return json({ message: 'Bad Request', status: 400, success: false });

	try {
		const res = await postProfessionalBody(ret.name);
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
		const res = await updateProfessionalBody(body.id, body.name);
		if (!res.success) {
			return json({ message: res.message, status: 400, success: res.success });
		}

		return json({ message: res.message, status: 200, success: res.success });
	} catch (e: any) {
		return error(404, e);
	}
};

export const GET = async ({ url }) => {
	const x = extractMultipleSearchParams(url.search);
	const res = await readProfessionalBodies({
		pageNumber: +x.pageNumber,
		pageSize: +x.pageSize,
		search: x.search
	});
	if (!res.success) {
		return json({ message: res.message, status: 400, success: res.success });
	}
	return json({
		// status: ,
		success: res.success,
		message: res.message,
		data: generateDataTableProps(res.data)
	});
};
