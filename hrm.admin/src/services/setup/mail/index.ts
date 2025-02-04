import type { ICampaignTemplate } from "..";

const x: ICampaignTemplate[] = [
	{
		id: 1,
		name: 'New Recruitment',
		notes: '',
		message: 'Welcome to ',
		category: '',
		isSystemTemplate: true,
		subject: 'Offer letter'
	},
	{
		id: 2,
		name: 'Birth day wishes',
		notes: '',
		message: `Dear {{firstName}},
		We wish you a happy birthday.`,
		category: '',
		isSystemTemplate: false,
		subject: 'Happy Birthday'
	}
];

export function readMailTemplates(): Promise<{
	success: boolean;
	message: string;
	status: number;
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

export function readMailTemplate(id: number): Promise<{
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

export function createMailTemplates(input: any): Promise<{
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

export function updateMailTemplates(input: any): Promise<{
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

export function deleteMailTemplates(id: number): Promise<{
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
