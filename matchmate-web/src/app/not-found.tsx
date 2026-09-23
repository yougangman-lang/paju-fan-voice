import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="font-display text-8xl text-brand">404</p>
      <h1 className="mt-6 text-4xl font-black tracking-[-0.04em]">길을 잃었어요.</h1>
      <Link href="/" className="mt-8 inline-flex min-h-12 items-center border-b-2 border-ink font-bold">
        홈으로 돌아가기
      </Link>
    </Container>
  );
}
