import Section from "@/models/section";
import { SectionData, Statistics } from "@/types/app";
import QuestionStatistics from "@/components/statistics/QuestionStatistics";
import SectionTitleView from "@/components/statistics/SectionTitleView";

interface Props {
  capTitle: string;
  section: Section;
  statistics: Statistics[SectionData["id"]];
}

export default function SectionStatistics({
  capTitle,
  section,
  statistics,
}: Props) {
  return (
    <div className="[&>*]:mb-24">
      <SectionTitleView capTitle={capTitle} section={section} />
      {section.questions.map((question) => (
        <QuestionStatistics
          key={question.id}
          question={question}
          statistics={statistics[question.id]}
        />
      ))}
    </div>
  );
}
