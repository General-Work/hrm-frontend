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

export interface ICampaignTemplate {
	id: number;
	name: string;
	notes: string;
	message: string;
	category: string;
	isSystemTemplate: boolean;
	subject?: string | null;
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

export type DocumentKind =
	| ''
	| 'all'
	| 'registration'
	| 'biodata'
	| 'bank'
	| 'family'
	| 'children'
	| 'licence'
	| 'accomodation'
	| 'leave_plan'
	| 'leave_request';
