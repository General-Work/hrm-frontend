import type { APIQueryParams } from '$lib/types';
import { axiosInstance } from '$routes/+layout.svelte';
import { axiosError, callResult, queryResult } from '$svc/shared';
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
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function postSpecialty(data: SpecialtyDto) {
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

