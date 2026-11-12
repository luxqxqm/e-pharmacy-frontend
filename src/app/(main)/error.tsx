'use client';

import { useEffect } from 'react';

import Button from '@/components/Button/Button';
import StatusMessage from '@/components/StatusMessage/StatusMessage';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusMessage
      title="Something went wrong"
      text="We couldn't load this page. The server may be waking up, please try again."
      action={<Button onClick={reset}>Try again</Button>}
    />
  );
}
