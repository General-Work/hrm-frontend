import type { APIQueryParams } from '$lib/types';
import { axiosInstance } from '$routes/+layout.svelte';
import { axiosError, callResult, queryResult } from '$svc/shared';

export interface ICategory {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	categoryName: string;
}

export async function readCategories(params?: APIQueryParams) {
	try {
		const ret = params
			? await axiosInstance.get('/category/all', { params: { ...params, sort: 'updatedAt_desc' } })
			: await axiosInstance.get('/category/all');
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function postCategory(categoryName: string) {
	try {
		const ret = await axiosInstance.post('/category', { categoryName });
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function updateCategory(id: string, categoryName: string) {
	try {
		const ret = await axiosInstance.patch(`/category/${id}`, { categoryName });
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}
