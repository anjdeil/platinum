import { InstagramSectionData } from "@/types/components/sections/index";
import { SectionContainer } from "../styles";
import { SectionHeader } from "../SectionHeader";
import dynamic from 'next/dynamic';
const InstagramBlock = dynamic(() => import("@/components/pages/main/InstagramBlock/InstagramBlock"), {
  ssr: false,
});

type InstagramSectionProps = Omit<InstagramSectionData, "_type">;

export const InstagramSection: React.FC<InstagramSectionProps> = ({
  subtitle,
  title,
}) => {
  return (
    <SectionContainer>
      <SectionHeader title={title} subtitle={subtitle} />
      <InstagramBlock />
    </SectionContainer>
  );
};
