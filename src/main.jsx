import { StrictMode, useState }
from "react";

import { createRoot }
from "react-dom/client";

import "leaflet/dist/leaflet.css";

import "./index.css";
import { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import RewardPopup
from "./Components/Rewards/RewardPopup";

import Layout
from "./Components/Layout/Layout.jsx";

import ProtectedRoute
from "./Components/ProtectedRoute.jsx";

import CivicALogin
from "./Pages/Login/CivicAidLogin.jsx";

import Admin
from "./Pages/Admin/Admin.jsx";

import UserDashboard
from "./Pages/UserDashboard/UserDashboard.jsx";

import WasteG
from "./Pages/WasteGuide/WasteG.jsx";

import Dustbinlocation
from "./Pages/DustbinLocation/Dustbinlocation.jsx";

import SignUp
from "./Pages/Signup/signup.jsx";

import Forgotpassword
from "./Pages/Forgotpassword/forgotpassword.jsx";

import NewPassword
from "./Pages/Newpassword/Newpassword.jsx";

import Counsellor
from "./Pages/Counsellor/CounsellorDashboard.jsx";

import Usercomplaints
from "./Pages/UserComplaints/Usercomplaint.jsx";

import Mycomplaint
from "./Pages/UserComplaints/Mycomplaints.jsx";

import UserProfile
from "./Pages/Userprofile/Userprofile.jsx";

import VerifyDisposal
from "./Components/Map/VerifyDisposal";
function AppWrapper() {
useEffect(() => {

  const reward =
    localStorage.getItem(
      "rewardPopup"
    );

  if (reward) {

    setRewardType(reward);

    setTimeout(() => {

      setRewardType(null);

      localStorage.removeItem(
        "rewardPopup"
      );

    }, 3000);

  }

}, []);
  const [rewardType, setRewardType] =
    useState(null);

  const router =
    createBrowserRouter(
      createRoutesFromElements(

        <Route
          path="/"
          element={
  <Layout
    setRewardType={
      setRewardType
    }
  />
}
        >

          <Route
            index
            element={<UserDashboard />}
          />

          <Route
            path="admin"
            element={<Admin />}
          />

          <Route
            path="civiAlogin"
            element={
              <CivicALogin
                setRewardType={
                  setRewardType
                }
              />
            }
          />

          <Route
            path="signUp"
            element={
              <SignUp
                setRewardType={
                  setRewardType
                }
              />
            }
          />

          <Route
            path="forgotpassword"
            element={<Forgotpassword />}
          />

          <Route
            path="reset-password"
            element={<NewPassword />}
          />

          <Route

  path="/verify-disposal"

  element={
    <VerifyDisposal />
  }

/>
          <Route
            path="admin/Counsellordashboard"
            element={
              <ProtectedRoute>
                <Counsellor />
              </ProtectedRoute>
            }
          />

          <Route
            path="wasteG"
            element={
              <ProtectedRoute>
                <WasteG />
              </ProtectedRoute>
            }
          />

          <Route
            path="Mycomplaints"
            element={
              <ProtectedRoute>
                <Mycomplaint />
              </ProtectedRoute>
            }
          />

          <Route
            path="UserComplaints"
            element={
              <ProtectedRoute>
                <Usercomplaints />
              </ProtectedRoute>
            }
          />

          <Route
            path="UserProfile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="dustbinlocation"
            element={
              <ProtectedRoute>
                <Dustbinlocation />
              </ProtectedRoute>
            }
          />

        </Route>
      )
    );

  return (
    <>

      <RewardPopup
        rewardType={rewardType}
      />

      <RouterProvider
        router={router}
      />

    </>
  );
}

createRoot(
  document.getElementById("root")
).render(

  <StrictMode>

    <AppWrapper />

  </StrictMode>
);