import { readUnits } from '$svc/setup';
import { generateTableDataProps } from '$lib/utils';
import { error } from '@sveltejs/kit';

export async function load() {
	const res = await readUnits();
	if (!res.success) {
		error(res.status, res.message ?? 'Failed to load data');
	}
	return {
		data: generateTableDataProps(1, 10, res.data!)
	};
}
