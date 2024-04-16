import { createBreadCrumb } from '$lib/utils';
import type { DocumentKind, IRouteInfo } from '$lib/types';
import { writable } from 'svelte/store';

export let activePage = writable<IRouteInfo>({
	title: 'Dashboard',
	showBreadCrumb: false
});
export const documentType = writable<DocumentKind>('');

export const breadCrumb = createBreadCrumb();
export const showPageLoader = writable(false);
export const hideRightDrawer = writable(true);
