import type { IAccomodationDetails } from './accomodation';
import type { IBankDetail } from './bank';
import type { IChildDetails } from './children';
import type { IFamilyDetails } from './familyDetails';
import type { IProfessionalLicenceDetails } from './professionalLicence';

export * from './children';
export * from './bank';
export * from './familyDetails';
export * from './accomodation';
export * from './professionalLicence';
export * from './biodata';

interface StaffPosting {
	id: string;
	staffId: string;
	createdAt: string;
	updatedAt: string;
	directorateId: string;
	departmentId: string;
	unitId: string;
	postingDate: string;
}

interface Unit {
	id: string;
	departmentId: string;
	unitHeadId: string;
	directorateId: string;
	createdAt: string;
	updatedAt: string;
	unitName: string;
}

interface Speciality {
	id: string;
	categoryId: string;
	createdAt: string;
	updatedAt: string;
	specialityName: string;
}

interface CurrentAppointment {
	id: string;
	gradeId: string;
	staffId: string;
	staffSpecialityId: string;
	createdAt: string;
	updatedAt: string;
	appointmentType: string;
	staffType: string;
	endDate: string;
	paymentSource: string;
	notionalDate: string;
	substantiveDate: string;
}

export interface IStaffProfile {
	id: string;
	createdAt: string;
	updatedAt: string;
	lastSeen: string;
	title: string;
	gpsAddress: string;
	staffIdentificationNumber: string;
	firstName: string;
	lastName: string;
	otherNames: string;
	specialityId: string;
	dateOfBirth: string;
	phone: string;
	gender: string;
	snnitNumber: string;
	email: string;
	disability: string;
	passportPicture: string;
	ecowasCardNumber: string;
	status: string;
	staffPosting: StaffPosting;
	unit: Unit;
	speciality: Speciality;
	bankDetail: IBankDetail;
	familyDetail: IFamilyDetails;
	professionalLicense: IProfessionalLicenceDetails;
	staffChildren: IChildDetails[];
	staffAccommodation: IAccomodationDetails;
	currentAppointment: CurrentAppointment;
}

export async function readStaffProfile() {
	// try {
	// 	const ret = await axiosInstance.get('/staff/profile');
	// 	return queryResult(ret, ret.data);
	// } catch (error) {
	// 	console.log(error);
	// 	return axiosError(error);
	// }
}
