import type { IApplicantInfo, IUserInfo } from '$lib/types';
import { writable } from 'svelte/store';
import axios from 'axios';
import { axiosError, callResult, queryResult } from './shared';
import { axiosInstance } from '$routes/+layout.svelte';
// import axiosInstance from '$lib/axios';

export const userInfo = writable<IUserInfo | null>();
export const applicantInfo = writable<IApplicantInfo | null>();
export const isAuthenticated = writable(false);
export const authToken = writable<string>('');

export const APPLICANT_LOGIN_KEY = 'applicant_login';
export const STAFF_LOGIN_KEY = 'staff_login';

function extractNumber(input: string): string {
	const trimmed = input.replace(/^0+/, '');
	return trimmed;
}

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

export function initNewStaff(data: IApplicantInfo) {
	applicantInfo.set(data);
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

export async function loginNewStaff(data: { contact: string; otp: string }) {
	try {
		const ret = await axiosInstance.post(`/applicant/login`, {
			...data,
			contact: extractNumber(data.contact)
		});
		// console.log('here', ret);
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function generateOtp(phoneNumber: string) {
	try {
		const d = extractNumber(phoneNumber);
		const ret = await axiosInstance.get(`/applicant/generate-otp/${d}`);
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
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
