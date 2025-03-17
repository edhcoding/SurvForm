import { toJS } from "mobx";
import SectionListEditor from "@/components/edit/SectionListEditor";
import { useSurveyStore } from "@/store";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import SendModalContent from "@/components/edit/SendModalContent";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseApp";
import { toast } from "react-toastify";
import { observer } from "mobx-react-lite";
import { FormProvider, useForm } from "react-hook-form";

function EditPage() {
  const { hash } = useLocation();
  const [opened, setOpened] = useState<boolean>(hash === "#send");

  const surveyStore = useSurveyStore();

  const methods = useForm({ mode: "onChange" });

  const { surveyId = "" } = useParams<{ surveyId: string }>();

  useEffect(() => {
    if (surveyId) {
      surveyStore.fetchSurvey(surveyId);
    }
  }, [surveyId, surveyStore]);

  const handleSubmit = async () => {
    // callApi(`/surveys/${surveyId}`, {
    //   method: "PUT",
    //   body: toJS({ sections: surveyStore.sections }),
    // }).then(() => {
    //   setOpened(true);
    // });
    const docRef = doc(db, "surveys", surveyId);

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

    await updateDoc(docRef, {
      sections: sectionsData,
    });

    setOpened(true);
    toast.success("설문지가 수정되었습니다.");
  };

  return (
    <FormProvider {...methods}>
      <Button
        type="button"
        onClick={handleSubmit}
        className="absolute right-10 top-170"
      >
        수정하기
      </Button>
      <SectionListEditor />
      <Modal opend={opened}>
        <SendModalContent
          emailCollected={surveyStore.emailCollected}
          surveyId={surveyId}
          onClose={() => setOpened(false)}
        />
      </Modal>
    </FormProvider>
  );
}

export default observer(EditPage);
