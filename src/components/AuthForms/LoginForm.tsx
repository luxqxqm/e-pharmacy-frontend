'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, type FieldErrors } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/components/Button/Button';
import { useRedirectIfLoggedIn } from '@/hooks/useRedirectIfLoggedIn';
import { getErrorMessage } from '@/lib/api';
import { login, type LoginData } from '@/lib/auth';

import styles from './AuthForm.module.css';

export default function LoginForm() {
  const router = useRouter();
  useRedirectIfLoggedIn();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      await login(data);
      toast.success('You have logged in');
      router.push('/');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const onInvalid = (formErrors: FieldErrors<LoginData>) => {
    const firstError = Object.values(formErrors)[0];
    if (firstError?.message) toast.error(firstError.message);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
    >
      <div className={styles.fields}>
        <input
          className={styles.input}
          type="email"
          placeholder="Email address"
          autoComplete="email"
          aria-label="Email address"
          aria-invalid={Boolean(errors.email)}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
          })}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          aria-label="Password"
          aria-invalid={Boolean(errors.password)}
          {...register('password', { required: 'Password is required' })}
        />
      </div>

      <div className={styles.actions}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Log in'}
        </Button>
        <Link href="/register" className={styles.switchLink}>
          Don&apos;t have an account?
        </Link>
      </div>
    </form>
  );
}
