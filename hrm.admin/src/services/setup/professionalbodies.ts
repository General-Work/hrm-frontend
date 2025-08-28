import axiosInstance from '$lib/axios';
import type { APIQueryParams, IPageInfo } from '$lib/types';
import { axiosError, callResult, queryResult } from '$svc/shared';

export interface IProfessionalBody {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	name: string;
	// staffs?: any[] | null;
}

export async function readProfessionalBodies(params?: APIQueryParams) {
	try {
		const ret = params
			? await axiosInstance.get('/professional-body/all', {
					params: { ...params, sort: 'updatedAt_desc' }
				})
			: await axiosInstance.get('/professional-body/all');
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function postProfessionalBody(bankName: string) {
	try {
		const ret = await axiosInstance.post('/professional-body', { name: bankName });
		// console.log(ret)
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function updateProfessionalBody(id: string, bankName: string) {
	try {
		const ret = await axiosInstance.patch(`/professional-body/${id}`, { name: bankName });
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}
