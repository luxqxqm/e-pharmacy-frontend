'use client';

export default function GlobalError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: 'sans-serif',
          textAlign: 'center',
          padding: '80px 20px',
        }}
      >
        <h1>Something went wrong</h1>
        <button type="button" onClick={reset} style={{ marginTop: 16 }}>
          Try again
        </button>
      </body>
    </html>
  );
}
