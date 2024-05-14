import type { IUserInfo } from '$lib/types';
import { writable } from 'svelte/store';
import axios from 'axios';

export const userInfo = writable<IUserInfo | null>();
export const isAuthenticated = writable(false);
export const authToken = writable<string>('');

export const LOGIN_KEY = 'hrm_admin_log_in';

export const userData: IUserInfo = {
	id: 1,
	firstName: 'Theophilus',
	surname: 'Adusei',
	otherNames: '',
	fullName: 'Theophilus Adusei',
	profileImage:
		'https://t3.ftcdn.net/jpg/03/73/52/24/360_F_373522464_UzkM3IvqgqpS0qIy2kpkB5QiV7Bw7NyS.jpg',
	initials: 'TA',
	email: 'tadusei@mail.com',
	status: 'Active',
	role: 'Developer',
	roleId: 1,

	permissions: ['*'],
	tags: ['*']
};

export function userInit() {
	userInfo.set(userData);
}

export function clearUser() {
	userInfo.set(null);
}

export function loginUser(data: { staffId: string; password: string }) {
	return axios.post('/login', data);
}

export function logoutUser() {
	return axios.delete('/login');
}
