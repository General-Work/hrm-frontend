import { axiosInstance } from '$routes/+layout.svelte';
import { axiosError, callResult, queryResult } from '$svc/shared';

export interface IBiodataDto {
	title: string;
	gpsAddress: string;
	firstName: string;
	lastName: string;
	otherNames: string;
	phone: string;
	gender: string;
	snnitNumber: string;
	email: string;
	disability: string;
	ecowasCardNumber: string;
}

export interface IBiodata extends IBiodataDto {}

export async function postBiodata(params: IBiodataDto) {
	try {
		const ret = await axiosInstance.post('/staff-request/biodata', params);
		return callResult(ret, ret.data);
	} catch (error) {
		console.log(error);
		return axiosError(error);
	}
}
