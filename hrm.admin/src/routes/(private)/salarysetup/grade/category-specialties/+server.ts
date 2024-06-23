import { extractMultipleSearchParams } from '$lib/utils';
import { readCategoryAndSpecialtyByGradeId } from '$svc/salaries/grade.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const x = extractMultipleSearchParams(url.search);
	const res = await readCategoryAndSpecialtyByGradeId(x.id as string);
	if (!res.success) {
		return json({ message: res.message, status: 400, success: res.success });
	}
	return json({
		success: res.success,
		message: res.message,
		data: res.data
	});
};
