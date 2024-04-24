import { readLeaveequestForSupervisor } from '$svc/leave';
import { generateTableDataProps } from '$types/utils';
import { error } from '@sveltejs/kit';

export async function load() {
	const res = await readLeaveequestForSupervisor();
	if (!res.success) {
		error(res.status, res.message ?? 'Failed to load data');
	}
	return {
		data: generateTableDataProps(1, 10, res.data!)
	};
}
