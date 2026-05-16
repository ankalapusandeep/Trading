import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('tm_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('tm_token');
      localStorage.removeItem('tm_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data),
};

export const marketAPI = {
  getAll: (params) => API.get('/market-updates', { params }),
  getOne: (id) => API.get(`/market-updates/${id}`),
  create: (data) => API.post('/market-updates', data),
  update: (id, data) => API.put(`/market-updates/${id}`, data),
  delete: (id) => API.delete(`/market-updates/${id}`),
};

export const pricingAPI = {
  getAll: () => API.get('/pricing'),
  getAllAdmin: () => API.get('/pricing/admin/all'),
  create: (data) => API.post('/pricing', data),
  update: (id, data) => API.put(`/pricing/${id}`, data),
  delete: (id) => API.delete(`/pricing/${id}`),
};

export const testimonialAPI = {
  getAll: () => API.get('/testimonials'),
  getAllAdmin: () => API.get('/testimonials/admin/all'),
  create: (data) => API.post('/testimonials', data),
  update: (id, data) => API.put(`/testimonials/${id}`, data),
  delete: (id) => API.delete(`/testimonials/${id}`),
};

export const contactAPI = {
  send: (data) => API.post('/contact', data),
  getAll: () => API.get('/contact'),
  markRead: (id) => API.put(`/contact/${id}/read`),
  delete: (id) => API.delete(`/contact/${id}`),
};

export const paymentAPI = {
  createOrder: (data) => API.post('/payments/create-order', data),
  verify: (data) => API.post('/payments/verify', data),
  getMyPayments: () => API.get('/payments/my-payments'),
  getAllPayments: () => API.get('/payments/all'),
};

export const adminAPI = {
  getDashboard: () => API.get('/admin/dashboard'),
  getAllUsers: () => API.get('/admin/users'),
  updateUser: (id, data) => API.put(`/admin/users/${id}`, data),
  deleteUser: (id) => API.delete(`/admin/users/${id}`),
};

export default API;
