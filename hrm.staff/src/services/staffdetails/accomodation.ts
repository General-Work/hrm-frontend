import { axiosInstance } from '$routes/+layout.svelte';
import { axiosError, callResult, queryResult } from '$svc/shared';
import { error } from '@sveltejs/kit';

export interface IAccomodationDto {
	source: string;
	gpsAddress: string;
	accomodationType: string;
	flatNumber: string;
	allocationDate: string;
}

export interface IAccomodationDetails extends IAccomodationDto {
	id: string;
	createdAt: Date;
	updatedAt: Date;
}

export async function readAccomodationDetail() {
	try {
		const ret = await axiosInstance.get('/staff/accomodation');
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function postAccomodationDetail(params: IAccomodationDto) {
	try {
		const ret = await axiosInstance.post('/staff-request/accommodation', params);
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}
