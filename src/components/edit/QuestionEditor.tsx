import Input from "@/components/common/Input";
import QuestionBodyEditor from "@/components/edit/QuestionBodyEditor";
import Question from "@/models/question";
import { observer } from "mobx-react-lite";
import QuestionTypeEditor from "@/components/edit/QuestionTypeEditor";
import CopyIcon from "@/assets/icons/filter_none.svg?react";
import DeleteIcon from "@/assets/icons/delete.svg?react";
import Divider from "@/components/common/Divider";
import Switch from "@/components/common/Switch";
import Panel from "@/components/common/Panel";
import { useFormContext } from "react-hook-form";
import { ChangeEvent } from "react";

interface Props {
  question: Question;
  onCopy: (id: number) => void;
  onDelete: (id: number) => void;
}

const QuestionEditor = observer(function QuestionEditor({
  question,
  onCopy,
  onDelete,
}: Props) {
  const form = useFormContext();

  if (!form) return null;

  const {
    register,
    formState: { errors },
  } = form;

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (value.trim() === "") {
      question.setTitle("");
      return;
    }

    question.setTitle(value);
  };

  return (
    <Panel className="border-l-10 border-l-transparent focus-within:border-l-main">
      <Panel.Header className="flex mb-25">
        <div className="relative flex-1 mr-30">
          <Input
            className="w-full text-24"
            value={question.title}
            // onChange={(e) => question.setTitle(e.currentTarget.value)}
            {...register(`${question.id}`, {
              required: {
                value: true,
                message: "질문의 제목을 입력해주세요.",
              },
              onChange: handleChangeTitle,
            })}
          />
          {errors[`${question.id}`] && (
            <p className="absolute font-semibold text-red-500 select-none top-full text-12">
              {errors[`${question.id}`]!.message as string}
            </p>
          )}
        </div>
        <QuestionTypeEditor type={question.type} onChange={question.setType} />
      </Panel.Header>
      <Panel.Body>
        <QuestionBodyEditor question={question} />
      </Panel.Body>
      <Panel.Footer className="flex justify-end h-24 mt-20 gap-x-24">
        <button type="button" onClick={() => onCopy(question.id)}>
          <CopyIcon />
        </button>
        <button type="button" onClick={() => onDelete(question.id)}>
          <DeleteIcon />
        </button>
        <Divider direction="vertical" />
        <div className="flex items-center">
          <span className="mr-13">필수</span>
          <Switch
            id={`${question.id}-switch`}
            checked={question.required}
            onChange={question.setRequired}
          />
        </div>
      </Panel.Footer>
    </Panel>
  );
});

export default QuestionEditor;
