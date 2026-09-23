"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { href: "/discover", label: "DISCOVER" },
  { href: "/match", label: "MATCH" },
  { href: "/host", label: "HOST" },
  { href: "/guide", label: "GUIDE" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-5 md:h-[72px] md:px-10">
        <Link href="/" className="font-display text-xl tracking-wide md:text-2xl" onClick={() => setOpen(false)}>
          MATCHMATE <span className="text-brand">SEOUL</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[13px] font-bold tracking-[0.16em] transition-colors hover:text-brand ${
                isActive(l.href) ? "text-brand" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/match"
            className="hidden items-center gap-1.5 bg-brand px-5 py-3 text-[13px] font-bold tracking-[0.14em] text-paper transition-colors hover:bg-ink md:inline-flex"
          >
            FIND MY CREW <ArrowUpRight size={16} strokeWidth={2.5} />
          </Link>
          <button
            type="button"
            className="-mr-2 inline-flex h-12 w-12 items-center justify-center md:hidden"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col bg-ink px-5 pb-8 pt-6 text-paper md:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between border-b border-paper/15 py-5"
              >
                <span className={`font-display text-5xl tracking-wide ${isActive(l.href) ? "text-brand" : ""}`}>
                  {l.label}
                </span>
                <span className="text-sm text-paper/50">0{i + 1}</span>
              </Link>
            ))}
          </nav>
          <Link
            href="/match"
            onClick={() => setOpen(false)}
            className="mt-auto flex items-center justify-center gap-2 bg-brand py-5 text-base font-bold tracking-[0.14em]"
          >
            FIND MY CREW <ArrowUpRight size={18} />
          </Link>
        </div>
      )}
    </header>
  );
}
