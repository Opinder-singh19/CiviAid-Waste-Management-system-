import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import CivicALogin from "./Components/Pages/CivicAidLogin.jsx";
import Admin from "./Components/Pages/Admin.jsx";
import UserDashboard from "./Components/Pages/UserDashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route path="/civic" element={<CivicALogin />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<UserDashboard />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
