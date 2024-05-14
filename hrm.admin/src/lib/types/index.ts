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

export interface IRouteItem {
	name: string;
	items: IMenuItem[];
}

export interface IUserInfo {
	id: number;
	email: string;
	firstName: string;
	surname: string;
	otherNames: string;
	fullName: string;
	profileImage: string | null;
	role: string;
	roleId: number;
	status: string;
	initials: string;
	permissions: string[];
	tags: string[];
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

export interface IStaff {
	id: string;
	createdAt: string;
	updatedAt: string;
	lastSeen: string | null;
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
	isApproved: boolean;
	user: any | null; // Replace 'any' with the actual type if known
	unit: any | null; // Replace 'any' with the actual type if known
	speciality: any | null; // Replace 'any' with the actual type if known
	bankDetail: any | null; // Replace 'any' with the actual type if known
	familyDetail: any | null; // Replace 'any' with the actual type if known
	professionalLincense: any | null; // Replace 'any' with the actual type if known
	staffChildren: any | null; // Replace 'any' with the actual type if known
	staffAccomodation: any | null; // Replace 'any' with the actual type if known
}
