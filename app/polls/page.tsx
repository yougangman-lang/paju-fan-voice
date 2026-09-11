import { redirect } from "next/navigation";

// 이전 "팬 설문"(/polls) 경로 호환용 리다이렉트. 설문 탭은 폐지되었고
// 오늘의 설문은 홈 화면과 /survey/[id]에서 제공된다.
export default function PollsRedirect() {
  redirect("/");
}
