// import { authToken } from '$svc/auth';
// import axios from 'axios';

// const url = 'https://hrm-backend-vsa.fly.dev/api';
// // console.log(url);
// // Create an Axios instance
// let axiosInstance = axios.create({
// 	baseURL: url,
// 	withCredentials: true,
// 	headers: {
// 		'Content-Type': 'application/json' // Add any additional headers as needed
// 	}
// });

// // let token = '';

// // authToken.subscribe((x:string) => (token = x));

// // axiosInstance.interceptors.request.use(
// // 	function (config) {
// // 		if (token) {
// // 			config.headers['Authorization'] = `Bearer ${token}`;
// // 		} else {
// // 			delete config.headers['Authorization'];
// // 		}
// // 		return config;
// // 	},
// // 	function (error) {
// // 		return Promise.reject(error);
// // 	}
// // );

// export function updateAxiosRequest(cookie: string) {
// 	if (!cookie) {
// 		axiosInstance.interceptors.request.use(
// 			function (config) {
// 				delete config.headers['Authorization'];
// 				return config;
// 			},
// 			function (error) {
// 				return Promise.reject(error);
// 			}
// 		);
// 		return;
// 	}
// 	// console.log(cookie)
// 	axiosInstance.interceptors.request.use(
// 		function (config) {
// 			config.headers['Authorization'] = `Bearer ${cookie}`;
// 			return config;
// 		},
// 		function (error) {
// 			return Promise.reject(error);
// 		}
// 	);
// }

// export default axiosInstance;
