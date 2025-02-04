import type { ApplicantApplicationStatus } from '$svc/applicant';

export type IMenuItems = {
	icon?: string;
	iconSize?: number;
	label: string;
	path?: string;
	count?: number;
};

export interface IRouteItems {
	title: string;
	items: IMenuItems[];
}

export interface IRouteInfo {
	title: string;
	showBreadCrumb?: boolean;
}

export interface ISideMenu {
	component: any;
	props: any;
	title: string;
}

export interface IRequiredForm {
	bankData: boolean;
	professionalLicenceData: boolean;
	accomodationData: boolean;
	familyData: boolean;
	childrenData: boolean;
}

export interface IUserInfo {
	id: string;
	staffIdentificationNumber: string;
	firstName: string;
	lastName: string;
	otherNames: string;
	specialityId: string | null;
	dateOfBirth: string;
	phone: string;
	gender: string;
	snnitNumber: string;
	email: string;
	disability: string;
	passportPicture: string;
	unreadCount: number;
	newStaffPrerequisiteCheck: IRequiredForm;
}

export interface IApplicantInfo {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	firsName: string;
	lastName: string;
	email: string | null;
	contact: string;
	hasSubmittedApplication: boolean;
	accessToken?: string;
	applicationStatus?: ApplicantApplicationStatus;
}

export interface IPageInfo {
	hasNextPage: false;
	hasPreviousPage: false;
	nextPageUrl?: string;
	previousPageUrl?: string;
}

export interface ITableDataProps<T> {
	currentPage: number;
	pageSize: number;
	pageInfo: IPageInfo;
	totalCount: number;
	items: T[];
}
