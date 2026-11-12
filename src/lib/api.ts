import axios from 'axios';

import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from './tokens';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL,
  timeout: 70000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isExpired =
      error.response?.status === 401 &&
      error.response?.data?.message === 'Access token expired';

    if (isExpired && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(`${baseURL}/user/refresh`, {
          refreshToken: getRefreshToken(),
        });
        saveTokens(data);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch {
        clearTokens();
      }
    }

    return Promise.reject(error);
  },
);

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (data?.validation) {
      const first = Object.values(data.validation)[0] as { message?: string };
      if (first?.message) return first.message;
    }

    if (data?.message) return data.message;
    if (error.code === 'ECONNABORTED') {
      return 'Server is not responding, try again';
    }
  }

  return 'Something went wrong';
}
