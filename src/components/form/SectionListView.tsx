import { useRef, useState } from "react";
import { useSurveyStore } from "@/store";
import SectionView from "@/components/form/SectionView";
import { observer } from "mobx-react-lite";
import { QuestionData, SectionData } from "@/types/app";
import callApi from "@/utils/api";
import { useNavigate, useParams } from "react-router";

const SectionListView = observer(function SectionListView() {
  const [currentSection, setCurrentSection] = useState(0);
  const data = useRef<
    Record<SectionData["id"], Record<QuestionData["id"], string | string[]>>
  >({});
  const { surveyId } = useParams<{ surveyId: string }>();
  const navigate = useNavigate();

  const surveyStore = useSurveyStore();

  const last = currentSection === surveyStore.sections.length - 1;

  const handleNext = async () => {
    if (last) {
      await callApi(`/surveys/${surveyId}/responses`, {
        method: "POST",
        body: data.current,
      });

      navigate(
        `/surveys/${surveyId}/complete?title=${surveyStore.sections[0].title}`
      );

      return;
    }

    setCurrentSection(currentSection + 1);
  };

  const saveData = (
    sectionData: Record<QuestionData["id"], string | string[]>
  ) => {
    data.current[surveyStore.sections[currentSection].id] = sectionData;
  };

  return (
    <SectionView
      section={surveyStore.sections[currentSection]}
      last={last}
      onNext={handleNext}
      onSave={saveData}
    />
  );
});

export default SectionListView;
