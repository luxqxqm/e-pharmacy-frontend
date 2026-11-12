'use client';

import { useForm, type FieldErrors } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/components/Button/Button';
import { api, getErrorMessage } from '@/lib/api';
import { formatPrice } from '@/utils/formatPrice';

import styles from './CheckoutForm.module.css';

type CheckoutData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: 'Cash' | 'Bank';
};

type CheckoutFormProps = {
  totalPrice: number;
  onSuccess: () => void;
};

export default function CheckoutForm({
  totalPrice,
  onSuccess,
}: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutData>({
    defaultValues: { paymentMethod: 'Cash' },
  });

  const onSubmit = async (data: CheckoutData) => {
    try {
      await api.post('/cart/checkout', data);
      toast.success('Your order has been placed!');
      reset();
      onSuccess();
    } catch (error) {
      // наприклад: "Not enough stock for Aspirin"
      toast.error(getErrorMessage(error));
    }
  };

  const onInvalid = (formErrors: FieldErrors<CheckoutData>) => {
    const firstError = Object.values(formErrors)[0];
    if (firstError?.message) toast.error(firstError.message);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
    >
      <h2 className={styles.title}>Enter shipping info</h2>
      <p className={styles.text}>
        Enter your shipping info where you&apos;ll get the product. You can also
        send any other location where you need the products.
      </p>

      <div className={styles.fields}>
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            placeholder="Enter text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Name is too short' },
              maxLength: { value: 32, message: 'Name is too long' },
            })}
          />
        </label>

        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            placeholder="Enter text"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
            })}
          />
        </label>

        <label className={styles.label}>
          Phone
          <input
            className={styles.input}
            type="tel"
            placeholder="+380XXXXXXXXX"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            {...register('phone', {
              required: 'Phone is required',
              pattern: {
                value: /^\+380\d{9}$/,
                message: 'Phone must be in format +380XXXXXXXXX',
              },
            })}
          />
        </label>

        <label className={styles.label}>
          Address
          <input
            className={styles.input}
            placeholder="Enter text"
            autoComplete="street-address"
            aria-invalid={Boolean(errors.address)}
            {...register('address', {
              required: 'Address is required',
              minLength: { value: 5, message: 'Address is too short' },
              maxLength: { value: 128, message: 'Address is too long' },
            })}
          />
        </label>
      </div>

      <fieldset className={styles.payment}>
        <legend className={styles.title}>Payment method</legend>
        <p className={styles.text}>
          You can pay us in a multiple way in our payment gateway system.
        </p>
        <label className={styles.radio}>
          <input type="radio" value="Cash" {...register('paymentMethod')} />
          Cash On Delivery
        </label>
        <label className={styles.radio}>
          <input type="radio" value="Bank" {...register('paymentMethod')} />
          Bank
        </label>
      </fieldset>

      <div className={styles.order}>
        <h2 className={styles.title}>Order details</h2>
        <p className={styles.text}>
          Shipping and additional costs are calculated based on values you have
          entered.
        </p>
        <p className={styles.total}>
          Total: <span>{formatPrice(totalPrice)}</span>
        </p>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Placing order...' : 'Place order'}
      </Button>
    </form>
  );
}
