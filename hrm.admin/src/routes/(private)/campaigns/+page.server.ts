import type { IMenuItem } from '$lib/types';

const dataPages: IMenuItem[] = [
	{
		title: 'General',
		items: [
			{
				title: 'SMS',
				description: 'Manage all SMS campaigns',
				icon: 'fa-solid:sms',
				path: '/campaigns/sms',
				iconBg: 'bg-blue-300'
			},
			{
				title: 'Mail',
				description: 'Manage all mail campaigns',
				iconBg: 'bg-yellow-300',
				icon: 'uiw:mail',
				path: '/campaigns/mail'
			}
		]
	}
];

export async function load() {
	return {
		pages: dataPages
	};
}
