import MainLayout from "@/components/common/MainLayout";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import EditPage from "@/pages/EditPage";
import AdminPage from "@/pages/AdminPage";
import CreatePage from "@/pages/CreatePage";
import FormPage from "@/pages/FormPage";
import CompletePage from "@/pages/CompletePage";
import StatisticsPage from "@/pages/StatisticsPage";
import Home from "@/pages/Home";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/firebaseApp";
import { useEffect, useState } from "react";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import Loader from "@/components/common/Loader";
import SurveyListPage from "@/pages/SurveyListPage";

function App() {
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth.currentUser
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setIsAuthenticated(true) : setIsAuthenticated(false);
    });

    setInit(true);
  }, [auth]);

  return (
    <MainLayout>
      {init ? (
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/surveys/new" element={<CreatePage />} />
              <Route
                path="/surveys/:userId/list"
                element={<SurveyListPage />}
              />
              <Route path="/surveys/:surveyId" element={<FormPage />} />
              <Route path="/surveys/:surveyId" element={<AdminPage />}>
                <Route path="edit" element={<EditPage />} />
                <Route path="responses" element={<StatisticsPage />} />
              </Route>
              <Route
                path="/surveys/:surveyId/complete"
                element={<CompletePage />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="*" element={<LoginPage />} />
            </>
          )}
        </Routes>
      ) : (
        <Loader />
      )}
    </MainLayout>
  );
}

export default App;
