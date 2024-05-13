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

export interface IUserInfo {
	id: number;
	email?: string;
	firstName?: string;
	surname?: string;
	otherNames?: string;
	fullName: string;
	profileImage?: string | null;
	initials?: string;
	isNewStaff: boolean;
	phoneNumber: string;
	staffId: string;
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
