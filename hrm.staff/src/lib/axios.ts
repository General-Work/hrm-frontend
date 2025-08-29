import { authToken } from '$svc/auth';
import axios from 'axios';

const url = import.meta.env.VITE_SERVER_URL;
export const axiosInstance = axios.create({
	baseURL: url,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json' // Add any additional headers as needed
	}
});

axiosInstance.interceptors.request.use(
	async (config) => {
		let token = '';
		authToken.subscribe((val) => (token = val));
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const setAuthToken = (token: string) => {
	if (token) {
		axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete axiosInstance.defaults.headers.common['Authorization'];
	}
};

export default axiosInstance;
