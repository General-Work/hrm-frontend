import { axiosInstance } from '$routes/+layout.svelte';
import { axiosError, callResult, queryResult } from '$svc/shared';
export interface IProfessionalLicenceDto {
	professionalBodyId: string;
	pin: string;
	issuedDate: string;
	expiryDate: string;
}

export interface IProfessionalBody {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	staffProfessionalLincense: null;
}

export interface IProfessionalLicenceDetails extends IProfessionalLicenceDto {}

export async function postProfessionalLicence(params: IProfessionalLicenceDto) {
	try {
		const ret = await axiosInstance.post('/staff-request/professional-licence', params);
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function readProfessionalBodies() {
	try {
		const ret = await axiosInstance.get('/professional-body/all');
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function readProfessionalLicence() {
	try {
		const ret = await axiosInstance.get('/staff/professional-licence');
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}
