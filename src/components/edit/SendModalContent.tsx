import CloseIcon from "@/assets/icons/close.svg?react";
import Dropdown from "@/components/common/Dropdown";
import Button from "@/components/common/Button";
import callApi from "@/utils/api";
import Panel from "@/components/common/Panel";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseApp";
import { toast } from "react-toastify";

interface Props {
  surveyId: string;
  emailCollected: boolean;
  onClose: () => void;
}

export default function SendModalContent({
  surveyId,
  emailCollected,
  onClose,
}: Props) {
  const path = `${location.host}/surveys/${surveyId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(path);
    onClose();
  };

  const handleChangeEmailCollected = async (value: boolean) => {
    // callApi(`/surveys/${surveyId}`, {
    //   method: "PATCH",
    //   body: {
    //     emailCollected: value,
    //   },
    // });
    const docRef = doc(db, "surveys", surveyId);

    await updateDoc(docRef, {
      emailCollected: value,
    });

    toast.success(`${value ? "이메일을 수집" : "이메일 수집을 중단"}합니다.`);
  };

  return (
    <Panel className="text-gray900">
      <Panel.Header className="flex items-center justify-between mb-19">
        <h4 className="font-semibold text-20">설문지 보내기</h4>
        <button type="button" onClick={onClose}>
          <CloseIcon />
        </button>
      </Panel.Header>
      <Panel.Body>
        <div className="flex items-center justify-between px-20 -mx-20 bg-bg py-13 mb-38">
          <span className="font-medium text-16">이메일 수집</span>
          <Dropdown<boolean>
            defaultValue={emailCollected}
            options={[
              { label: "수집하지 않음", value: false },
              { label: "수집함", value: true },
            ]}
            onChange={handleChangeEmailCollected}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-17">링크</span>
          <p className="pb-16 font-medium text-gray800 pt-21 text-16">{path}</p>
        </div>
      </Panel.Body>
      <Panel.Footer className="flex justify-end mt-26">
        <Button variant="tertiary" onClick={onClose}>
          취소
        </Button>
        <Button variant="secondary" onClick={handleCopy}>
          복사
        </Button>
      </Panel.Footer>
    </Panel>
  );
}
