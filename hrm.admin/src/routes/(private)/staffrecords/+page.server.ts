import { generateDataTableProps } from '$lib/utils';
import { readStaffs } from '$svc/staff';
import { error } from '@sveltejs/kit';

export async function load({ cookies }) {
	const res = await readStaffs({ pageNumber: 1, pageSize: 17, search: '' });
	// console.log(res)
	if (!res.success) {
		error(res.status!, res.message ?? 'Failed to load data');
	}
	return {
		data: generateDataTableProps(res.data)
	};
}
