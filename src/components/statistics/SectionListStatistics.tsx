import Section from "@/models/section";
import { Statistics } from "@/types/app";
import SectionStatistics from "@/components/statistics/SectionStatistics";

interface Props {
  count: number;
  sections: Section[];
  statistics: Statistics;
}

export default function SectionListStatistics({
  count,
  sections,
  statistics,
}: Props) {
  return sections.map((section, index) => (
    <SectionStatistics
      key={section.id}
      capTitle={`${count}개 중 ${index + 1}섹션`}
      section={section}
      statistics={statistics[section.id]}
    />
  ));
}
