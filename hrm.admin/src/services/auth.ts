import type { IUserInfo } from '$lib/types';
import { writable } from 'svelte/store';
import axios from 'axios';
import { axiosError, queryResult } from './shared';
import axiosInstance from '$lib/axios';

export const userInfo = writable<IUserInfo | null>();
export const isAuthenticated = writable(false);
export const authToken = writable<string>('');

export const LOGIN_KEY = 'hrm_admin_log_in';

export async function loginUser(data: { email: string; password: string }) {
	try {
		const ret = await axiosInstance.post('/auth/user/login', data);
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function accountConfirmation(params: { email: string; otp: string }) {
	try {
		const ret = await axiosInstance.post('/auth/user/two-factor-confirmation', params);
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function readAuthUser() {
	try {
		const ret = await axiosInstance.get('/auth/user');
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export function logoutUser() {
	return axios.delete('/login');
	// if (browser) window.location.reload();
}
