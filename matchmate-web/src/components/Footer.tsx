import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-paper md:mt-32">
      <Container className="py-14 md:py-20">
        <p className="font-display text-[15vw] leading-[0.85] tracking-wide md:text-[9.5rem]">
          MATCHMATE
          <br />
          <span className="text-brand">SEOUL</span>
        </p>
        <div className="mt-12 grid gap-10 border-t border-paper/20 pt-8 md:grid-cols-12">
          <p className="text-lg font-bold leading-snug md:col-span-5">
            먹고, 만나고, 놀다가
            <br />
            마지막은 같이 응원.
          </p>
          <nav className="grid grid-cols-2 gap-y-3 text-sm font-bold tracking-[0.14em] md:col-span-4" aria-label="Footer">
            <Link href="/discover" className="hover:text-brand">DISCOVER</Link>
            <Link href="/match" className="hover:text-brand">MATCH</Link>
            <Link href="/host" className="hover:text-brand">HOST</Link>
            <Link href="/guide" className="hover:text-brand">GUIDE</Link>
          </nav>
          <p className="text-xs leading-relaxed text-paper/50 md:col-span-3 md:text-right">
            Student project prototype.
            <br />
            Not an official FC Seoul service.
          </p>
        </div>
      </Container>
    </footer>
  );
}
