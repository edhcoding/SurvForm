import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "@/context/AuthProvider";
import { SurveyStoreProvider } from "@/store";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SurveyStoreProvider>
        <BrowserRouter>
          <ToastContainer />
          <App />
        </BrowserRouter>
      </SurveyStoreProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
