import {
	deleteDirectorate,
	postDirectorate,
	readDirectorates,
	updateDirectorate,
	type DirectorateDto
} from '$svc/setup';
import { extractMultipleSearchParams, extractQueryParam, generateDataTableProps } from '$lib/utils';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const body = await request.json();
	if (!body) return json({ message: 'Bad Request', status: 400, success: false });

	try {
		const res = await postDirectorate(body);
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
		const d: DirectorateDto = {
			directorateName: body.directorateName,
			directorId: body.directorId,
			depDirectoryId: body.depDirectoryId
		};
		const res = await updateDirectorate(body.id, d);
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
		const res = await deleteDirectorate(id);
		if (!res.success) {
			return json({ message: res.message, status: 400, success: res.success });
		}

		return json({ message: res.message, status: 200, success: res.success });
	} catch (e: any) {
		return error(404, e);
	}
};

export const GET = async ({ url }) => {
	try {
		const searchParams = extractMultipleSearchParams(url.search);
		let res;
		if (searchParams && +searchParams.pageNumber) {
			res = await readDirectorates({
				pageNumber: +searchParams.pageNumber,
				pageSize: +searchParams.pageSize,
				search: searchParams.search
			});
		} else {
			res = await readDirectorates();
		}

		if (!res.success) {
			return json({ message: res.message, status: 400, success: res.success });
		}

		const responseData =
			searchParams && +searchParams.pageNumber ? generateDataTableProps(res.data) : res.data;

		return json({
			success: res.success,
			message: res.message,
			data: responseData
		});
	} catch (error) {
		return json({ message: 'An error occurred while fetching data', status: 500, success: false });
	}
};
