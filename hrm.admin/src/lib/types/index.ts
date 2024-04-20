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

export type DocumentType = 'NEW REGISTRATION' | "BANK UPDATE";
