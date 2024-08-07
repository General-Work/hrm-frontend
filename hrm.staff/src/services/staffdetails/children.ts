import { axiosInstance } from '$routes/+layout.svelte';
import { axiosError, callResult, queryResult } from '$svc/shared';

export interface IChildDto {
	childName: string;
	dateOfBirth: string;
	gender: string;
}
export interface IChildDetails extends IChildDto {}
export async function readChildrenDetails() {
	try {
		const ret = await axiosInstance.get('/staff/children-detail');
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function postChildrenDetail(params: IChildDto) {
	try {
		const ret = await axiosInstance.post('/staff-request/children-details', params);
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}
