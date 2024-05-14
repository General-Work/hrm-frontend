import type { APIQueryParams } from '$lib/types';
import { axiosInstance } from '$routes/+layout.svelte';
import { axiosError, callResult, queryResult } from '$svc/shared';

export interface IBank {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	bankName: string;
	staffs?: any[] | null;
}

export async function readBanks(params?: APIQueryParams) {
	try {
		const ret = params
			? await axiosInstance.get('/bank/all', { params: { ...params, sort: 'updatedAt_desc' } })
			: await axiosInstance.get('/bank/all');
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function postBank(bankName: string) {
	try {
		const ret = await axiosInstance.post('/bank', { bankName });
		// console.log(ret)
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function updateBank(id: string, bankName: string) {
	try {
		const ret = await axiosInstance.patch(`/bank/${id}`, { bankName });
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}
