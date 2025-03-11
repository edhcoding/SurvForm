import { observer } from "mobx-react-lite";
import { useSurveyStore } from "@/store";
import EditorMenu from "@/components/edit/EditorMenu";
import SectionEditor from "@/components/edit/sectionEditor";

const SectionListEditor = observer(function SectionListEditor() {
  const surveyStore = useSurveyStore();

  return (
    <div className="relative">
      <EditorMenu className="fixed sm:bottom-auto sm:top-[263px] sm:left-[calc(50%+340px)] bottom-30 left-[calc(100%-72px)]" />
      <div>
        {surveyStore.sections.map((section, index) => (
          <SectionEditor
            key={section.id}
            capTitle={`${surveyStore.sections.length}개 중 ${index + 1}섹션`}
            section={section}
            onChangeFocus={surveyStore.setFocusedSectionId}
          />
        ))}
      </div>
    </div>
  );
});

export default SectionListEditor;
