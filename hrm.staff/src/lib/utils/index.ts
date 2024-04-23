import type { IBreadCrumb } from '$cmps/ui/breadCrumb.svelte';
import { type ClassValue, clsx } from 'clsx';
import { writable } from 'svelte/store';
// import { userInfo } from '$svc/auth';
import { twMerge } from 'tailwind-merge';
import { toast, type ToastOptions } from 'svelte-french-toast';
import { nanoid } from 'nanoid';
import NProgress from 'nprogress';
import type { IPageInfo, ITableDataProps } from '$types/types';
import dayjs from 'dayjs';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export function validatePhoneNumber(value: string) {
	const phoneRegex = /^\d{10}$/;
	return phoneRegex.test(value);
}

export function createBreadCrumb() {
	const { subscribe, set, update } = writable<IBreadCrumb[]>([{ title: 'Home' }]);
	return {
		subscribe,
		addToFirstIndex: (newCrumb: IBreadCrumb | IBreadCrumb[], clear = false) => {
			update((value) => {
				if (clear) {
					return Array.isArray(newCrumb) ? [...newCrumb] : [newCrumb];
				}

				if (Array.isArray(newCrumb)) {
					return [...newCrumb, ...value];
				} else if (newCrumb) {
					return [newCrumb, ...value];
				}

				return value;
			});
		},
		addToLastIndex: (newCrumb: IBreadCrumb) => {
			update((value) => {
				if (Array.isArray(newCrumb)) {
					return [...value, ...newCrumb];
				} else if (newCrumb) {
					return [...value, newCrumb];
				}
				return value;
			});
		},
		add: (newCrumb: IBreadCrumb) => {
			update((value) => {
				const newValue = value.slice(0, value.length - 1);

				if (Array.isArray(newCrumb)) {
					return [...newValue, ...newCrumb];
				} else if (newCrumb) {
					return [...newValue, newCrumb];
				}
				return newValue;
			});
		},
		removeFromFront: (index: number) => {
			update((value) => {
				return value.slice(0, index + 1);
			});
		},
		reset: () => set([{ title: 'Home' }])
	};
}

export function getInitials(val?: string) {
	if (!val) return '';
	return val
		.split(' ')
		.filter((x) => x.length > 1)
		.map((x) => x[0])
		.join('');
}

export function getNewInitials(val?: string) {
	if (!val) return '';
	const words = val.split(' ');
	const initials = words.map((word) => word[0]);
	return initials.join('');
}

export const showError = (err: string, options?: ToastOptions) => {
	let id = nanoid();
	return toast.error(err, { id: `${id}-${err}`, duration: 8000, ...options });
};

export const showInfo = (err: string, options?: ToastOptions) => {
	let id = nanoid();
	return toast.success(err, { id: `${id}-${err}`, ...options });
};

interface ToastPromiseOptions {
	promise: Promise<any>;
	loading: string;
	success: string;
	error: string;
	options?: ToastOptions;
}

export const showPromise = async ({
	promise,
	loading,
	success,
	error,
	options
}: ToastPromiseOptions) => {
	let id = nanoid();
	try {
		toast.loading(loading, options);
		const result = await promise;
		toast.success(success, { ...options, id: `${id}-${success}` });
		return result;
	} catch (err) {
		toast.error(error, { ...options, id: `${id}-${error}` });
		throw err;
	}
};

export function extractRedirectToRoute(queryString: string): string | null {
	const match = queryString.split('=')[1];
	return match ? match : null;
}

export function extractQueryParam(queryString: string, index: string = 'q'): string | null {
	const urlParams = new URLSearchParams(queryString);
	const warehouse = urlParams.get(index);
	return warehouse;
}

export function addCommasToNumber(val: number | string) {
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export function validateGhanaCard(value: string) {
	const reqex = /^GHA-\d{9}-\d{1}$/;
	return reqex.test(value);
}

export function startProgress() {
	NProgress.start();
}

export function endProgress() {
	NProgress.done();
}

export function hideSpinner() {
	NProgress.configure({
		showSpinner: false
	});
}

export function generateTableDataProps<T>(
	currentPage: number,
	pageSize: number,
	data: { pageInfo: IPageInfo; totalCount: number; items: T[] }
): ITableDataProps<T> {
	return {
		currentPage,
		pageSize,
		pageInfo: data.pageInfo,
		totalCount: data.totalCount,
		items: data.items
	};
}

export function generateEndDate(startDate: string, countOfDays: number) {
	let currentDate = dayjs(startDate);

	let weekdaysCount = 0;

	while (weekdaysCount < countOfDays) {
		if (currentDate.day() !== 0 && currentDate.day() !== 6) {
			weekdaysCount++;
		}
		currentDate = currentDate.add(1, 'day');
	}

	return currentDate.subtract(1, 'day').format('YYYY-MM-DD');
}
