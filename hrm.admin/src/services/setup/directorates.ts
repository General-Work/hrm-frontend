import axiosInstance from '$lib/axios';
import type { APIQueryParams } from '$lib/types';
import { axiosError, callResult, queryResult } from '$svc/shared';

export interface IDirectorate {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	directorateName: string;
	directorId: string;
	depDirectoryId: string;
	director: null;
	depDirector: null;
	departments: null;
	units: null;
}

export interface DirectorateDto {
	directorateName: string;
	directorId: string;
	depDirectoryId: string;
}

export async function readDirectorates(params?: APIQueryParams) {
	try {
		const ret = params
			? await axiosInstance.get('/directorate/all', {
					params: { ...params, sort: 'updatedAt_desc' }
				})
			: await axiosInstance.get('/directorate/all');
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function postDirectorate(input: DirectorateDto) {
	try {
		const ret = await axiosInstance.post('/directorate', {
			...input,
			depDirectoryId: input.depDirectoryId || null,
			directorId: input.directorId || null
		});
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function updateDirectorate(id: string, data: DirectorateDto) {
	try {
		const ret = await axiosInstance.patch(`/directorate/${id}`, {
			...data,
			depDirectoryId: data.depDirectoryId || null,
			directorId: data.directorId || null
		});
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function deleteDirectorate(id: string) {
	try {
		const ret = await axiosInstance.delete(`/directorate/${id}`);
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function readDepartmentsInADirectorate(
	directorateId: string,
	params?: APIQueryParams
) {
	try {
		const ret = params
			? await axiosInstance.get(`/directorate/${directorateId}/department/all`, {
					params: { ...params, sort: 'updatedAt_desc' }
				})
			: await axiosInstance.get(`/directorate/${directorateId}/department/all`, {
					params: { sort: 'departmentName_asc' }
				});
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}
