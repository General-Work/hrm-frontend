import axiosInstance from '$lib/axios';
import type { APIQueryParams } from '$lib/types';
import { axiosError, callResult, paginatedQueryResult, queryResult } from '$svc/shared';

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
		return params ? paginatedQueryResult(ret, ret.data) : queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function postCategory(data: { categoryName: string }) {
	try {
		const ret = await axiosInstance.post('/category', data);
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function updateCategory(id: string, data: { categoryName: string }) {
	try {
		const ret = await axiosInstance.patch(`/category/${id}`, data);
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}
