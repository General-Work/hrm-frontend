import axios from 'axios';
const url = 'https://hrm-backend-vsa.fly.dev/api'
// console.log(url);
// Create an Axios instance
const axiosInstance = axios.create({
	baseURL: url,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json' // Add any additional headers as needed
	}
});

// axiosInstance.interceptors.request.use(
// 	function (config) {
// 		console.log('Request interceptor triggered');
// 		return config;
// 	},
// 	function (error) {
// 		return Promise.reject(error);
// 	}
// );

// axiosInstance.interceptors.response.use(
// 	function (response) {
// 		console.log('Response interceptor triggered');
// 		return response;
// 	},
// 	function (error) {
// 		return Promise.reject(error);
// 	}
// );

export default axiosInstance;
