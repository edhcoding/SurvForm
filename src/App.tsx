import MainLayout from "@/components/common/MainLayout";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SurveyStoreProvider } from "@/store";
import EditPage from "@/pages/EditPage";
import AdminPage from "@/pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <SurveyStoreProvider>
        <MainLayout>
          <Routes>
            <Route path="/surveys/:surveyId" element={<AdminPage />}>
              <Route path="edit" element={<EditPage />} />
              <Route path="responses" element={<div>hi</div>} />
            </Route>
          </Routes>
        </MainLayout>
      </SurveyStoreProvider>
    </BrowserRouter>
  );
}

export default App;
