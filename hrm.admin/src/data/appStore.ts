import { createBreadCrumb } from '$lib/utils';
import type { IRouteInfo } from '$lib/types';
import { writable } from 'svelte/store';

export let activePage = writable<IRouteInfo>({
	title: 'Dashboard',
	showBreadCrumb: false
});

export const breadCrumb = createBreadCrumb();
export const showPageLoader = writable(false);
export const hideRightDrawer = writable(true);
