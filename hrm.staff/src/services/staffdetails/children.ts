import axiosInstance from '$lib/axios';
import { axiosError, callResult, queryResult } from '$svc/shared';

export interface IChildDto {
	childName: string;
	dateOfBirth: string;
	gender: string;
}
export interface IChildDetails extends IChildDto {}
export async function readChildrenDetails() {
	try {
		const ret = await axiosInstance.get('/staff-request/auth-staff/children-detail');
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function postChildrenDetail(params: IChildDto[]) {
	try {
		const ret = await axiosInstance.post('/staff-request/children-details', { children: params });
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}
