import axios from 'axios';

export const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5129/api';
export const API_BASE_URL = BACKEND_URL;
export const AI_SERVICE_URL = 'http://localhost:8000';
export const CHAT_AGENT_URL = 'http://localhost:8005';

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

export const feedbackApi = {
  submitFeedback: (data: any) => api.post<ApiResponse<any>>('/Feedback', data),
  getFeedbackByBooking: (bookingId: string) => api.get<ApiResponse<any>>(`/Feedback/booking/${bookingId}`),
  getFeedbackByMembership: (membershipId: string) => api.get<ApiResponse<any>>(`/Feedback/membership/${membershipId}`),
  getRecentFeedback: (count: number = 5) => api.get<ApiResponse<any>>(`/Feedback/recent?count=${count}`),
};

export const aiApi = {
  analyzeSentiment: (text: string) => axios.post(`${AI_SERVICE_URL}/analyze-sentiment`, { text }),
  summarizeFeedback: (reviews: string[]) => axios.post(`${AI_SERVICE_URL}/summarize-feedback`, { reviews }),
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
  verifyPayment: (sessionId: string) => api.get<ApiResponse<any>>(`/Payment/verify/${sessionId}`),
};

export const membershipApi = {
  purchase: (data: FormData) => api.post<ApiResponse<any>>('/Membership/purchase', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  purchaseBooking: (data: FormData) => api.post<ApiResponse<any>>('/Membership/purchase-booking', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getMyMemberships: (token: string) => api.get<ApiResponse<any[]>>('/Membership/my', {
    headers: { Authorization: `Bearer ${token}` }
  }),
};

export const preferencesApi = {
  savePreferences: (data: any, token: string) => 
    api.post<ApiResponse<any>>('/user-preferences', data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  getPreferences: (token: string) => 
    api.get<ApiResponse<any>>('/user-preferences', {
      headers: { Authorization: `Bearer ${token}` }
    }),
};

export const userActivityApi = {
  logActivity: (data: any) => api.post('/user-activity', data),
  logBatch: (data: any[]) => api.post('/user-activity/batch', data),
};

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors?: string[];
}

export default api;
