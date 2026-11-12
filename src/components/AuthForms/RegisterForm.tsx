'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, type FieldErrors } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/components/Button/Button';
import { useRedirectIfLoggedIn } from '@/hooks/useRedirectIfLoggedIn';
import { getErrorMessage } from '@/lib/api';
import { register as registerUser, type RegisterData } from '@/lib/auth';

import styles from './AuthForm.module.css';

export default function RegisterForm() {
  const router = useRouter();
  useRedirectIfLoggedIn();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>();

  const onSubmit = async (data: RegisterData) => {
    try {
      await registerUser(data);
      toast.success('Welcome to E-Pharmacy!');
      router.push('/medicine');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const onInvalid = (formErrors: FieldErrors<RegisterData>) => {
    const firstError = Object.values(formErrors)[0];
    if (firstError?.message) toast.error(firstError.message);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
    >
      <div className={styles.fieldsGrid}>
        <input
          className={styles.input}
          placeholder="User Name"
          autoComplete="name"
          aria-label="User Name"
          aria-invalid={Boolean(errors.name)}
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters',
            },
            maxLength: {
              value: 32,
              message: 'Name must be at most 32 characters',
            },
          })}
        />

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
          type="tel"
          placeholder="Phone number"
          autoComplete="tel"
          aria-label="Phone number"
          aria-invalid={Boolean(errors.phone)}
          {...register('phone', {
            required: 'Phone is required',
            pattern: {
              value: /^\+380\d{9}$/,
              message: 'Phone must be in format +380XXXXXXXXX',
            },
          })}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          aria-label="Password"
          aria-invalid={Boolean(errors.password)}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
              message:
                'Password must contain at least one letter, one number and one special character',
            },
          })}
        />
      </div>

      <div className={styles.actions}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Register'}
        </Button>
        <Link href="/login" className={styles.switchLink}>
          Already have an account?
        </Link>
      </div>
    </form>
  );
}
