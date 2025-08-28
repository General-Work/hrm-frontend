import axiosInstance from '$lib/axios';
import type { APIQueryParams } from '$lib/types';
import { axiosError, callResult, paginatedQueryResult, queryResult } from '$svc/shared';

export interface UnitDto {
	departmentId: string;
	unitHeadId: string;
	directorateId: string;
	unitName: string;
}

export interface IUnit {
	id: string;
	departmentId: string;
	unitHeadId: string | null;
	directorateId: string | null;
	createdAt: Date;
	updatedAt: Date;
	unitName: string;
	department: null;
	directorate: null;
	unitHead: null;
	users: null;
}

export async function readUnits(params?: APIQueryParams) {
	try {
		const ret = params
			? await axiosInstance.get('/unit/all', {
					params: { ...params, sort: 'updatedAt_desc' }
				})
			: await axiosInstance.get('/unit/all');
		return params ? paginatedQueryResult(ret, ret.data) : queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function postUnit(input: UnitDto) {
	try {
		// console.log(input)
		const ret = await axiosInstance.post('/unit', {
			...input,
			unitHeadId: input.unitHeadId || null
		});
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function updateUnit(id: string, data: UnitDto) {
	try {
		const ret = await axiosInstance.patch(`/unit/${id}`, {
			...data,
			unitHeadId: data.unitHeadId || null
		});
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function deleteUnit(id: string) {
	try {
		const ret = await axiosInstance.delete(`/unit/${id}`);
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function getUnitById(id: string) {
	try {
		const ret = await axiosInstance.get(`/unit/${id}`);
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}
