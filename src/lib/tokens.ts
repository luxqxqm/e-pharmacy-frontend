// робота з токенами в localStorage

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

export function saveTokens({ accessToken, refreshToken }: Tokens) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  // повідомляємо хедер, що юзер залогінився
  window.dispatchEvent(new Event('auth-change'));
}

export function clearTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.dispatchEvent(new Event('auth-change'));
}
