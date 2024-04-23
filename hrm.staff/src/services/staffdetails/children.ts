import type { IPageInfo } from '$lib/types';

const x = [
	{
		id: 1,
		name: 'Child 1',
		dob: new Date(),
		gender: 'MALE'
	},
	{
		id: 2,
		name: 'Child 2',
		dob: new Date(),
		gender: 'FEMALE'
	}
];
export function readChildrenDetails(): Promise<{
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
