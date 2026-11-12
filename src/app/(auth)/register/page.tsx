import type { Metadata } from 'next';

import RegisterForm from '@/components/AuthForms/RegisterForm';

export const metadata: Metadata = { title: 'Register' };

export default function RegisterPage() {
  return <RegisterForm />;
}
