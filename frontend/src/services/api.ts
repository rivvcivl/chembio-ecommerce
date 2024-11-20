import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';  // Updated port to match backend

console.log('API URL:', API_URL); // Log the API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Request config:', {
    url: config.url,
    method: config.method,
    headers: config.headers,
    data: config.data
  });
  return config;
});

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
);

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'admin';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  catalogueNumber: string;
  price: number;
  category: string;
  brand: string;
  weightVolume: string;
  stockQuantity: number;
  imageUrls: string[];
  isActive: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  products: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    console.log('Login attempt with credentials:', {
      email: credentials.email,
      passwordLength: credentials.password.length
    });
    try {
      const { data } = await api.post('/auth/login', credentials);
      console.log('Login response:', data);
      localStorage.setItem('token', data.token);
      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
  },
};

export const productsApi = {
  getAll: async () => {
    const { data } = await api.get<Product[]>('/products');
    return data;
  },
  getById: async (id: string) => {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  },
  create: async (product: Omit<Product, 'id'>) => {
    const { data } = await api.post<Product>('/products', product);
    return data;
  },
  update: async (id: string, product: Partial<Product>) => {
    const { data } = await api.put<Product>(`/products/${id}`, product);
    return data;
  },
  delete: async (id: string) => {
    await api.delete(`/products/${id}`);
  },
};

export const ordersApi = {
  getAll: async () => {
    const { data } = await api.get<Order[]>('/orders');
    return data;
  },
  getById: async (id: string) => {
    const { data } = await api.get<Order>(`/orders/${id}`);
    return data;
  },
  create: async (order: { products: Array<{ productId: string; quantity: number }>; shippingAddress: Order['shippingAddress'] }) => {
    const { data } = await api.post<Order>('/orders', order);
    return data;
  },
  updateStatus: async (id: string, status: Order['status']) => {
    const { data } = await api.put<Order>(`/orders/${id}/status`, { status });
    return data;
  },
};
