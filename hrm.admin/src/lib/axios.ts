// import axios from 'axios';
// const url = 'https://hrm-backend-vsa.fly.dev/api';
// // console.log(url);
// // Create an Axios instance
// const axiosInstance = axios.create({
// 	baseURL: url,
// 	withCredentials: true,
// 	headers: {
// 		'Content-Type': 'application/json' // Add any additional headers as needed
// 	}
// });

// export default axiosInstance;

import axios from 'axios';

const url = import.meta.env.VITE_SERVER_URL;
export const axiosInstance = axios.create({
	baseURL: url,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json' // Add any additional headers as needed
	}
});

export const setAuthToken = (token: string) => {
	if (token) {
		axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete axiosInstance.defaults.headers.common['Authorization'];
	}
};

export default axiosInstance;
