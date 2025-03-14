import MainLayout from "@/components/common/MainLayout";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SurveyStoreProvider } from "@/store";
import EditPage from "@/pages/EditPage";
import AdminPage from "@/pages/AdminPage";
import CreatePage from "@/pages/CreatePage";
import FormPage from "@/pages/FormPage";
import CompletePage from "@/pages/CompletePage";
import StatisticsPage from "@/pages/StatisticsPage";
import Home from "@/pages/Home";

function App() {
  return (
    <BrowserRouter>
      <SurveyStoreProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
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
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MainLayout>
      </SurveyStoreProvider>
    </BrowserRouter>
  );
}

export default App;
