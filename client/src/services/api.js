import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('shopez_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProducts = (search = '') => api.get(`/products${search ? `?search=${search}` : ''}`);
export const getProductDetails = (id) => api.get(`/products/${id}`);
export const login = (email, password) => api.post('/users/login', { email, password });
export const register = (username, email, password) =>
  api.post('/users/register', { username, email, password });

export const getProfile = () => api.get('/users/profile');

export const getCart = () => api.get('/cart');
export const addToCart = (productId, qty, size) =>
  api.post('/cart', { productId, qty, size });
export const updateCartItem = (itemId, qty) =>
  api.put('/cart', { itemId, qty });
export const removeCartItem = (itemId) => api.delete(`/cart/${itemId}`);
export const clearCart = () => api.delete('/cart');

export const createOrder = (orderData) => api.post('/orders', orderData);
export const getMyOrders = () => api.get('/orders/myorders');

export const getAdminOverview = () => api.get('/admin/overview');
export const getAdminConfig = () => api.get('/admin/config');
export const updateAdminConfig = (data) => api.put('/admin/config', data);

export default api;
