import { extractMultipleSearchParams, generateDataTableProps } from '$lib/utils';
import { postSpecialty, readSpecialties, updateSpecialty } from '$svc/salaries';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const ret = await request.json();

	if (!ret) return json({ message: 'Bad Request', status: 400, success: false });

	try {
		const res = await postSpecialty({ categoryId: ret.category, specialityName: ret.name });
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
		const res = await updateSpecialty(body.id, {
			categoryId: body.category,
			specialityName: body.name
		});
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
	const res = await readSpecialties({
		pageNumber: +x.pageNumber,
		pageSize: +x.pageSize,
		search: x.search
	});
	if (!res.success) {
		return json({ message: res.message, status: 400, success: res.success });
	}
	return json({
		success: res.success,
		message: res.message,
		data: generateDataTableProps(res.data)
	});
};
