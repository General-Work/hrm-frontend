import type { IActivity, ICampaignTemplate, IPageInfo } from '$lib/types';

const x = [
	{
		id: 1,
		type: 'STAFF REGISTRATION',
		staffId: '-',
		staffName: 'Yaw Kusi',
		requestDate: new Date(),
		status: 'PENDING',
		assignedTo: 'James Marfo',
		updateOn: '-'
	},
	{
		id: 2,
		type: 'ANNUAL LEAVE PLAN',
		staffId: 'MS00012',
		staffName: 'Paul Jackson',
		requestDate: new Date(),
		status: 'PENDING',
		assignedTo: 'James Gravi',
		updateOn: '-'
	}
];
export function readRequests(): Promise<{
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

export function readRequest(requestId: string): Promise<{
	success: boolean;
	message: string;
	status: number;
	data: any;
}> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				success: true,
				message: '',
				status: 200,
				data: {
					name: 'Kofi'
				}
			});
		}, 500);
	});
}

export function readRequestFeeds(requestId: string): Promise<{
	success: boolean;
	message: string;
	status: number;
	data: IActivity[];
}> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				success: true,
				message: '',
				status: 200,
				data: [
					{ title: 'Mary Eshun (MS0001) submitted a request', date: new Date(), notes: '' },
					{ title: 'Assigned To Martha Lane', date: new Date(), notes: 'Request status is Pending' }
				]
			});
		}, 500);
	});
}
