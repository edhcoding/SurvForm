import { Controller, useFormContext } from "react-hook-form";
import Question from "@/models/question";
import Input from "@/components/common/Input";
import Dropdown from "@/components/common/Dropdown";
import Textarea, { AutoGrow } from "@/components/common/Textarea";
import Radio from "@/components/common/Radio";
import Checkbox from "@/components/common/Checkbox";

interface Props {
  question: Question;
}

export default function QuestionForm({ question }: Props) {
  const { control, register } = useFormContext();

  switch (question.type) {
    case "shortText":
      return (
        <Input
          className="w-full pt-0 pb-16 border-b-2 focus:border-main focus:bg-transparent"
          {...register(`${question.id}`, {
            required: {
              value: question.required,
              message: "필수 항목 입니다.",
            },
          })}
        />
      );
    case "date":
      return (
        <Input
          type="date"
          {...register(`${question.id}`, {
            required: {
              value: question.required,
              message: "필수 항목 입니다.",
            },
          })}
        />
      );
    case "time":
      return (
        <Input
          type="time"
          {...register(`${question.id}`, {
            required: {
              value: question.required,
              message: "필수 항목 입니다.",
            },
          })}
        />
      );
    case "dropdown":
      return (
        <Controller
          name={`${question.id}`}
          control={control}
          render={({ field }) => (
            <Dropdown
              options={question.options!.map((option) => ({
                label: <span>{option}</span>,
                value: option,
              }))}
              onChange={field.onChange}
            />
          )}
          rules={{
            required: {
              value: question.required,
              message: "필수 항목 입니다.",
            },
          }}
        />
      );
    case "longText":
      return (
        <AutoGrow className="w-full" forTextarea={`${question.id}`}>
          <Textarea
            rows={1}
            className="w-full border-b-2 focus:bg-transparent focus:border-main"
            {...register(`${question.id}`, {
              required: {
                value: question.required,
                message: "필수 항목 입니다.",
              },
            })}
          />
        </AutoGrow>
      );
    case "multipleChoice":
      return (
        <div className="flex flex-col gap-y-20">
          {question.options!.map((option) => (
            <Radio
              key={option}
              label={option}
              value={option}
              {...register(`${question.id}`, {
                required: {
                  value: question.required,
                  message: "필수 항목 입니다.",
                },
              })}
            />
          ))}
        </div>
      );
    case "checkbox":
      return (
        <div className="flex flex-col gap-y-20">
          {question.options!.map((option) => (
            <Checkbox
              key={option}
              label={option}
              value={option}
              {...register(`${question.id}`, {
                required: {
                  value: question.required,
                  message: "필수 항목 입니다.",
                },
              })}
            />
          ))}
        </div>
      );
    default:
      return null;
  }
}
