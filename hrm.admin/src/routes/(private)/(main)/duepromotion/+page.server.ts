import { generateDataTableProps } from '$lib/utils';
import { error } from '@sveltejs/kit';
import { promotionStaff } from './promotionData';

export async function load({ cookies }) {
	const res = {
		success: true,
		message: '',
		status: 200,
		data: {
			totalCount: 5,
			totalPages: 1,
			currentPage: 1,
			pageSize: 17,
			nextPageUrl: null,
			previousPageUrl: null,
			links: [],
			path: 'http://hrm-backend-vsa.fly.dev/api/staff/all?pageNumber=1&pageSize=17&search=&sort=updatedAt_desc',
			data: promotionStaff
		}
	};

	if (!res.success) {
		error(res.status!, res.message ?? 'Failed to load data');
	}
	return {
		data: generateDataTableProps(res.data)
	};
}
