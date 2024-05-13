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

export function axiosError(response: any): IFailureResult {
	if (response.status >= 200 && response.status < 300) {
		// Successful response, return success: true
		return { success: false, message: 'Success', status: response.status };
	} else {
		// Handle error response
		const errorMessage =
			(response.data && response.data.message) ||
			(response.statusText && response.statusText) ||
			(response.data && response.detail && response.detail.map((x: any) => x.msg).join(' , ')) ||
			response.message;
		('Unknown error');

		return { success: false, message: errorMessage, status: response.status };
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
