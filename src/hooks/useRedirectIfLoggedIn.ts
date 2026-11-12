'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// залогіненому юзеру нема чого робити на /login і /register
export function useRedirectIfLoggedIn() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      router.replace('/home');
    }
  }, [router]);
}
