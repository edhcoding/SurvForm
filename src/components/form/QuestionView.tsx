import Panel, { PanelBody, PanelHeader } from "@/components/common/Panel";
import Question from "@/models/question";
import QuestionForm from "@/components/form/QuestionForm";
import { useFormContext } from "react-hook-form";
import cn from "classnames";

interface Props {
  question: Question;
}

export default function QuestionView({ question }: Props) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Panel className={cn({ "border-red-500 border": errors[question.id] })}>
      <PanelHeader className="flex mb-31">
        <h6 className="font-medium text-gray900 text-16">{question.title}</h6>
      </PanelHeader>
      <PanelBody>
        <QuestionForm question={question} />
        {errors[question.id] && (
          <p className="mt-10 text-red-500 text-14">
            {errors[question.id]?.message?.toString() || "필수 항목 입니다."}
          </p>
        )}
      </PanelBody>
    </Panel>
  );
}
