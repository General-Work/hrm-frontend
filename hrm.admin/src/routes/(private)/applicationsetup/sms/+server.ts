import {
	deleteSmsTemplates,
	postSmsTemplates,
	readSmsTemplates,
	updateSmsTemplates
} from '$svc/setup';
import { extractMultipleSearchParams, extractQueryParam, generateDataTableProps } from '$lib/utils';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const body = await request.json();
	if (!body) return json({ message: 'Bad Request', status: 400, success: false });

	try {
		const res = await postSmsTemplates(body);
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
		const d = {
			name: body.name,
			message: body.message,
			description: body.description
		};
		// console.log(body, d);
		const res = await updateSmsTemplates(body.id, d);
		if (!res.success) {
			return json({ message: res.message, status: 400, success: res.success });
		}

		return json({ message: res.message, status: 200, success: res.success });
	} catch (e: any) {
		return error(404, e);
	}
};

export const DELETE = async ({ url }) => {
	const id = extractQueryParam(url.search);

	if (!id) return json({ message: 'Bad Request', status: 400, success: false });

	try {
		const res = await deleteSmsTemplates(id);
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
	const res = await readSmsTemplates({
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
