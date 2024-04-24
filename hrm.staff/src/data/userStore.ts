import type { IRouteItems } from '$lib/types';
import { writable } from 'svelte/store';

const allMenuItems: IRouteItems[] = [
	{
		title: 'Basics',
		items: [
			{ label: 'Home', icon: 'radix-icons:dashboard', path: '/home' },
			{ label: 'Staff Details', icon: 'medical-icon:i-registration', path: '/staffdetails' },
			{ label: 'Leave', icon: 'clarity:calendar-line', path: '/leave' },
			{
				label: 'Appraisal',
				icon: 'healthicons:register-book',
				path: '/appraisal',
				iconSize: 25
			},
			{
				label: 'Enquiries',
				icon: 'fluent:chat-mail-20-regular',
				path: '/enquiries',
				iconSize: 25
			},
			// {
			// 	label: 'Settings',
			// 	icon: 'clarity:cog-line',
			// 	path: '/settings',
			// 	iconSize: 20
			// }
		]
	},
	{
		title: 'Admin',
		items: [
			{
				label: 'Approvals',
				icon: 'material-symbols:verified-outline',
				path: '/approvals',
				iconSize: 22,
				count: 10
			}
		]
	}
];

export let menuItems = writable<IRouteItems[]>(allMenuItems);
