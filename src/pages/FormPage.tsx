import { useEffect } from "react";
import { useParams } from "react-router";
import { useSurveyStore } from "@/store";
import SectionListView from "@/components/form/SectionListView";

export default function FormPage() {
  const surveyStore = useSurveyStore();

  const { surveyId = "" } = useParams<{ surveyId: string }>();

  useEffect(() => {
    if (surveyId) {
      surveyStore.fetchSurvey(surveyId);
    }
  }, [surveyId, surveyStore]);

  return <SectionListView />;
}
