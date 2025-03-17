import Loader from "@/components/common/Loader";
import { db } from "@/firebaseApp";
import { SectionData, SurveyResponse } from "@/types/app";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Survey {
  id: string;
  uid: string;
  sections: SectionData[];
  response: SurveyResponse[];
  createdAt: string;
  updatedAt: string;
  emailCollected: boolean;
}

export default function SurveyListPage() {
  const { userId } = useParams();
  const [surveyList, setSurveyList] = useState<Survey[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveyList = async () => {
      try {
        const q = query(collection(db, "surveys"), where("uid", "==", userId));
        const querySnapshot = await getDocs(q);

        const surveys = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Survey[];

        setSurveyList(surveys);
      } catch (error) {
        console.error(error);
        toast.error("설문지 목록을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) fetchSurveyList();
  }, [userId]);

  if (isLoading) return <Loader />;

  return (
    <>
      <h1
        onClick={() => navigate("/")}
        className="my-40 font-bold text-center cursor-pointer text-52 text-main"
      >
        SurvForm
      </h1>
      <span className="flex justify-end mb-10 text-16">
        설문지: 총 {surveyList.length}개
      </span>
      <div className="flex flex-col gap-y-20">
        {surveyList.length > 0 ? (
          <>
            {surveyList.map((survey) => (
              <Link
                to={`/surveys/${survey.id}/edit#send`}
                key={survey.id}
                className="w-full font-medium text-center transition-all duration-300 border-4 border-black shadow-lg py-30 rounded-12 text-16 hover:bg-black hover:text-white"
              >
                설문지 - {survey.sections[0].title} (
                {survey.updatedAt || survey.createdAt})
              </Link>
            ))}
          </>
        ) : (
          <>
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="text-center text-gray-500">
                <p className="text-lg font-medium">
                  아직 만든 설문지가 없습니다.
                </p>
                <p className="mt-2 mb-20 text-sm">
                  설문지를 만들어 응답을 받아보세요.
                </p>
                <Link
                  to="/surveys/new"
                  className="py-10 duration-300 border-b-2 border-gray-500 hover:text-main hover:border-main"
                >
                  설문지 만들기
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
