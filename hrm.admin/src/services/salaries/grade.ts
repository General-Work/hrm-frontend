import type { APIQueryParams } from '$lib/types';
import { axiosInstance } from '$routes/+layout.svelte';
import { axiosError, callResult, queryResult } from '$svc/shared';

export interface IGradeDto {
	categoryId: string;
	gradeName: string;
	level: string;
	scale: string;
	marketPremium: number;
	minimunStep: number;
	maximumStep: number;
}

export interface IGradeSalaryDto {
	stepIndex: number;
	salary: number;
	marketPreBaseSalary: number;
}

export interface IGrade {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	categoryId: string;
	gradeName: string;
	level: string;
	scale: string;
	marketPremium: number;
	minimunStep: number;
	maximumStep: number;
	category: any;
	steps: any;
}

export async function readGrades(params?: APIQueryParams) {
	try {
		const ret = params
			? await axiosInstance.get('/grade/all', { params: { ...params, sort: 'updatedAt_desc' } })
			: await axiosInstance.get('/grade/all');
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function postGrade(data: IGradeDto) {
	try {
		// console.log('data', data);
		const ret = await axiosInstance.post('/grade', data);
		// console.log('ret', ret);
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function postGradeSalary(gradeId: string, data: IGradeSalaryDto[]) {
	try {
		const ret = await axiosInstance.post(`/grade/${gradeId}/steps`, data);
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}
