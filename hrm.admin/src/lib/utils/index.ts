import type { IBreadCrumb } from '$cmps/ui/breadCrumb.svelte';
import { type ClassValue, clsx } from 'clsx';
import { writable } from 'svelte/store';
// import { userInfo } from '$svc/auth';
import { twMerge } from 'tailwind-merge';
import { toast, type ToastOptions } from 'svelte-french-toast';
import { nanoid } from 'nanoid';
import NProgress from 'nprogress';
import type { DecodedSession, IPageInfo, ITableDataProps, StaffNumberPrefix } from '../types';
import { crossfade } from 'svelte/transition';
import { quintOut } from 'svelte/easing';

// export const deployedAppURL = 'http://localhost:5181';
// export const deployedAppURL = 'https://hrm-admin-rust.vercel.app';
export const deployedAppURL = import.meta.env.VITE_AUTH_URL;

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export function validatePhoneNumber(value: string) {
	const phoneRegex = /^\d{10}$/;
	return phoneRegex.test(value);
}
export const [send, receive] = crossfade({
	duration: (d) => Math.sqrt(d * 200),

	fallback(node, params) {
		const style = getComputedStyle(node);
		const transform = style.transform === 'none' ? '' : style.transform;

		return {
			duration: 600,
			easing: quintOut,
			css: (t) => `
				        transform: ${transform} translateX(${(1 - t) * 100}%);
				opacity: ${t}
			`
		};
	}
});

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
	return toast.success(err, { id: `${id}-${err}`, duration: 6000, ...options });
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

export function extractQueryParam(queryString: string, index: string = 'q'): string {
	const urlParams = new URLSearchParams(queryString);
	const warehouse = urlParams.get(index);
	return warehouse ?? '';
}

export function extractMultipleSearchParams(queryString: string) {
	const searchParams = new URLSearchParams(queryString);
	const paramsObject: { [key: string]: string } = {};

	searchParams.forEach((value, key) => {
		paramsObject[key] = value;
	});
	return paramsObject;
}

export function isPdf(path: string) {
	return path.toLowerCase().includes('pdf');
}

export function addCommasToNumber(val: number | string) {
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export function validateGhanaCard(value: string) {
	const reqex = /^GHA-\d{9}-\d{1}$/;
	return reqex.test(value);
}

export function addQueryParams(
	pathname: string,
	searchParams: URLSearchParams,
	data?: Record<string, any>
): string {
	const current = new URLSearchParams(Array.from(searchParams.entries()));

	if (data) {
		Object.entries(data).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value) {
				current.set(key, String(value));
			} else {
				current.delete(key);
			}
		});
	}

	const params = current.toString();
	const query = params ? `?${params}` : '';
	return `${pathname}${query}`;
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

export function isStaffNumber(val: string) {
	const prefixes: StaffNumberPrefix[] = ['MS', 'CS', 'AS', 'TS'];
	return prefixes.some((prefix) => val.startsWith(prefix));
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

export function generateDataTableProps<T>(data: {
	totalCount: number;
	totalPages: number;
	currentPage: number;
	pageSize: number;
	nextPageUrl: string | null;
	previousPageUrl: string | null;
	links: string[];
	path: string;
	data: T[];
}): ITableDataProps<T> {
	return {
		currentPage: data.currentPage,
		pageSize: data.pageSize,
		pageInfo: {
			hasNextPage: data.nextPageUrl?.length ? true : false,
			hasPreviousPage: data.previousPageUrl ? true : false,
			nextPageUrl: data.nextPageUrl ?? '',
			previousPageUrl: data.previousPageUrl ?? '',
			links: data.links,
			path: data.path
		},
		totalCount: data.totalCount,
		totalPages: data.totalPages,
		items: data.data
	};
}

interface QueryParams {
	[key: string]: string;
}

export function parseQueryParams(url: string): { baseUrl: string; queryParams: QueryParams } {
	const queryParams: QueryParams = {};
	const queryStringStartIndex = url.indexOf('?');
	let baseUrl = url;

	if (queryStringStartIndex !== -1) {
		baseUrl = url.substring(0, queryStringStartIndex);
		const queryString = url.slice(queryStringStartIndex + 1);

		const pairs = queryString.split('&');

		pairs.forEach((pair) => {
			const [key, value] = pair.split('=');
			if (value !== undefined) {
				queryParams[key] = decodeURIComponent(value);
			}
		});
	}

	return { baseUrl, queryParams };
}

export function isSessionExpired(session: DecodedSession): boolean {
	console.log(session.exp);
	console.log(new Date(session.exp));
	console.log(new Date(1719185536317));
	return new Date(session.exp * 1000) < new Date();
}

export function convertIsoToTimestamp(isoDateString: string): number {
	const date = new Date(isoDateString);
	return date.getTime();
}
