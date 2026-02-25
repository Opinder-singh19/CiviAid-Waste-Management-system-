import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
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
<<<<<<< HEAD
      <Route path="/" element={<CivicALogin />} />
      <Route path="/admin" element={<Admin />} />
      
=======
      <Route path="/civiAlogin" element={<CivicALogin />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<UserDashboard />} />
>>>>>>> 3117e45 (dashboard)
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
