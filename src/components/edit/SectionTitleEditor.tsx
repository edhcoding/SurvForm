import { observer } from "mobx-react-lite";
import Section from "@/models/section";
import Input from "@/components/common/Input";
import Panel, { PanelCap } from "@/components/common/Panel";

interface Props {
  capTitle: string;
  section: Section;
}

const SectionTitleEditor = observer(function SectionTitleEditor({
  capTitle,
  section,
}: Props) {
  return (
    <div>
      <PanelCap>{capTitle}</PanelCap>
      <Panel>
        <Panel.Body className="flex flex-col">
          <Input
            value={section.title}
            onChange={(e) => section.setTitle(e.currentTarget.value)}
            className="py-8 font-semibold text-gray900 mb-17 text-24"
          />
          <Input
            value={section.description}
            onChange={(e) => section.setDescription(e.currentTarget.value)}
            className="py-3 text-gray700 text-16"
          />
        </Panel.Body>
      </Panel>
    </div>
  );
});

export default SectionTitleEditor;
