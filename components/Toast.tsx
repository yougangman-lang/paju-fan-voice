"use client";

export default function Toast({ message }: { message: string }) {
  return (
    <div className="toastWrap" role="status" aria-live="polite">
      <div className="toast">{message}</div>
    </div>
  );
}
