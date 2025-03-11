import SectionEditorList from "@/components/edit/SectionListEditor";
import Button from "@/components/common/Button";

export default function EditPage() {
  return (
    <>
      <Button type="button" className="absolute top-0 right-0">
        보내기
      </Button>
      <SectionEditorList></SectionEditorList>
    </>
  );
}
