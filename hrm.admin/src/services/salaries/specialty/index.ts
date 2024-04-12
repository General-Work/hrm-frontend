import type { ICampaignTemplate, IPageInfo } from '$lib/types';

const x = [
	{
		id: 1,
		category: { id: 1, name: 'Category 1' },
		name: 'Specialty 1'
	},
	{
		id: 1,
		category: { id: 2, name: 'Category 2' },
		name: 'Specialty 2'
	}
];
export function readSpecialties(): Promise<{
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
