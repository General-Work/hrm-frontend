<script lang="ts" context="module">
	import axios, { AxiosError } from 'axios';

	const url = 'https://hrm-backend-vsa-delicate-rain-4100.fly.dev/api'
	export const axiosInstance = axios.create({
		baseURL: url,
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json' // Add any additional headers as needed
		}
	});

	let token = '';

	axiosInstance.interceptors.request.use(
		function (config) {
			if (token) {
				config.headers['Authorization'] = `Bearer ${token}`;
			} else {
				delete config.headers['Authorization'];
			}
			return config;
		},
		function (error) {
			return Promise.reject(error);
		}
	);

	axiosInstance.interceptors.response.use(
		async (response) => {
			return response;
		},
		async (error: AxiosError) => {
			if (error.response?.status == 401) {
				// await signOut({
				//   redirect: false,
				// });
				// window.location.assign(encodeURIComponent(`/login`));
				// axios.delete('/login');
			}
			return Promise.reject(error);
		}
	);
</script>

<script>
	import './styles.css';
	import 'iconify-icon';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { endProgress, hideSpinner, startProgress } from '$lib/utils';
	import { Toaster } from 'svelte-french-toast';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	import { authToken } from '$svc/auth';

	dayjs.extend(relativeTime);
	dayjs.extend(advancedFormat);

	beforeNavigate(() => {
		startProgress();
	});

	afterNavigate(() => {
		endProgress();
	});

	hideSpinner();

	authToken.subscribe((val) => (token = val));
</script>

<Toaster
	toastOptions={{
		style: 'background: #363636; color: #fff;'
	}}
/>
<slot />
