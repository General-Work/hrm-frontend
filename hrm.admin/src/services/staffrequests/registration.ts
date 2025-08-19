import axiosInstance from '$lib/axios';
import { axiosError, callResult } from '$svc/shared';

export interface INewRegistration {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	firsName: string;
	lastName: string;
	email: string;
	contact: string;
	hasSubmittedApplication: boolean;
	applicationStatus: string;
	bioData: {
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
	};
}

export interface AppointmentDto {
	polymorphicId?: string | null;
	gradeId: string;
	appointmentType: string;
	staffType: string;
	paymentSource: string;
	endDate: string | null;
	notionalDate: string | null;
	substantiveDate: string | null;
	firstAppointmentNotionalDate: string | null;
	firstAppointmentSubstantiveDate: string | null;
	firstAppointmentGradeId: string | null;
	staffSpecialityId: string | null;
	step: string;
	staffId: string;
}

export interface PostingsDto {
	polymorphicId?: string | null;
	staffId?: string | null;
	directorateId: string;
	departmentId: string;
	unitId: string;
	postingDate: string;
}

export async function addNewAppointmentDetails(data: AppointmentDto) {
	try {
		const ret = await axiosInstance.post('/staff-request/new-appointment', data);
		return callResult(ret, ret.data);
	} catch (error) {
		console.log(error);
		return axiosError(error);
	}
}

export async function addPostingDetails(data: PostingsDto) {
	try {
		const ret = await axiosInstance.post('/staff-request/new-posting', data);
		return callResult(ret, ret.data);
	} catch (error) {
		// console.log(error);
		return axiosError(error);
	}
}
