import { redirect } from "next/navigation";

// 이전 "팬 의견"(/voices) 경로 호환용 리다이렉트. 기능은 /suggestions로 이전되었다.
export default function VoicesRedirect() {
  redirect("/suggestions");
}
