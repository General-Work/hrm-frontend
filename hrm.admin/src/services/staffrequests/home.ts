import axiosInstance from '$lib/axios';
import type { APIQueryParams, DocumentKind, IActivity, IPageInfo, IStaff } from '$lib/types';
import { axiosError, callResult, paginatedQueryResult, queryResult } from '$svc/shared';

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
						status: params.status && params.status === 'ALL' ? null : params.status,
						requestType:
							params.requestType && params.requestType === 'all' ? null : params.requestType,
						sort: 'updatedAt_desc'
					}
				})
			: await axiosInstance.get('/staff-request/all');
		// console.log({ data: ret.data });
		return paginatedQueryResult(ret, ret.data);
	} catch (error) {
		console.log({ error });
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
		console.log({ reject: ret });
		return callResult(ret, ret.data);
	} catch (error) {
		console.log(error);
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
