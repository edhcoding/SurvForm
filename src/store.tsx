import { makeAutoObservable } from "mobx";
import { createContext, PropsWithChildren, useContext } from "react";
import Section from "./models/section";
import callApi from "@/utils/api";
import { SectionData } from "@/types/app";

class SurveyStore {
  sections: Section[];
  focusedSectionId: number | null;
  emailCollected: boolean;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    this.sections = [new Section()];
    this.focusedSectionId = this.sections[0].id;
    this.emailCollected = false;
  }

  addSection() {
    const section = new Section();
    this.sections.push(section);
    this.focusedSectionId = section.id;
  }

  setFocusedSectionId(id: number) {
    this.focusedSectionId = id;
  }

  addQuestion() {
    const section = this.sections.find(
      (section) => section.id === this.focusedSectionId
    );

    if (section) {
      section.addQuestion();
    }
  }

  fetchSurvey(id: number) {
    callApi<{ sections: SectionData[]; emailCollected: boolean }>(
      `/surveys/${id}`
    ).then(({ sections, emailCollected }) => {
      this.sections = sections.map((section) => new Section(section));
      this.emailCollected = emailCollected ?? false;
    });
  }
}

const surveyStore = new SurveyStore();

const SurveyStoreContext = createContext(surveyStore);

export const useSurveyStore = () => useContext(SurveyStoreContext);

export const SurveyStoreProvider = ({ children }: PropsWithChildren) => (
  <SurveyStoreContext.Provider value={surveyStore}>
    {children}
  </SurveyStoreContext.Provider>
);
