'use client';

import { useEffect, useState } from 'react';

// чи є токен у localStorage; оновлюється після login/logout
export function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsLoggedIn(Boolean(localStorage.getItem('accessToken')));
    };

    check();
    window.addEventListener('auth-change', check);

    return () => window.removeEventListener('auth-change', check);
  }, []);

  return isLoggedIn;
}
