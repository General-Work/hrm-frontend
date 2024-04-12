import { readSmsTemplates } from '$svc/setup';
import { generateTableDataProps } from '$types/utils';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const ret = await request.json();

	if (!ret) {
		return json({ message: 'Bad Request', status: 400, success: false });
	} else {
		await new Promise((resolve) => setTimeout(resolve, 5000));

		return json({ message: 'Created new record', status: 200, success: true });
	}
};

export const GET = async () => {
	const res = await readSmsTemplates();

	return json({
		status: 408,
		success: true,
		message: 'Failed to load data..',
		data: {
			items: generateTableDataProps(1, 10, res.data),
			totalCount: res.data.totalCount,
			pageInfo: { hasNextPage: false, hasPreviousPage: false,  }
		}
	});
};
