import { axiosInstance } from '$routes/+layout.svelte';
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
	polymorphicId: string;
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
	step: string;
	staffSpecialityId: string | null;
}

export async function addNewAppointmentDetails(data: AppointmentDto) {
	try {
		console.log(data);
		const ret = await axiosInstance.post(`/staff-request/new-appointment`, { data });
		return callResult(ret, ret.data);
	} catch (error) {
		// console.log(error);
		return axiosError(error);
	}
}
