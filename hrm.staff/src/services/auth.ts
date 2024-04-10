import type { IUserInfo } from '$lib/types';
import { writable } from 'svelte/store';
import axios from 'axios';

export const userInfo = writable<IUserInfo | null>();
export const isAuthenticated = writable(false);

export const LOGIN_KEY = 'logged_in';

export const newStaffData: IUserInfo = {
	id: 1,
	email: '',
	firstName: 'Yaw',
	surname: 'Kyei',
	otherNames: '',
	fullName: 'Yaw Kyei',
	profileImage: '',
	initials: 'YK',
	isNewStaff: true,
	phoneNumber: '0123456789',
	staffId: ''
};

export function initNewStaff() {
	userInfo.set(newStaffData);
}

export function clearNewStaffInit() {
	userInfo.set(null);
}

export function initStaff() {
	userInfo.set({
		id: 1,
		email: '',
		firstName: 'Yaw',
		surname: 'Kyei',
		otherNames: '',
		fullName: 'Yaw Kyei',
		profileImage:
			'https://t3.ftcdn.net/jpg/03/73/52/24/360_F_373522464_UzkM3IvqgqpS0qIy2kpkB5QiV7Bw7NyS.jpg',
		staffId: 'MS00017',
		initials: 'YK',
		isNewStaff: false,
		phoneNumber: '0123456789'
	});
}

export function clearInitStaff() {
	userInfo.set(null);
}

export function loginNewStaff(data: { phoneNumber: string; otp: string }) {
	return axios.post('/register', data);
}

export function logoutNewStaff() {
	return axios.delete('/register');
}

export function loginStaff(data: { staffId: string; password: string }) {
	return axios.post('/login', data);
}

export function logoutStaff() {
	return axios.delete('/login');
}
