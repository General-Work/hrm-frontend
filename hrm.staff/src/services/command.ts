import { writable } from 'svelte/store';

export const showSearchBox = writable(false);
export const recentSearches = writable([
	{
		title: 'Leave Request',
		icon: 'clarity:folder-line',
		subTitle: 'Jump to...',
		date: new Date(),
		hint: '',
		action: '',
		props: {},
		help: []
	},
	{
		title: 'Change Password',
		icon: 'ion:folder-outline',
		subTitle: '',
		date: new Date(),
		hint: '',
		action: '',
		props: {},
		help: []
	}
]);
export const quickActions = writable([]);
export const searchResult = writable<any[]>([]);


export async function search(term: string) {
	// console.log('searching for', term);
	if (!term) {
		searchResult.set([]);
		quickActions.set([]);
		return true;
	}
	searchResult.set([]);
}

