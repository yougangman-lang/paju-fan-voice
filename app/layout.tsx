import "./globals.css"; import type {Metadata} from "next"; import Nav from "@/components/Nav";
export const metadata:Metadata={title:"PAJU FAN VOICE",description:"파주 프런티어FC 팬 참여형 여론수렴 플랫폼 프로토타입"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body><Nav/><main className="shell">{children}</main></body></html>}
