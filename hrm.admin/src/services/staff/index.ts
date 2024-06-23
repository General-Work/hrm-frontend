import type { APIQueryParams } from '$lib/types';
import { axiosInstance } from '$routes/+layout.svelte';
import { axiosError, queryResult } from '$svc/shared';

export async function readStaffs(params?: APIQueryParams) {
	try {
		const ret = params
			? await axiosInstance.get('/staff/all', { params: { ...params, sort: 'updatedAt_desc' } })
			: await axiosInstance.get('/staff/all');
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function readStaffById(id: string) {
	try {
		const ret = await axiosInstance.get(`/staff/${id}`);
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}
