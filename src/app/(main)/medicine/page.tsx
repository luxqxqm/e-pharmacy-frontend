import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Medicine' };

export default function Page() {
  return (
    <div className="container">
      <h1>Medicine</h1>
    </div>
  );
}
