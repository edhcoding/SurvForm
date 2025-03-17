import { observer } from "mobx-react-lite";
import Section from "@/models/section";
import Input from "@/components/common/Input";
import Panel, { PanelCap } from "@/components/common/Panel";
import { useFormContext } from "react-hook-form";
import { ChangeEvent } from "react";

interface Props {
  capTitle: string;
  section: Section;
}

const SectionTitleEditor = observer(function SectionTitleEditor({
  capTitle,
  section,
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
      section.setTitle("");
      return;
    }

    section.setTitle(value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (value.trim() === "") {
      section.setDescription("");
      return;
    }

    section.setDescription(value);
  };

  return (
    <div>
      <PanelCap>{capTitle}</PanelCap>
      <Panel>
        <Panel.Body className="flex flex-col">
          <div className="relative mb-17">
            <Input
              value={section.title}
              // onChange={(e) => section.setTitle(e.currentTarget.value)}
              className="py-8 font-semibold text-gray900 text-24"
              {...register("title", {
                required: {
                  value: true,
                  message: "제목을 입력해주세요.",
                },
                onChange: handleChangeTitle,
              })}
            />
            {errors.title && (
              <p className="absolute font-semibold text-red-500 select-none top-full text-12">
                {errors.title.message as string}
              </p>
            )}
          </div>
          <div className="relative">
            <Input
              value={section.description}
              // onChange={(e) => section.setDescription(e.currentTarget.value)}
              className="py-3 text-gray800 text-16"
              {...register("description", {
                required: {
                  value: true,
                  message: "설명을 입력해주세요.",
                },
                onChange: handleChangeDescription,
              })}
            />
            {errors.description && (
              <p className="absolute font-semibold text-red-500 select-none top-full text-12">
                {errors.description.message as string}
              </p>
            )}
          </div>
        </Panel.Body>
      </Panel>
    </div>
  );
});

export default SectionTitleEditor;
