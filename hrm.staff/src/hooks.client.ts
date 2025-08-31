import { isSessionExpired } from '$lib/utils';
import { accessToken, isAuthenticated, signout, userType, type IUserType } from '$svc/auth';
import { get } from 'svelte/store';

const currentLocation = window.location.pathname;
function load() {
	if (currentLocation === '/') {
		window.location.href = '/login';
	}

	userType.subscribe((type) => {
		isAuthenticated.subscribe((isAuth) => {
			const session = get(accessToken);
			const hasExpired = isSessionExpired(session);

			if (!isAuth) {
				if (hasExpired) {
					signout(type as IUserType);
				}
				return;
			}

			if (hasExpired) {
				signout(type as IUserType);
				return;
			}
			if (isAuth) {
				if (type === 'STAFF' && currentLocation === '/login') {
					window.location.href = '/home';
				}
			}
		});
	});
}

load();
