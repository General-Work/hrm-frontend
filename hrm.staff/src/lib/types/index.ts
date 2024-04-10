export type IMenuItems = {
	icon?: string;
	iconSize?: number;
	label: string;
	path?: string;
	count?: number;
};

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
