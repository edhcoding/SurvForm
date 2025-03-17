import { makeAutoObservable, runInAction } from "mobx";
import { createContext, PropsWithChildren, useContext } from "react";
import Section from "./models/section";
import { SectionData } from "@/types/app";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseApp";

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

  async fetchSurvey(surveyId: string) {
    // callApi<{ sections: SectionData[]; emailCollected: boolean }>(
    //   `/surveys/${id}`
    // ).then(({ sections, emailCollected }) => {
    //   this.sections = sections.map((section) => new Section(section));
    //   this.emailCollected = emailCollected ?? false;
    // });
    const docRef = doc(db, "surveys", surveyId);

    const docSnap = await getDoc(docRef);

    // exists: 데이터 존재여부
    if (docSnap.exists()) {
      const data = docSnap.data();

      const newSections = data.sections.map(
        (section: SectionData) => new Section(section)
      );

      runInAction(() => {
        this.sections = newSections;
        this.focusedSectionId = newSections[0]?.id || null;
        this.emailCollected = data.emailCollected;
      });
    } else {
      console.log("No such document!");
    }
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
