import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/authenticated/HomePage";
import RequireAuth from "./RequireAuth";
import "./index.css";
import LandingPage from "./pages/unauthenticated/LandingPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
