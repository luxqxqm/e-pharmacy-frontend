import { api } from './api';
import { clearTokens, saveTokens } from './tokens';

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = LoginData & {
  name: string;
  phone: string;
};

export async function login(data: LoginData) {
  const res = await api.post('/user/login', data);
  saveTokens(res.data);
}

export async function register(data: RegisterData) {
  await api.post('/user/register', data);
  await login({ email: data.email, password: data.password });
}

export async function logout() {
  try {
    await api.get('/user/logout');
  } finally {
    clearTokens();
  }
}
