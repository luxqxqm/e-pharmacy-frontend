import type { Metadata } from 'next';

import LoginForm from '@/components/AuthForms/LoginForm';

export const metadata: Metadata = { title: 'Login' };

export default function LoginPage() {
  return <LoginForm />;
}
