import type { IButtonConfigKind } from '$cmps/ui/actionButton.svelte';
import type { IModalSize } from '$cmps/ui/modal.svelte';

export interface IMenuItem {
	title: string;
	icon?: string;
	path?: string;
	items?: IMenuItem[] | null;
	description?: string;
	iconBg?: string;
	iconColor?: string;
	iconSize?: number;
}

export interface ISideMenu {
	component: any;
	props: any;
	title: string;
	show: boolean;
}
export interface IRouteItem {
	name: string;
	items: IMenuItem[];
}

export interface IUserInfo {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	emailVerifiedAt: null | Date;
	lastSeen: Date;
	isAccountActive: boolean;
	hasResetPassword: boolean;
	staffId: string;
	roleId: string;
	unitId: string;
	departmentId: string;
	email: string;
	staff: IStaff;
	role: null | any;
	unit: null | any;
	department: null | any;
}

export interface IRouteInfo {
	title: string;
	showBreadCrumb?: boolean;
	dropdownOptions?: IMenuItem[];
	currentDropdownOption?: IMenuItem;
}

// export interface ICampaignTemplate {
// 	id: number;
// 	name: string;
// 	notes: string;
// 	message: string;
// 	category: string;
// 	isSystemTemplate: boolean;
// 	subject?: string | null;
// }

export interface IPageInfo {
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	nextPageUrl?: string;
	previousPageUrl?: string;
	links?: string[];
	path?: string;
}

export interface ITableDataProps<T> {
	currentPage: number;
	pageSize: number;
	pageInfo: IPageInfo;
	totalPages?: number;
	totalCount: number;
	items: T[];
}
export interface IActivity {
	date: Date;
	title: string;
	notes?: string;
	activity?: string;
	type?: string;
}

type ViewerKind = 'inlineViewer' | 'modalViewer' | 'link';

export interface IRequestAction {
	kind: IButtonConfigKind;
	label: string;
	subLabel?: string;
	cmd: {
		action: ViewerKind;
		insertTop?: boolean;
		args: {
			type: string;
			title: string;
			path?: string;
			props: {
				polymorphicId?: string;
				documentId?: string;
				staffNumber?: string;
				staffDbId?:string
				size?: IModalSize;
				isFromRequest?: false;
			};
		};
	};
}

export interface APIQueryParams {
	pageNumber?: number;
	pageSize?: number;
	search: string;
	startDate?: string;
	endDate?: string;
	requestType?: string;
}

export type DocumentKind =
	| ''
	| 'all'
	| 'new-registeration'
	| 'biodata'
	| 'bank-update'
	| 'family-details'
	| 'children-details'
	| 'professional-license'
	| 'accommodation'
	| 'leave_plan'
	| 'leave_request';

export type DocumentType = 'NEW REGISTRATION' | 'BANK UPDATE';

export type DocumentStatus = 'PENDING' | 'APPROVED' | 'APPOINTED' | 'ACTIVE';

interface IBaseAppointment {
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
	step: string;
	speciality: { id: string; specialityName: string };
	grade: {
		id: string;
		createdAt: string;
		updatedAt: string;
		categoryId: string;
		gradeName: string;
		level: string;
		scale: string;
		marketPremium: number;
		minimunStep: number;
		maximumStep: number;
		category: null;
		steps: null;
	};
	staff: null;
}

interface IUnit {
	id: string;
	unitName: string;
}

interface IDepartment {
	id: string;
	departmentName: string;
}

interface IDirectorate {
	id: string;
	directorateName: string;
}

interface ISpeciality {
	id: string;
	specialityName: string;
}

interface IStaffPosting {
	id: string;
	staffId: string;
	directorateId: string;
	departmentId: string;
	unitId: string;
	createdAt: string;
	updatedAt: string;
	postingDate: string;
}

export type IPromotionType = 'Special' | 'First' | 'Subsquent';

export interface IStaff {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	lastSeen: null | Date;
	title: string;
	gpsAddress: string;
	staffIdentificationNumber: string;
	firstName: string;
	lastName: string;
	otherNames: string;
	specialityId: null | string;
	dateOfBirth: string;
	phone: string;
	gender: string;
	snnitNumber: string;
	email: string;
	disability: string;
	passportPicture: string;
	ecowasCardNumber: string;
	isApproved: boolean;
	isAlterable: boolean;
	user: null | any;
	unit: null | any;
	speciality: null | any;
	bankDetail: null | any;
	familyDetail: null | any;
	professionalLincense: null | any;
	staffChildren: null | any;
	staffAccomodation: null | any;
	currentAppointment: null | any;
	appointmentHistory: null | any;
	isDuePromtion?: boolean;
	promotionType?: IPromotionType;
}

export interface IStaffByID {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	title: string;
	gpsAddress: string;
	staffIdentificationNumber: string;
	firstName: string;
	lastName: string;
	otherNames: string;
	dateOfBirth: string;
	phone: string;
	gender: string;
	snnitNumber: string;
	email: string;
	disability: string;
	passportPicture: string;
	ecowasCardNumber: string;
	status: string;
	isApproved: boolean;
	isAlterable: boolean;
	unit: IUnit | null;
	department: IDepartment | null;
	directorate: IDirectorate | null;
	staffPosting: IStaffPosting | null;
	speciality: ISpeciality | null;
	category: null;
	currentAppointment: IBaseAppointment;
	firstAppointment: IBaseAppointment;
	isDuePromtion?: boolean;
	promotionType?: IPromotionType;
}

export interface IStaffHeader {
	passportPicture: string;
	fullName: string;
	status: string;
	staffId: string;
	directorate: string;
	department: string;
	unit: string;
	email: string;
	phone: string;
}

export type StaffNumberPrefix = 'MS' | 'CS' | 'AS' | 'TS';

export interface DecodedSession {
	exp: number;
	// Add other properties as needed
}
