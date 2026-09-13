export function CheerFlagIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-hidden="true" style={{ flex: "none" }}>
      <path d="M6 3v18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M6 4.5h12l-3 4 3 4H6Z" fill="currentColor" />
    </svg>
  );
}

export function SuggestionBubbleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-hidden="true" style={{ flex: "none" }}>
      <path
        d="M4 5.5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9.5L5 20.5V16.5H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="8.2" cy="11" r="1.1" fill="currentColor" />
      <circle cx="12" cy="11" r="1.1" fill="currentColor" />
      <circle cx="15.8" cy="11" r="1.1" fill="currentColor" />
    </svg>
  );
}
