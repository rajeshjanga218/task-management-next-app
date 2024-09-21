// /app/tasks/error.js
"use client"; // Error components must be Client Components

export default function Error({ error, reset }: { error: any; reset: any }) {
  return (
    <div>
      <p>Error loading tasks: {error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  );
}
