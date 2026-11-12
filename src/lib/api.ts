import axios from 'axios';

import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from './tokens';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// один інстанс axios на весь проєкт
export const api = axios.create({
  baseURL,
  // Render на безкоштовному тарифі може прокидатися до хвилини
  timeout: 70000,
});

// перед кожним запитом додаємо токен, якщо юзер залогінений
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// access токен живе 15 хв: якщо прострочився, оновлюємо і повторюємо запит
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
        // звичайний axios, а не api, щоб не зациклитись на інтерцепторах
        const { data } = await axios.post(`${baseURL}/user/refresh`, {
          refreshToken: getRefreshToken(),
        });
        saveTokens(data);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch {
        // refresh теж прострочився: розлогінюємо
        clearTokens();
      }
    }

    return Promise.reject(error);
  },
);

// дістаємо зрозумілий текст помилки з відповіді бекенда
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    // помилка валідації celebrate: { validation: { body: { message } } }
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
