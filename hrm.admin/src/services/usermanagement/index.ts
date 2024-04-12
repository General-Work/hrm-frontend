import type { ICampaignTemplate, IPageInfo } from '$lib/types';

const x = [
	{
		id: 1,
		name: 'Kofi Layla',
		email: 'klayla@outlook.com',
		role: { id: 1, name: 'Super Admin' },
		department: { id: 1, name: 'Operations' },
		unit: { id: 1, name: 'IT' },
		status: 'ACTIVE',
		staffId: 'MS00001'
	},
	{
		id: 2,
		name: 'Yaw Okyere',
		email: 'yokyere@outlook.com',
		role: { id: 1, name: 'Super Admin' },
		department: { id: 1, name: 'Operations' },
		unit: { id: 1, name: 'IT' },
		status: 'ACTIVE',
		staffId: 'MS00002'
	}
];
export function readUsers(): Promise<{
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
		}, 400);
	});
}
