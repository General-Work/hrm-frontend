import type { IMenuItem } from '$lib/types';

const dataPages: IMenuItem[] = [
	{
		title: 'Divisions',
		items: [
			{
				title: 'Directorate',
				description: 'Manage all directorates',
				icon: 'mingcute:department-fill',
				path: '/applicationsetup/directorate',
				iconBg: 'bg-blue-300'
			},
			{
				title: 'Department',
				description: 'Manage all departments',
				iconBg: 'bg-yellow-300',
				icon: 'mingcute:department-fill',
				path: '/applicationsetup/departments'
			},
			{
				title: 'Unit',
				description: "Manage all department's units",
				iconBg: 'bg-green-300',
				icon: 'mingcute:department-fill',
				path: '/applicationsetup/units'
			}
		]
	},
	{
		title: 'Salary',
		items: [
			{
				title: 'Category',
				description: 'Manage all categories',
				icon: 'tabler:category-2',
				path: '/applicationsetup/category',
				iconBg: 'bg-blue-300'
			},
			{
				title: 'Specialty',
				description: 'Manage all specialties',
				iconBg: 'bg-yellow-300',
				icon: 'tabler:category-2',
				path: '/applicationsetup/specialty'
			},
			{
				title: 'Grade',
				description: 'Manage all grades',
				iconBg: 'bg-pink-300',
				icon: 'tabler:category-2',
				path: '/applicationsetup/grade'
			}
		]
	},
	{
		title: 'Leave',
		items: [
			// {
			// 	title: 'Staff Leave Balance',
			// 	description: 'Manage staff leave balance',
			// 	iconBg: 'bg-yellow-300',
			// 	icon: 'bi:calendar2-date-fill',
			// 	path: ''
			// },
			{
				title: 'Holidays',
				description: 'Manage all holidays within the year',
				icon: 'clarity:date-solid-badged',
				path: '/applicationsetup/holidays',
				iconBg: 'bg-blue-300'
			},
			{
				title: 'Plan Year',
				description: 'Manage plan year for leave scheduling',
				iconBg: 'bg-pink-300',
				icon: 'iwwa:year',
				path: '/applicationsetup/planyear'
			},
			{
				title: 'Leave Year',
				description: 'Manage leave year for leave scheduling',
				iconBg: 'bg-green-300',
				icon: 'iwwa:year',
				path: '/applicationsetup/leaveyear'
			},
			{
				title: 'Leave Type',
				description: 'Manage leave types and its policies',
				iconBg: 'bg-sky-300',
				icon: 'mingcute:department-fill',
				path: '/applicationsetup/leavetypes'
			}
		]
	},
	{
		title: 'Promotions',
		items: [
			{
				title: 'Promotion Types',
				description: 'Manage all types of promotions',
				icon: 'carbon:category-new-each',
				path: '/applicationsetup/promotiontypes'
			}
		]
	},

	{
		title: 'General',
		items: [
			{
				title: 'Man Power Levels',
				description: 'Manage man power levels for staffing',
				icon: 'fa6-solid:people-line',
				path: '/applicationsetup/manpowerlevels',
				iconBg: 'bg-blue-300'
			},
			{
				title: 'Professional Bodies',
				description: 'Manage all professional bodies',
				iconBg: 'bg-yellow-300',
				icon: 'vaadin:institution',
				path: '/applicationsetup/professionalbodies'
			},
			{
				title: 'Events',
				description: 'Manage all events with in the year',
				iconBg: 'bg-sky-300',
				icon: 'clarity:event-solid-badged',
				path: '/applicationsetup/events'
			},
			{
				title: 'Bank',
				description: 'Manage all banks',
				iconBg: 'bg-pink-300',
				icon: 'clarity:bank-solid',
				path: '/applicationsetup/banks'
			}
		]
	},
	{
		title: 'Templates',
		items: [
			{
				title: 'Campaigns',
				description: 'Manage all campaigns templates',
				icon: 'fa-solid:sms',
				path: '/applicationsetup/sms',
				iconBg: 'bg-blue-300'
			}
			// {
			// 	title: 'Mail',
			// 	description: 'Manage all mail templates',
			// 	iconBg: 'bg-yellow-300',
			// 	icon: 'uiw:mail',
			// 	path: '/applicationsetup/mail'
			// }
		]
	},
	{
		title: 'Security',
		items: [
			{
				title: 'Roles',
				description: 'Manage all Roles',
				icon: 'fluent:person-tag-20-filled',
				path: '/applicationsetup/roles',
				iconBg: 'bg-sky-300'
			}
		]
	}
];

export async function load() {
	return {
		pages: dataPages
	};
}
