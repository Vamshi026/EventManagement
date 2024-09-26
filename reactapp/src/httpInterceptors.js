import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Add a response interceptor if needed
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        // Handle unauthorized errors
        console.error("Unauthorized access");
    }
    return Promise.reject(error);
});
