import { extractMultipleSearchParams, generateDataTableProps } from '$lib/utils';
import { postSmsCampaign, readSmsCampaigns } from '$svc/campaigns';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const body = await request.formData();
	const data: any = Object.fromEntries(body.entries());
	const d = {
		...data,
		staffIds: [],
		directorateId: '',
		unitId: '',
		departmentId: '',
		professionId: []
	};
	if (!data) return json({ message: 'Bad Request', status: 400, success: false });

	try {
		const res = await postSmsCampaign(d);
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
	const res = await readSmsCampaigns({
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
