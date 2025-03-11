import { SectionData, Statistics, SurveyResponse } from "@/types/app";

export function getStatistics(
  sections: SectionData[],
  responses: SurveyResponse[]
): Statistics {
  return responses.reduce((acc, cur) => {
    sections.forEach((section) => {
      const sectionResponse = cur[section.id];

      section.questions.forEach((question) => {
        if (!acc[section.id]) {
          acc[section.id] = {};
        }

        if (question.type === "longText") {
          const responseValue = sectionResponse[question.id] as string;
          const questionData = (acc[section.id][question.id] ?? []) as string[];

          questionData.push(responseValue);

          acc[section.id][question.id] = questionData;
        } else {
          const responseValues = sectionResponse[question.id] ?? [];
          const questionData = (acc[section.id][question.id] ?? {}) as Record<
            string,
            number
          >;

          Array.isArray(responseValues)
            ? responseValues
            : [responseValues].forEach((responseValue) => {
                // 카운트 증가
                questionData[responseValue] =
                  (questionData[responseValue] ?? 0) + 1;
              });

          acc[section.id][question.id] = questionData;
        }
      });
    });

    return acc;
  }, {} as Statistics);
}
