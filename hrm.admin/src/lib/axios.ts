import axios from 'axios';
const url = 'https://hrm-backend-vsa.fly.dev/api';
// console.log(url);
// Create an Axios instance
const axiosInstance = axios.create({
	baseURL: url,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json' // Add any additional headers as needed
	}
});

export default axiosInstance;
