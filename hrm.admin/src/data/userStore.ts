import type { IRouteItem } from '$lib/types';
import { writable } from 'svelte/store';

const routesItems: IRouteItem[] = [
	{
		name: 'Basics',
		items: [
			{
				title: 'Dashboard',
				icon: 'radix-icons:dashboard',
				path: '/dashboard'
			},
			{
				title: 'Staff Requests',
				icon: 'medical-icon:i-registration',
				path: '/staffrequests'
			},
			{
				title: 'Staff Records',
				icon: 'vaadin:records',
				path: '/staffrecords'
			},
			{
				title: 'Campaigns',
				icon: 'ion:megaphone',
				path: '/campaigns'
			},
			{
				title: 'Interviews',
				icon: 'clarity:employee-group-solid',
				path: '/interviews'
			}
			// {
			// 	title: 'Reports*',
			// 	icon: 'mdi:report-bar',
			// 	path: '/reports'
			// }
		]
	},

	{
		name: 'Promotions',
		items: [
			{
				title: 'Staff Due Promotion',
				icon: 'famicons:people',
				path: '/duepromotion'
			}
		]
	},

	{
		name: 'Setups',
		items: [
			{
				title: 'User Management',
				icon: 'clarity:administrator-solid',
				path: '/usermanagement'
			},
			// {
			// 	title: 'Salary Setup',
			// 	icon: 'solar:wallet-money-bold',
			// 	path: '/salarysetup'
			// },
			{
				title: 'Application Setup',
				icon: 'mdi:database-cog-outline',
				path: '/applicationsetup'
			}
		]
	}
];

export let menuItems = writable<IRouteItem[]>(routesItems);
