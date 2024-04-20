import type { ICampaignTemplate, IPageInfo } from '$lib/types';

const x = [
	{
		id: 1,
		name: 'Test Directorate',
		director: { name: 'Demo Director' },
		deputyDirector: { name: 'Demo deputy director' }
	},
	{
		id: 2,
		name: 'Test Directorate 2',
		director: { name: 'Demo Director' },
		deputyDirector: null
	}
];

export function readDirectorates(): Promise<{
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
