import Panel, { PanelCap } from "@/components/common/Panel";
import Section from "@/models/section";

interface Props {
  capTitle: string;
  section: Section;
}

export default function SectionTitleView({ capTitle, section }: Props) {
  return (
    <div>
      <PanelCap>{capTitle}</PanelCap>
      <Panel>
        <Panel.Body className="flex flex-col">
          <h4 className="font-semibold text-gray900 mb-17 text-24">
            {section.title}
          </h4>
          <p className="text-gray700 text-16">{section.description}</p>
        </Panel.Body>
      </Panel>
    </div>
  );
}
