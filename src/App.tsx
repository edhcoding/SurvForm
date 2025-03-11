import MainLayout from "@/components/common/MainLayout";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SurveyStoreProvider } from "@/store";

function App() {
  return (
    <BrowserRouter>
      <SurveyStoreProvider>
        <MainLayout>
          <Routes>
            <Route path="/surveys/new" element={<CreatePage />} />
            <Route path="/surveys/:surveyId" element={<FormPage />} />
            <Route path="/surveys/:surveyId" element={<AdminPage />}>
              <Route path="edit" element={<EditPage />} />
              <Route path="responses" element={<StatisticsPage />} />
            </Route>
            <Route
              path="/surveys/:surveyId/complete"
              element={<CompletePage />}
            />
          </Routes>
        </MainLayout>
      </SurveyStoreProvider>
    </BrowserRouter>
  );
}

export default App;
