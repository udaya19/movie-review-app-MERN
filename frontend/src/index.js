import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./context/ThemeProvider";
import { ToastProvider } from "react-toast-notifications";
import AuthProvider from "./context/AuthProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider
            autoDismiss
            autoDismissTimeout={5000}
            placement="top-right"
          >
            <App />
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
