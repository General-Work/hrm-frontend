import { readMailCampaigns } from '$svc/campaigns';
import { generateTableDataProps } from '$types/utils';
import { error } from '@sveltejs/kit';

export async function load({ cookies }) {
	const res = await readMailCampaigns();
	if (!res.success) {
		error(res.status, res.message ?? 'Failed to load data');
	}
	return {
		data: generateTableDataProps(1, 10, res.data!)
	};
}
