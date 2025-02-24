import { generateDataTableProps, extractQueryParam } from '$lib/utils';
import { mockInterviews } from '$routes/(private)/(main)/interviews/interviewData';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
	const id = extractQueryParam(url.search);

	const interview = mockInterviews[0];
	// console.log({ interview, id });
	const res = {
		success: true,
		message: '',
		status: 200,
		data: interview
	};

	// console.log(res);
	if (!res.success) {
		error(res.status!, res.message ?? 'Failed to load data');
	}
	return {
		data: res.data,
		tableData: generateDataTableProps({
			totalCount: 5,
			totalPages: 1,
			currentPage: 1,
			pageSize: 17,
			nextPageUrl: null,
			previousPageUrl: null,
			links: [],
			path: 'http://hrm-backend-vsa.fly.dev/api/staff/all?pageNumber=1&pageSize=17&search=&sort=updatedAt_desc',
			data: interview.candidates
		})
	};
}
