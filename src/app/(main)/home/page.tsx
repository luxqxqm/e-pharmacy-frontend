import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Home' };

export default function Page() {
  return (
    <div className="container">
      <h1>Home</h1>
    </div>
  );
}
