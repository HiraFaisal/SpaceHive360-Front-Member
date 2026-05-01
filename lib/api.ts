import axios from 'axios';

export const BACKEND_URL = 'http://localhost:5129';
export const API_BASE_URL = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const memberApi = {
  getCities: () => api.get<ApiResponse<string[]>>('/MemberPortal/cities'),
  getCategories: () => api.get<ApiResponse<string[]>>('/MemberPortal/categories'),
  getTopPlans: () => api.get<ApiResponse<any[]>>('/MemberPortal/plans/top'),
  getPlans: (params: { city?: string; category?: string }) => 
    api.get<ApiResponse<any>>('/MemberPortal/plans', { params }),
  getPlanById: (id: string) => api.get<ApiResponse<any>>(`/MemberPortal/plans/${id}`),
};

export const authApi = {
  login: (data: any) => api.post<ApiResponse<any>>('/Auth/login', data),
  register: (data: any) => api.post<ApiResponse<any>>('/Auth/register', data),
  getMe: (userId: string) => api.get<ApiResponse<any>>(`/Auth/me?userId=${userId}`),
};

export const paymentApi = {
  createCheckoutSession: (data: { 
    planId: string; 
    planType: string; 
    successUrl: string; 
    cancelUrl: string;
    memberUserId: string;
  }) => api.post<ApiResponse<any>>('/Payment/create-checkout-session', data),
};

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors?: string[];
}

export default api;
