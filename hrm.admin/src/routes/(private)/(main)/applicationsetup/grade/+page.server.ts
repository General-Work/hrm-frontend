import { readCategories, readGrades } from '$svc/salaries';
import { generateDataTableProps } from '$lib/utils';
import { error } from '@sveltejs/kit';

export async function load() {
	const res = await readGrades({ pageNumber: 1, pageSize: 13, search: '' });
	if (!res.success) {
		error(res.status!, res.message ?? 'Failed to load data');
	}
	return {
		data: generateDataTableProps(res.data),
		optional: { category: readCategories() }
	};
}
