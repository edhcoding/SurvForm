import Panel, { PanelCap } from "@/components/common/Panel";
import { Link, useParams, useSearchParams } from "react-router-dom";

export default function CompletePage() {
  const [searchParams] = useSearchParams();
  const { surveyId } = useParams<{ surveyId: string }>();

  return (
    <div>
      <PanelCap></PanelCap>
      <Panel className="text-gray900">
        <Panel.Header className="mb-12 font-semibold text-24">
          <h5>{searchParams.get("title")}</h5>
        </Panel.Header>
        <Panel.Body>
          <p className="mb-17">응답이 기록되었습니다.</p>
          <Link
            className="inline-block py-2 text-blue-500 border-b-blue-500 border-b-1"
            to={`/surveys/${surveyId}`}
          >
            다른 응답 제출
          </Link>
        </Panel.Body>
      </Panel>
    </div>
  );
}
