import type { ICampaignTemplate, IPageInfo } from '$lib/types';

const x = [
	{
		id: 1,
		name: 'Test Unit',
		directorate: { name: 'Test Directorate' },
		department: { name: 'Test Department' },
		head: { name: 'Demo Unit Head' }
	},
	{
		id: 2,
		name: 'Test Unit',
		directorate: { name: 'Test Directorate' },
		department: { name: 'Test Department' },
		head: { name: 'Demo Unit Head' }
	}
];

export function readUnits(): Promise<{
	success: boolean;
	message: string;
	status: number;
	data: { totalCount: number; pageInfo: IPageInfo; items: any[] };
}> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				success: true,
				message: 'success',
				status: 200,
				data: {
					totalCount: x.length,
					pageInfo: {
						hasNextPage: false,
						hasPreviousPage: false,
						nextPageUrl: '',
						previousPageUrl: ''
					},
					items: x
				}
			});
		}, 700);
	});
}
