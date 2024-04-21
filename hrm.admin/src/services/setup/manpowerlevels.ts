import type { IPageInfo } from '$lib/types';

const x = [
	{
		id: 1,
		directorate: { name: 'Test Directorate' },
		department: { name: 'Test Department' },
		unit: { name: 'Demo Unit' },
		category: { name: 'Demo Unit' },
		specialty: { name: 'Demo Unit' },
		norm: 10
	},
	{
		id: 2,
		directorate: { name: 'Test Directorate' },
		department: { name: 'Test Department' },
		unit: { name: 'Demo Unit' },
		category: { name: 'Demo Unit' },
		specialty: { name: 'Demo Unit' },
		norm: 5
	}
];

export function readManpowerlevels(): Promise<{
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
