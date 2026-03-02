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

import CivicALogin from "./Pages/Login/CivicAidLogin.jsx";
import Admin from "./Pages/Admin/Admin.jsx";
import UserDashboard from "./Pages/UserDashboard/UserDashboard.jsx";
import WasteG from "./Pages/WasteGuide/WasteG.jsx"
import Layout from "./Components/Layout/Layout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Layout />}>
      <Route index element={<CivicALogin />} />
      <Route path="admin" element={<Admin />} />
      <Route path="userdashboard" element={<UserDashboard />} />
      <Route path="wasteG" element={<WasteG />} />
    </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
