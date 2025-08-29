import axiosInstance from '$lib/axios';
import { axiosError, callResult, queryResult } from '$svc/shared';

export interface IBankDto {
	bankId: string;
	accountType: string;
	branch: string;
	accountNumber: string;
	accountName: string;
}

export interface IBankDetail extends IBankDto {
	id: string;
	staffId: string;
	createdAt: Date;
	updatedAt: Date;
	status: 'PENDING';
}

export interface IBank {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	bankName: string;
	staffbankDetails: null;
}

export async function readBankDetails() {
	try {
		const ret = await axiosInstance.get('/staff-request/auth-staff/bank-update');
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function readAllBanks() {
	try {
		const ret = await axiosInstance.get(`/bank/all`);
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function postBankDetails(params: IBankDto) {
	try {
		const ret = await axiosInstance.post('/staff-request/bank-update', params);
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}
