import type { IMenuItem } from '$types/appTypes';

export const dataPages: IMenuItem[] = [
	{
		title: 'Templates',
		items: [
			{
				title: 'SMS',
				description: 'Manage all SMS templates',
				icon: 'fa-solid:sms',
				path: '/private/setup/sms',
				iconBg: 'bg-blue-300'
			},
			{
				title: 'Mail',
				description: 'Manage all mail templates',
				iconBg: 'bg-yellow-300',
				icon: 'uiw:mail',
				path: '/private/setup/mail'
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
				path: '/private/setup/roles',
				iconBg: 'bg-sky-300'
			}
		]
	}
];
