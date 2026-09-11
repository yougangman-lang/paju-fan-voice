export default function YouTubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="YouTube" style={{ flex: "none" }}>
      <title>YouTube</title>
      <rect x="1" y="4.5" width="22" height="15" rx="4" fill="#ff0000" />
      <path d="M10 8.5 16.5 12 10 15.5Z" fill="#fff" />
    </svg>
  );
}
