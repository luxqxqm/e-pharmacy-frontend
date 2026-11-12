import type { Metadata } from 'next';

import { ButtonLink } from '@/components/Button/Button';
import StatusMessage from '@/components/StatusMessage/StatusMessage';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <StatusMessage
      headingLevel="h1"
      title="Page not found"
      text="The page you are looking for doesn't exist or has been moved."
      action={<ButtonLink href={ROUTES.home}>Go to home</ButtonLink>}
    />
  );
}
