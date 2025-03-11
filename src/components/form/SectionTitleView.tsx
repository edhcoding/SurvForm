import Section from "@/models/section";
import Panel, { PanelBody, PanelCap } from "@/components/common/Panel";

interface Props {
  section: Section;
}

export default function SectionTitleView({ section }: Props) {
  return (
    <div>
      <PanelCap />
      <Panel>
        <PanelBody className="flex flex-col">
          <h4 className="font-semibold text-gray900 mb-17 text-24">
            {section.title}
          </h4>
          <p className="text-gray700 text-16">{section.description}</p>
        </PanelBody>
      </Panel>
    </div>
  );
}
