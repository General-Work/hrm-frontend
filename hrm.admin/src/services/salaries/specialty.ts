import axiosInstance from '$lib/axios';
import type { APIQueryParams } from '$lib/types';
import { axiosError, callResult, paginatedQueryResult, queryResult } from '$svc/shared';
import type { ICategory } from './category';

export interface SpecialtyDto {
	categoryId: string;
	specialityName: string;
}
export interface ISpecialty {
	id: string;
	categoryId: string;
	createdAt: Date;
	updatedAt: Date;
	specialityName: string;
	category: ICategory | null;
	staffs: null;
}
export async function readSpecialties(params?: APIQueryParams) {
	try {
		const ret = params
			? await axiosInstance.get('/speciality/all', {
					params: { ...params, sort: 'updatedAt_desc' }
				})
			: await axiosInstance.get('/speciality/all');
		return params ? paginatedQueryResult(ret, ret.data) : queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function postSpecialty(data: SpecialtyDto) {
	console.log(data);
	try {
		const ret = await axiosInstance.post('/speciality', data);
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function updateSpecialty(id: string, data: SpecialtyDto) {
	try {
		const ret = await axiosInstance.patch(`/speciality/${id}`, data);
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}
