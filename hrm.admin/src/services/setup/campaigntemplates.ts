import axiosInstance from '$lib/axios';
import type { APIQueryParams } from '$lib/types';
import { axiosError, callResult, queryResult } from '$svc/shared';

export interface ICampaignTemplate {
	id: string;
	name: string;
	message: string;
	createdAt: Date;
	updatedAt: Date;
	description: string;
	readOnly: boolean;
}

interface CampaigntemplateDto {
	message: string;
	description: string;
}

export async function readSmsTemplates(params?: APIQueryParams) {
	try {
		const ret = params
			? await axiosInstance.get('/sms-template/all', {
					params: { ...params, sort: 'updatedAt_desc' }
				})
			: await axiosInstance.get('/sms-template/all');
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function postSmsTemplates(input: CampaigntemplateDto) {
	try {
		const ret = await axiosInstance.post('/sms-template', input);
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function updateSmsTemplates(id: string, data: CampaigntemplateDto) {
	try {
		const ret = await axiosInstance.patch(`/sms-template/${id}`, data);
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function deleteSmsTemplates(id: string) {
	try {
		const ret = await axiosInstance.delete(`/sms-template/${id}`);
		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}
