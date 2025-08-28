import { menuItems } from '$data/userStore';
import type { IRouteItem } from '$lib/types';
import { isAuthenticated } from '$svc/auth';
import { get } from 'svelte/store';

const currentLocation = window.location.pathname;

const authRoutes = getAllPaths();

const load = () => {
	isAuthenticated.subscribe((val) => {
		if (!val) {
		} else if (val && !authRoutes.includes(currentLocation)) {
			window.location.href = '/dashboard';
		}
	});
};

load();

export function getAllPaths(): string[] {
	const items = get(menuItems);

	const paths: string[] = [];

	function collectPaths(routes: IRouteItem[]) {
		for (const route of routes) {
			for (const item of route.items) {
				if (item.path) {
					paths.push(item.path);
				}
			}
		}
	}

	collectPaths(items);
	return paths;
}
