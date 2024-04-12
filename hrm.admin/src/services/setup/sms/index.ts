import type { ICampaignTemplate, IPageInfo } from '$lib/types';

const x: ICampaignTemplate[] = [
	{
		id: 1,
		name: 'New Recruitment',
		notes: '',
		message: 'Welcome to ',
		category: '',
		isSystemTemplate: true
	},
	{
		id: 2,
		name: 'Birth day wishes',
		notes: '',
		message: `Hi {{firstName}},
		We wish you a happy birthday.`,
		category: '',
		isSystemTemplate: false
	}
];
export function readSmsTemplates(): Promise<{
	success: boolean;
	message: string;
	status: number
	data: { totalCount: number; pageInfo: IPageInfo; items: ICampaignTemplate[] };
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

export function readSmsTemplate(id: number): Promise<{
	success: boolean;
	message: string;
	data: ICampaignTemplate | undefined;
}> {
	return new Promise((resolve) => {
		setTimeout(() => {
			const y = x.find((x) => x.id === id);

			resolve({
				success: true,
				message: 'success',
				data: y
			});
		}, 1000);
	});
}

export function createSmsTemplates(input: any): Promise<{
	success: boolean;
	message: string;
}> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				success: true,
				message: 'Successfully created template'
			});
		}, 700);
	});
}

export function updateSmsTemplates(input: any): Promise<{
	success: boolean;
	message: string;
}> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				success: true,
				message: 'Successfully updated template'
			});
		}, 700);
	});
}

export function deleteSmsTemplates(id: number): Promise<{
	success: boolean;
	message: string;
}> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				success: true,
				message: 'Successfully deleted template'
			});
		}, 1000);
	});
}
