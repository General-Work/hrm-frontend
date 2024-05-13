import { extractMultipleSearchParams, generateDataTableProps } from '$lib/utils';
import { postGrade, readGrades } from '$svc/salaries';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const body = await request.json();
	// console.log(body);

	if (!body) return json({ message: 'Bad Request', status: 400, success: false });

	try {
		const d = {
			categoryId: body.categoryId,
			gradeName: body.grade,
			level: `${body.level}${body.high}`,
			scale: body.scale,
			marketPremium: body.marketPremium,
			minimunStep: body.minimumStep,
			maximumStep: body.maximumStep
		};
		// console.log(d)
		const res = await postGrade(d);
		if (!res.success) {
			return json({ message: res.message, status: 400, success: res.success });
		}

		return json({ message: res.message, status: 200, success: res.success, data: res.data });
	} catch (e: any) {
		return error(404, e);
	}
};

// export const PATCH = async ({ request }) => {
// 	const body = await request.json();
// 	if (!body) return json({ message: 'Bad Request', status: 400, success: false });

// 	try {
// 		const res = await updateSpecialty(body.id, {
// 			categoryId: body.category,
// 			specialityName: body.name
// 		});
// 		if (!res.success) return error(res.status!, res.message ?? 'Failed to load data');

// 		return json({ message: res.message, status: 200, success: res.success });
// 	} catch (e: any) {
// 		return error(404, e);
// 	}
// };

export const GET = async ({ url }) => {
	const x = extractMultipleSearchParams(url.search);
	const res = await readGrades({
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
