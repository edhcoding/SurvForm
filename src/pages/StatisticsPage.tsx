import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Statistics } from "@/types/app";
import { useSurveyStore } from "@/store";
import SectionListStatistics from "@/components/statistics/SectionListStatistics";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseApp";
import { getStatistics } from "@/utils/statistics";
import { toast } from "react-toastify";

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  const { surveyId = "" } = useParams<{ surveyId: string }>();

  const surveyStore = useSurveyStore();

  useEffect(() => {
    const fetchStatistics = async () => {
      // const { statistics } = await callApi<{
      //   statistics: Statistics;
      // }>(`/surveys/${surveyId}/statistics`);

      // // setStatistics(statistics);
      // console.log("statistics", statistics);

      try {
        const surveyDoc = await getDoc(doc(db, "surveys", surveyId));

        if (!surveyDoc.exists()) {
          toast.error("설문을 찾을 수 없습니다.");
          return;
        }

        const surveyData = surveyDoc.data();

        const calculatedStatistics = getStatistics(
          surveyData.sections,
          Array.isArray(surveyData.responses)
            ? surveyData.responses
            : [surveyData.responses]
        );

        setStatistics(calculatedStatistics);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStatistics();
    surveyStore.fetchSurvey(surveyId);
  }, [surveyId, surveyStore]);

  if (!statistics)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-center text-gray-500">
          <p className="text-lg font-medium">아직 설문 응답이 없습니다.</p>
          <p className="mt-2 text-sm">
            링크를 공유하고 응답을 받아보세요.
          </p>
        </div>
      </div>
    );

  return statistics ? (
    <SectionListStatistics
      statistics={statistics}
      sections={surveyStore.sections}
    />
  ) : (
    <div>Loading...</div>
  );
}
