import { readSmsTemplates } from '$svc/setup';
import { generateTableDataProps } from '$types/utils';
import { error } from '@sveltejs/kit';

export async function load({cookies}) {
	const res = await readSmsTemplates();
	if (!res.success) {
		error(res.status, res.message ?? 'Failed to load data');
	}
	return {
		data: generateTableDataProps(1, 10, res.data!)
	};
}
