import { extractMultipleSearchParams, generateDataTableProps } from '$lib/utils';
import { readRequests } from '$svc/staffrequests/home.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const x = extractMultipleSearchParams(url.search);
	const res = await readRequests({
		pageNumber: +x.pageNumber,
		pageSize: +x.pageSize,
		search: x.search,
		startDate: x.startDate,
		endDate: x.endDate,
		requestType: x.requestType
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
