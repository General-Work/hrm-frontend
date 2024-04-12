import type { IMenuItem } from '$lib/types';

const dataPages: IMenuItem[] = [
	{
		title: 'General',
		items: [
			{
				title: 'Category',
				description: 'Manage all categories',
				icon: 'tabler:category-2',
				path: '/salarysetup/category',
				iconBg: 'bg-blue-300'
			},
			{
				title: 'Specialty',
				description: 'Manage all specialties',
				iconBg: 'bg-yellow-300',
				icon: 'tabler:category-2',
				path: '/salarysetup/specialty'
			},
			{
				title: 'Grade',
				description: 'Manage all grades',
				iconBg: 'bg-pink-300',
				icon: 'tabler:category-2',
				path: '/salarysetup/grade'
			}
		]
	}
];

export async function load() {
	return {
		pages: dataPages
	};
}
