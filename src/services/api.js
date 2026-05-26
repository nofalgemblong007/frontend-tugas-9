import axios from 'axios';

// Base URL untuk API backend
const API_BASE_URL = 'http://localhost:8000/api';

// Membuat instance axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  isAuthenticated: () => !!localStorage.getItem('token'),
  isOwner: () => {
    const user = authService.getUser();
    return user?.role === 'pemilik';
  },
};

// Product Service
export const productService = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  getMyProducts: () => api.get('/products/my/products'),
};

// Rental Service
export const rentalService = {
  getAll: () => api.get('/rentals'),
  getById: (id) => api.get(`/rentals/${id}`),
  getHistory: () => api.get('/rentals/history'),
  create: (data) => api.post('/rentals', data),
  returnRental: (id) => api.post(`/rentals/${id}/return`),
  cancel: (id) => api.post(`/rentals/${id}/cancel`),
  approve: (id) => api.post(`/rentals/${id}/approve`),
};

export default api;