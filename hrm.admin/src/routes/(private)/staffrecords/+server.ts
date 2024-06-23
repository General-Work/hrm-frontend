import { extractMultipleSearchParams, generateDataTableProps } from '$lib/utils';
import { readStaffs } from '$svc/staff';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const x = extractMultipleSearchParams(url.search);
	const res = await readStaffs({
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
