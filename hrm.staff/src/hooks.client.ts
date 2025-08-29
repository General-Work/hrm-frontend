import { isAuthenticated, userType, type IUserType } from '$svc/auth';
import { get } from 'svelte/store';

const currentLocation = window.location.pathname;
function load() {
	if (currentLocation === '/') {
		window.location.href = '/login';
	}

	userType.subscribe((type) => {
		isAuthenticated.subscribe((authenticated) => {
			if (authenticated) {
				if (type === 'STAFF' && currentLocation === '/login') {
					window.location.href = '/home';
				}
			}
		});
	});
}

load();
