import type { IMenuItem } from '$lib/types';

const dataPages: IMenuItem[] = [
	{
		title: 'Templates',
		items: [
			{
				title: 'SMS',
				description: 'Manage all SMS templates',
				icon: 'fa-solid:sms',
				path: '/applicationsetup/sms',
				iconBg: 'bg-blue-300'
			},
			{
				title: 'Mail',
				description: 'Manage all mail templates',
				iconBg: 'bg-yellow-300',
				icon: 'uiw:mail',
				path: '/applicationsetup/mail'
			}
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
