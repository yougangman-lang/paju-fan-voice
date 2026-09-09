import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="adminTopbar">
      <Link href="/admin" className="adminBrand">
        <div className="adminBrandMark">PF</div>
        <div>
          <strong>PAJU FAN VOICE</strong>
          <span>CLUB ADMIN CONSOLE</span>
        </div>
      </Link>
      <Link href="/" className="backToFan">
        팬 화면으로 →
      </Link>
    </header>
  );
}
