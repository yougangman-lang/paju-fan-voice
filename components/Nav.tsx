import Link from "next/link";
export default function Nav(){return <header className="topbar"><div className="brand"><div className="brandMark">PF</div><div><strong>PAJU FAN VOICE</strong><span>팬 참여형 여론수렴 플랫폼</span></div></div><nav><Link href="/">홈</Link><Link href="/polls">팬 설문</Link><Link href="/voices">팬 의견</Link><Link href="/mypage">마이페이지</Link><Link href="/admin">관리자</Link></nav></header>}
