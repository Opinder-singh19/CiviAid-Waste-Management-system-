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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route path="/civic" element={<CivicALogin />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
      <Route path="/wasteG" element={<WasteG/>}/>

    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
