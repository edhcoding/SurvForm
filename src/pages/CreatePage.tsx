import { toJS } from "mobx";
import SectionListEditor from "@/components/edit/SectionListEditor";
import { useSurveyStore } from "@/store";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebaseApp";
import { toast } from "react-toastify";
import useAuth from "@/hooks/common/useAuth";
import { FormProvider, useForm } from "react-hook-form";

export default function CreatePage() {
  const user = useAuth();
  const surveyStore = useSurveyStore();
  const navigate = useNavigate();

  const methods = useForm({ mode: "onChange" });

  const handleSubmit = async () => {
    const sectionsData = toJS(surveyStore.sections).map((section) => {
      return {
        ...section,
        questions: section.questions.map((question) => {
          return {
            ...question,
            options: question.options ?? [],
          };
        }),
      };
    });

    try {
      const docRef = await addDoc(collection(db, "surveys"), {
        sections: sectionsData,
        emailCollected: false,
        uid: user?.uid,
        createdAt: new Date()?.toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      });

      toast.success("설문지가 생성되었습니다.");

      navigate(`/surveys/${docRef.id}/edit#send`, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("설문지 생성에 실패했습니다.");
    }
  };

  // const handleSubmit = () => {
  //   callApi<{ id: number }>("/surveys", {
  //     method: "POST",
  //     body: toJS({ sections: surveyStore.sections }),
  //   }).then(({ id }) => {
  //     navigate(`/surveys/${id}/edit#send`);
  //   });
  // };

  return (
    <FormProvider {...methods}>
      <Button
        type="button"
        className="absolute z-10 right-10 top-140"
        onClick={methods.handleSubmit(handleSubmit)}
      >
        설문지 생성
      </Button>
      <h1
        onClick={() => navigate("/")}
        className="my-40 font-bold text-center cursor-pointer select-none text-52 text-main"
      >
        SurvForm
      </h1>
      <SectionListEditor />
    </FormProvider>
  );
}
