import axiosInstance from '$lib/axios';
import type { APIQueryParams } from '$lib/types';
import { axiosError, callResult, paginatedQueryResult, queryResult } from '$svc/shared';

export interface IDepartment {
	id: string;
	directorateId: string;
	createdAt: Date;
	updatedAt: Date;
	departmentName: string;
	headOfDepartmentId: string;
	depHeadOfDepartmentId: string;
	headOfDepartment: null;
	depHeadOfDepartment: null;
	directorate: null;
	units: null;
	users: null;
}

export interface DepartmentDto {
	directorateId: string;
	headOfDepartmentId: string | null;
	depHeadOfDepartmentId: string | null;
	departmentName: string;
}

export async function readDepartments(params?: APIQueryParams) {
	try {
		const ret = params
			? await axiosInstance.get('/department/all', {
					params: { ...params, sort: 'updatedAt_desc' }
				})
			: await axiosInstance.get('/department/all');
		return paginatedQueryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function postDepartment(input: DepartmentDto) {
	try {
		// console.log(input)
		const ret = await axiosInstance.post('/department', {
			...input,
			headOfDepartmentId: input.headOfDepartmentId || null,
			depHeadOfDepartmentId: input.depHeadOfDepartmentId || null
		});
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function updateDepartment(id: string, data: DepartmentDto) {
	try {
		const ret = await axiosInstance.patch(`/department/${id}`, {
			...data,
			headOfDepartmentId: data.headOfDepartmentId || null,
			depHeadOfDepartmentId: data.depHeadOfDepartmentId || null
		});
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function deleteDepartment(id: string) {
	try {
		const ret = await axiosInstance.delete(`/department/${id}`);
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function readUnitsInADepartment(departmentId: string, params?: APIQueryParams) {
	try {
		const ret = params
			? await axiosInstance.get(`/department/${departmentId}/unit/all`, {
					params: { ...params, sort: 'updatedAt_desc' }
				})
			: await axiosInstance.get(`/department/${departmentId}/unit/all`);
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function getDepartmentById(id: string) {
	try {
		const ret = await axiosInstance.get(`/department/${id}`);
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}
