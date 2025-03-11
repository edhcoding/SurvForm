import { Cell, Legend, Pie, PieChart, PieLabel } from "recharts";
import Question from "@/models/question";
import { QuestionData, Statistics } from "@/types/app";
import Panel from "@/components/common/Panel";

interface Props {
  question: Question;
  statistics: Statistics[QuestionData["id"]][QuestionData["id"]];
}

export default function QuestionStatistics({ question, statistics }: Props) {
  if (question.type === "longText") {
    const typedStatistics = statistics as string[];

    return (
      <Panel className="text-gray900">
        <Panel.Header>
          <h6 className="font-medium text-17 mb-18">{question.title}</h6>
          <p className="text-gray800 text-16 mb-21">
            응답 {typedStatistics.length}개
          </p>
        </Panel.Header>
        <Panel.Body className="flex flex-col gap-y-9">
          {typedStatistics.map((response, index) =>
            response ? (
              <p
                key={index}
                className="font-medium text-black text-15 p-17 rounded-10 bg-bg"
              >
                {response}
              </p>
            ) : null
          )}
        </Panel.Body>
      </Panel>
    );
  } else {
    const typedStatistics = statistics as Record<string, number>;
    const entries = Object.entries(typedStatistics);
    const total = entries.reduce((acc, [, cur]) => acc + cur, 0);

    return (
      <Panel className="text-gray900">
        <Panel.Header>
          <h6 className="font-medium text-17 mb-18">{question.title}</h6>
          <p className="text-gray800 text-16 mb-21">응답 {total}개</p>
        </Panel.Header>
        <Panel.Body className="flex flex-col items-center gap-y-9">
          <PieChart width={410} height={250}>
            <Pie
              cx="35%"
              data={entries}
              nameKey={0}
              dataKey={1}
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {entries.map(([key], index) => (
                <Cell key={key} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend
              align="right"
              verticalAlign="middle"
              layout="vertical"
              iconType="circle"
              iconSize={16}
            />
          </PieChart>
        </Panel.Body>
      </Panel>
    );
  }
}

const COLORS = ["#0D00A4", "#0D00A4CC", "#0D00A499", "#0D00A466", "#0D00A433"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel: PieLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
