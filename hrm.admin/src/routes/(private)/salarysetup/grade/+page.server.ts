import { readGrades } from '$svc/salaries';
import { generateTableDataProps } from '$types/utils';
import { error } from '@sveltejs/kit';

export async function load() {
	const res = await readGrades();
	if (!res.success) {
		error(res.status, res.message ?? 'Failed to load data');
	}
	return {
		data: generateTableDataProps(1, 10, res.data!)
	};
}
