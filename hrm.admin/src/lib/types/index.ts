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

type ViewerKind = 'inlineViewer' | 'modalViewer';

export interface IRequestAction {
	kind: IButtonConfigKind;
	label: string;
	subLabel?: string;
	cmd: {
		action: ViewerKind;
		args: {
			type: string;
			title: string;
			props: {
				documentId: string;
				staffNumber?: string;
				size?: IModalSize;
			};
		};
	};
}

export interface APIQueryParams {
	pageNumber: number;
	pageSize: number;
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
	| 'accomodation'
	| 'leave_plan'
	| 'leave_request';

export type DocumentType = 'NEW REGISTRATION' | 'BANK UPDATE';

export type DocumentStatus = 'PENDING' | 'APPROVED' | 'APPOINTED';

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
}
