import type { APIQueryParams, DocumentKind, IActivity, IPageInfo, IStaff } from '$lib/types';
import { axiosInstance } from '$routes/+layout.svelte';
import { axiosError, callResult, queryResult } from '$svc/shared';

const x = [
	{
		id: 1,
		type: 'NEW REGISTRATION',
		staffId: '-',
		staffName: 'Yaw Kusi',
		requestDate: new Date(),
		status: 'PENDING',
		assignedTo: 'James Marfo',
		updateOn: '-'
	},
	{
		id: 2,
		type: 'BANK UPDATE',
		staffId: 'MS00012',
		staffName: 'Paul Jackson',
		requestDate: new Date(),
		status: 'PENDING',
		assignedTo: 'James Gravi',
		updateOn: '-'
	}
];

export interface IRequest {
	id: string;
	requestFromStaffId: string | null;
	requestAssignedStaffId: string;
	requestDetailPolymorphicId: string;
	createdAt: Date;
	updatedAt: Date;
	requestType: string;
	status: string;
	requestFromStaff: IStaff | null; // Replace 'any' with the actual type if known
	requestAssignedStaff: IStaff;
}
export async function readRequests(params?: APIQueryParams) {
	try {
		const ret = params
			? await axiosInstance.get('/staff-request/all', {
					params: {
						search: params.search,
						pageNumber: params.pageNumber,
						pageSize: params.pageSize,
						filter: params.requestType,
						sort: 'updatedAt_desc'
					}
				})
			: await axiosInstance.get('/staff-request/all');
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function readRequest(id: string) {
	try {
		const ret = await axiosInstance.get(`/staff-request/${id}`);
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function rejectRequest(id: string, description: string) {
	try {
		const ret = await axiosInstance.post(`/staff-request/reject`, { id, description });
		return callResult(ret, ret.data);
	} catch (error) {
		console.log(error)
		return axiosError(error);
	}
}

export async function approveRequest(id: string) {
	try {
		const ret = await axiosInstance.post(`/staff-request/approve`, { id });
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
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
