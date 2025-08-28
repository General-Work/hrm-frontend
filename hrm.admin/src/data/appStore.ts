import { createBreadCrumb } from '$lib/utils';
import type { DocumentKind, IRouteInfo, ISideMenu } from '$lib/types';
import { writable } from 'svelte/store';

export let activePage = writable<IRouteInfo>({
	title: 'Dashboard',
	showBreadCrumb: false
});
export const documentType = writable<DocumentKind>('');

export const breadCrumb = createBreadCrumb();
export const showPageLoader = writable(false);
export const hideRightDrawer = writable(true);
export const sideQuickActions = writable<ISideMenu>();

export const modalConfig = writable({
	show: false,
	title: '',
	size: 'xs',
	componentConfig: null,
	onDone: (refresh: boolean) => {}
});

export const documentKinds = {
	all: {
		icon: 'ph:files',
		title: 'All Requests',
		path: 'all',
		iconBg: 'bg-green-200'
	},
	registration: {
		icon: 'game-icons:archive-register',
		title: 'New Registration',
		path: 'new-registeration',
		iconBg: 'bg-orange-200'
	},
	biodata: {
		icon: 'solar:money-bag-bold',
		title: 'Biodata',
		path: 'biodata',
		iconBg: 'bg-blue-200'
	},
	bank: {
		icon: 'solar:money-bag-bold',
		title: 'Bank Update',
		path: 'bank-update',
		iconBg: 'bg-blue-200'
	},
	family: {
		icon: 'solar:money-bag-bold',
		title: 'Family Details',
		path: 'family-details',
		iconBg: 'bg-blue-200'
	},
	children: {
		icon: 'solar:money-bag-bold',
		title: 'Children Details',
		path: 'children-details',
		iconBg: 'bg-blue-200'
	},
	licence: {
		icon: 'solar:money-bag-bold',
		title: 'Professional Licence',
		path: 'professional-licence',
		iconBg: 'bg-blue-200'
	},
	accomodation: {
		icon: 'solar:money-bag-bold',
		title: 'Accomodation',
		path: 'accommodation',
		iconBg: 'bg-blue-200'
	}
	// leave_plan: {
	// 	icon: 'solar:money-bag-bold',
	// 	title: 'Annual Leave Plan',
	// 	path: 'leave_plan',
	// 	iconBg: 'bg-blue-200'
	// },
	// leave_request: {
	// 	icon: 'solar:money-bag-bold',
	// 	title: 'Leave Request',
	// 	path: 'leave_request',
	// 	iconBg: 'bg-blue-200'
	// }
};
