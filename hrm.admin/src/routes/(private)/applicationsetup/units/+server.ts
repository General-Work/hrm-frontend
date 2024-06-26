import {
	deleteDepartment,
	deleteUnit,
	postDepartment,
	postUnit,
	readDepartments,
	readUnits,
	updateDepartment,
	updateUnit,
	type DepartmentDto,
	type UnitDto
} from '$svc/setup';
import { extractMultipleSearchParams, extractQueryParam, generateDataTableProps } from '$lib/utils';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const body = await request.json();
	if (!body) return json({ message: 'Bad Request', status: 400, success: false });

	try {
		const res = await postUnit(body);
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
		const d: UnitDto = {
			departmentId: body.departmentId,
			unitHeadId: body.unitHeadId,
			directorateId: body.directorateId,
			unitName: body.unitName
		};
		const res = await updateUnit(body.id, d);
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
		const res = await deleteUnit(id);
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
	const res = await readUnits({
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
