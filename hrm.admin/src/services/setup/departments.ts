import type { ICampaignTemplate, IPageInfo } from '$lib/types';

const x = [
	{
		id: 1,
		name: 'Test Department',
		hod: { name: 'Demo Hod' },
		deputyHod: { name: 'Demo deputy hod' },
		directorate: { name: 'Test Directorate' }
	},
	{
		id: 2,
		name: 'Test Department',
		hod: { name: 'Demo Hod' },
		deputyHod: null,
		directorate: { name: 'Test Directorate' }
	}
];

export function readDepartments(): Promise<{
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
