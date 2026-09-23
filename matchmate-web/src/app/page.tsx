import HeroSection from "@/components/HeroSection";
import TodaysMood from "@/components/TodaysMood";
import MoodMatchSection from "@/components/MoodMatchSection";
import HostPickSection from "@/components/HostPickSection";
import SixLineSection from "@/components/SixLineSection";
import CommunitySection from "@/components/CommunitySection";
import FirstMatchGuide from "@/components/FirstMatchGuide";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TodaysMood />
      <MoodMatchSection index="02 / 06" />
      <HostPickSection index="03 / 06" />
      <SixLineSection index="04 / 06" />
      <CommunitySection index="05 / 06" />
      <FirstMatchGuide index="06 / 06" />
    </>
  );
}
