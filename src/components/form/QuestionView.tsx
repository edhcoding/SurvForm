import Question from "@/models/question";
import QuestionForm from "@/components/form/QuestionForm";
import { useFormContext } from "react-hook-form";
import cn from "classnames";
import Panel from "@/components/common/Panel";

interface Props {
  question: Question;
}

export default function QuestionView({ question }: Props) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Panel className={cn({ "border-red-500 border": errors[question.id] })}>
      <Panel.Header className="flex mb-31">
        <h6 className="font-medium text-gray900 text-16">{question.title}</h6>
      </Panel.Header>
      <Panel.Body>
        <QuestionForm question={question} />
        {errors[question.id] && (
          <p className="mt-10 text-red-500 text-14">
            {errors[question.id]?.message?.toString() || "필수 항목 입니다."}
          </p>
        )}
      </Panel.Body>
    </Panel>
  );
}
