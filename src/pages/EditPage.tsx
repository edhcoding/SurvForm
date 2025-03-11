import { toJS } from "mobx";
import SectionEditorList from "@/components/edit/SectionListEditor";
import { useSurveyStore } from "@/store";
import callApi from "@/utils/api";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import SendModalContent from "@/components/edit/SendModalContent";

export default function EditPage() {
  const { hash } = useLocation();
  const [opened, setOpened] = useState<boolean>(hash === "#send");

  const surveyStore = useSurveyStore();

  const { surveyId = "" } = useParams<{ surveyId: string }>();

  useEffect(() => {
    const id = parseInt(surveyId, 10);

    if (id) {
      surveyStore.fetchSurvey(id);
    }
  }, [surveyId, surveyStore]);

  const handleSubmit = () => {
    callApi(`/surveys/${surveyId}`, {
      method: "PUT",
      body: toJS({ sections: surveyStore.sections }),
    }).then(() => {
      setOpened(true);
    });
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleSubmit}
        className="absolute top-0 right-0"
      >
        보내기
      </Button>
      <SectionEditorList></SectionEditorList>
      <Modal opend={opened}>
        <SendModalContent
          emailCollected={surveyStore.emailCollected}
          surveyId={parseInt(surveyId, 10)}
          onClose={() => setOpened(false)}
        />
      </Modal>
    </>
  );
}
