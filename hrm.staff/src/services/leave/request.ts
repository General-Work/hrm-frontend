import type { IPageInfo } from '$lib/types';

const x = [
	{
		id: 1,
		name: 'Mensah Yaw',
		staffId: 'MS0001',
		noOfDays: 10,
		startDate: new Date(),
		endDate: new Date()
	},
	{
		id: 2,
		name: 'Esi Mansahn',
		staffId: 'MS0002',
		noOfDays: 10,
		startDate: new Date(),
		endDate: new Date()
	},
	{
		id: 3,
		name: 'Linda Kyei',
		staffId: 'MS0003',
		noOfDays: 10,
		startDate: new Date(),
		endDate: new Date()
	},
	{
		id: 4,
		name: 'Fosu James',
		staffId: 'MS0001',
		noOfDays: 10,
		startDate: new Date(),
		endDate: new Date()
	}
];
export function readLeaveequestForSupervisor(): Promise<{
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
