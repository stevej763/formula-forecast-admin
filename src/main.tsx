import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";

import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import "./index.css";
import SignInPage from "./pages/unauthenticated/SignInPage";
import AdminLayout from "./pages/authenticated/AdminLayout";
import SeasonTab from "./pages/authenticated/tabs/SeasonTab";
import ConstructorsTab from "./pages/authenticated/tabs/ConstructorsTab";
import DriversTab from "./pages/authenticated/tabs/DriversTab";
import RaceWeekendsTab from "./pages/authenticated/tabs/RaceWeekendsTab";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route path="/season" element={<SeasonTab />} />
            <Route path="/constructors" element={<ConstructorsTab />} />
            <Route path="/drivers" element={<DriversTab />} />
            <Route path="/weekends" element={<RaceWeekendsTab />} />
          </Route>
          <Route path="/home" element={<Navigate to="/weekends" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
