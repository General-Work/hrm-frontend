import axiosInstance from '$lib/axios';
import { axiosError, callResult, queryResult } from '$svc/shared';

export interface IFamilyDetailDto {
	fathersName: string;
	mothersName: string;
	spouseName: string;
	spousePhoneNumber: string;
	nextOfKIN: string;
	nextOfKINPhoneNumber: string;
	emergencyPerson: string;
	emergencyPersonPhoneNumber: string;
}

export interface IFamilyDetails extends IFamilyDetailDto {
	id: string;
	staffId: string;
	createdAt: Date;
	updatedAt: Date;
	status: 'PENDING';
}

export async function readFamilyDetails() {
	try {
		const ret = await axiosInstance.get(`/staff-request/auth-staff/family-details`);
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function postFamilyDetails(params: IFamilyDetailDto) {
	try {
		const ret = await axiosInstance.post('/staff-request/family-details', params);
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}
