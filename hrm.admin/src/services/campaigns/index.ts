import type { APIQueryParams, IPageInfo } from '$lib/types';
import { axiosInstance } from '$routes/+layout.svelte';
import { axiosError, callResult, queryResult } from '$svc/shared';
import type { AxiosResponse } from 'axios';

const x = [
	{
		id: 1,
		name: 'Campaign 1',
		frequency: 'DAILY',
		startDate: new Date(),
		endDate: new Date(),
		time: new Date(),
		numberOfRuns: 4,
		status: 'ACTIVE'
	},
	{
		id: 1,
		name: 'Campaign W',
		frequency: 'WEEKLY',
		startDate: new Date(),
		endDate: new Date(),
		time: new Date(),
		numberOfRuns: 4,
		status: 'SUSPENDED'
	}
];
export interface ISMSCampaign {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	campaignName: string;
	smsTemplateId: string;
	message: string;
	receipients: number;
	smsTemplate: null | any;
	smsReceipients: null | any;
}

export interface SMSCampaignDto {
	campaingName: string;
	smsTemplateId: string;
	message: string;
	frequency: string;
	staffIds: string[];
	templateFile: File;
	directorateId: string[];
	departmentId: string[];
	unitId: string[];
	professionId: string[];
	startDate: any;
	endDate: any;
	time: any;
}
export async function readSmsCampaigns(params?: APIQueryParams) {
	try {
		const ret = params
			? await axiosInstance.get('/sms-campaign/all', {
					params: { ...params, sort: 'createdAt_desc' }
				})
			: await axiosInstance.get('/sms-campaign/all');
		return queryResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export async function postSmsCampaign(input: SMSCampaignDto) {
	try {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		};

		const ret: AxiosResponse = await axiosInstance.post('/sms-campaign/create', input, config);

		return callResult(ret, ret.data);
	} catch (error) {
		return axiosError(error);
	}
}

export function readMailCampaigns(): Promise<{
	success: boolean;
	message: string;
	status: number;
	data: { totalCount: number; pageInfo: IPageInfo; items: any[] };
}> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				success: true,
				message: 'success',
				status: 200,
				data: {
					totalCount: x.length,
					pageInfo: {
						hasNextPage: false,
						hasPreviousPage: false,
						nextPageUrl: '',
						previousPageUrl: ''
					},
					items: x
				}
			});
		}, 700);
	});
}
