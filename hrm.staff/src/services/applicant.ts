// import axiosInstance from '$lib/axios';
import { formDataConfig } from '$lib/constants';
import { axiosInstance } from '$routes/+layout.svelte';
import { axiosError, callResult, queryResult } from './shared';

export interface ApplicantBiodataDto {
	title: string;
	surName: string;
	firstName: string;
	otherNames: string;
	gender: string;
	citizenship: string;
	dateOfBirth: string | null;
	ssnitNumber: string;
	phoneOne: string;
	phoneTwo: string;
	email: string;
	gpsAddress: string;
	disability: string;
	ecowasCardNumber: string;
	passportNumber: string;
	controllerStaffNumber: string;
}

export interface ApplicantQualificationDto {
	educationalBackground: {
		yearCompleted: string | null;
		institutionName: string;
		certificate: string;
	}[];
	yearOfService: string | null;
	nssNumber: string;
	placeOfService: string;
	highestQualification: string;
}

export interface ApplicantAttachmentDto {
	passportPicture: File | string | null;
	birthCertificate: File | string | null;
	highestQualificationCertificate: File | string | null;
	nssCertificate: File | string | null;
}

export interface ApplicantDetails {
	id: string;
	applicantId: string;
	createdAt: Date;
	updatedAt: Date;
	title: string;
	surName: string;
	firstName: string;
	otherNames: string;
	gender: string;
	citizenship: string;
	dateOfBirth: string;
	snnitNumber: string;
	phoneOne: string;
	phoneTwo: string;
	email: string;
	gpsAddress: string;
	disability: string;
	ecowasCardNumber: string;
	passportNumber: string;
	passportPicture: string;
	birthCertificate: string;
	highestQualification: string;
	highestQualificationCertificate: string;
	nssNumber: string;
	yearOfService: string;
	placeOfService: string;
	nssCertificate: string;
	controllerStaffNumber: string;
	educationalBackground: {
		id: string;
		applicantBioDataId: string;
		createdAt: Date;
		updatedAt: Date;
		yearCompleted: string;
		institutionName: string;
		certificate: string;
	}[];
}

export type ApplicantApplicationStatus =
	| 'PENDING'
	| 'APPOINTED'
	| 'APPROVED'
	| 'REJECTED'
	| 'POSTED'
	| '';

export async function readLoginsDetails() {
	try {
		const ret = await axiosInstance.get(`/applicant/auth-applicant`);
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function readApplicantDetails() {
	try {
		const ret = await axiosInstance.get('/applicant/bio-data');
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function postApplicantBiodata(params: ApplicantBiodataDto) {
	try {
		const ret = await axiosInstance.post('/applicant/bio-data', {
			...params,
			ssnitNumber: params.ssnitNumber ? params.ssnitNumber : null
		});
		return callResult(ret, ret.data);
	} catch (error: any) {
		return axiosError(error);
	}
}

export async function postApplicantQualifications(params: ApplicantQualificationDto) {
	try {
		// console.log(params);
		const ret = await axiosInstance.post('/applicant/educational-background', params);
		return callResult(ret, ret.data);
	} catch (error) {
		// console.log(error);
		return axiosError(error);
	}
}

export async function postApplicantAttachment(params: any) {
	try {
		// console.log(params);
		const ret = await axiosInstance.post('/applicant/attachments', params, formDataConfig);
		return callResult(ret, ret.data);
	} catch (error) {
		// console.log(error);
		return axiosError(error);
	}
}
