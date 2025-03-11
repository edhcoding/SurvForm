import { FormProvider, useForm } from "react-hook-form";
import Section from "@/models/section";
import SectionTitleView from "@/components/form/SectionTitleView";
import QuestionView from "@/components/form/QuestionView";
import Button from "@/components/common/Button";
import { QuestionData } from "@/types/app";

interface Props {
  section: Section;
  last: boolean;
  onNext: () => void;
  onSave: (data: Record<QuestionData["id"], string | string[]>) => void;
}

export default function SectionView({ section, last, onNext, onSave }: Props) {
  const methods = useForm();

  const handleSubmitData = (
    data: Record<QuestionData["id"], string | string[]>
  ) => {
    onSave(data);
    onNext();
  };

  return (
    <FormProvider {...methods}>
      <form
        className="text-gray900 [&>*]:mb-24"
        onSubmit={methods.handleSubmit(handleSubmitData)}
      >
        <SectionTitleView section={section} />
        {section.questions.map((question) => (
          <QuestionView key={question.id} question={question} />
        ))}
        <Button type="submit">{last ? "제출" : "다음"}</Button>
      </form>
    </FormProvider>
  );
}
