import type { AxiosResponse } from 'axios';
interface IFailureResult {
	success: false;
	message: string;
	status?: number;
}

interface IOk {
	success: true;
	message: string;
}
export interface IOkResult<T> {
	success: true;
	message: string;
	data: T;
}

export function axiosError(error: any): IFailureResult {
	if (error.response.status >= 200 && error.response.status < 300) {
		// Successful error, return success: true
		return { success: false, message: 'Success' };
	} else {
		// Handle error error
		const errorMessage =
			(error.response.data && error.response.data.message) ||
			(error.response.statusText && error.response.statusText) ||
			(error.response.data &&
				error.response.detail &&
				error.response.detail.map((x: any) => x.msg).join(' , ')) ||
			error.response.message;
		('Unknown error');

		return { success: false, message: errorMessage };
	}
}

export function queryResult<R, T>(
	rawResponse: any,
	data: T
): IFailureResult | IOkResult<NonNullable<T>> {
	if (rawResponse.errors) {
		return {
			success: false,
			status: rawResponse.status ?? 400,
			message: rawResponse.errors.map((x: any) => x.message).join('.\n')
		};
	}

	return { success: true, message: '', data: data as NonNullable<T> };
}

export function callResult<R>(rawResponse: AxiosResponse<R>, result: any) {
	if (rawResponse.status >= 400) {
		return <IFailureResult>{
			success: false,
			status: rawResponse.status,
			message: `Request failed with status ${rawResponse.status}: ${rawResponse.statusText}`
		};
	}

	if (typeof result === 'string' && result === '') {
		return <IOk>{ success: true, message: '' };
	}
	if (!result) {
		return <IFailureResult>{
			success: false,
			status: rawResponse.status,
			message: 'No valid response was received'
		};
	}
	return <IOk>{ success: true, message: result ?? '' };
}
