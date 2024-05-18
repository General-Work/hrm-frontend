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
