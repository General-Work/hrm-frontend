import { readProfessionalBodies } from '$svc/setup';
import { error } from '@sveltejs/kit';
import { generateDataTableProps } from '$lib/utils';

export async function load() {
	const res = await readProfessionalBodies({ pageNumber: 1, pageSize: 13, search: '' });
	// console.log(res);
	if (!res.success) {
		error(res.status!, res.message ?? 'Failed to load data');
	}
	return {
		data: generateDataTableProps(res.data)
	};
}
