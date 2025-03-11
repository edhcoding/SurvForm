import MainLayout from "@/components/common/MainLayout";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SurveyStoreProvider } from "@/store";
import EditPage from "@/pages/EditPage";
import AdminPage from "@/pages/AdminPage";
import CreatePage from "@/pages/CreatePage";
import FormPage from "@/pages/FormPage";
import CompletePage from "@/pages/CompletePage";

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
              <Route path="responses" element={<div>hi</div>} />
            </Route>
          </Routes>
          <Route
            path="/surveys/:surveyId/complete"
            element={<CompletePage />}
          />
        </MainLayout>
      </SurveyStoreProvider>
    </BrowserRouter>
  );
}

export default App;
