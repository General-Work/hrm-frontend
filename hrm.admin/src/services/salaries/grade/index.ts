import type { ICampaignTemplate, IPageInfo } from '$lib/types';

const x = [
	{
		id: 1,
		name: 'Grade 1',
		scale: 'SS PS',
		band: '10H',
		category: { id: 1, name: 'Category 1' }
	},
	{
		id: 1,
		name: 'Grade 2',
		band: '4L',
		scale: 'SS PS',
		category: { id: 2, name: 'Category 2' }
	}
];
export function readGrades(): Promise<{
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
