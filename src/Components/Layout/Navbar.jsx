import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import RewardPopup
from "../../Components/Rewards/RewardPopup";
function Navbar({ setRewardType }) {
  const [role, setRole] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userRes = await fetch(
          "http://localhost:8000/api/auth/check-auth",

          {
            credentials: "include",
          },
        );

        const userData = await userRes.json();

        if (userData.loggedIn) {
          setLoggedIn(true);

          setRole("user");

          if (userData.pendingRewards?.length) {
            const reward =
userData.pendingRewards[
userData.pendingRewards.length - 1
];

setRewardType(reward);

            setTimeout(async () => {
              await fetch("http://localhost:8000/api/auth/clear-reward", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  rewardType: reward,
                }),
              });

              setRewardType(null);
            }, 3000);
          }

          return;
        }

        const adminRes = await fetch(
          "http://localhost:8000/api/admin/check-auth",

          {
            credentials: "include",
          },
        );

        const adminData = await adminRes.json();

        if (adminData.loggedIn) {
          setLoggedIn(true);

          setRole("admin");

          return;
        }

        setLoggedIn(false);

        setRole(null);
      } catch (err) {
        console.log(err);
      }
    };

    checkAuth();

    const interval = setInterval(checkAuth, 2000);

    return () => clearInterval(interval);
  }, []);
  const [rewardTypePopup,
  setRewardTypePopup]
  = useState(null);
  
  const [rewardAmountPopup,
  setRewardAmountPopup]
  = useState(0);
  useEffect(() => {

  if (!loggedIn || role !== "user") {
    localStorage.removeItem("rewardPopup");
    return;
  }

  const checkRewardPopup = () => {

    const reward =
      localStorage.getItem(
        "rewardPopup"
      );

    if (!reward) return;

    const parsed =
      JSON.parse(reward);

    setRewardTypePopup(
      parsed.type
    );

    setRewardAmountPopup(
      parsed.amount
    );

    localStorage.removeItem(
      "rewardPopup"
    );

    setTimeout(() => {

      setRewardTypePopup(null);

    }, 3500);

  };

  checkRewardPopup();

  const interval =
    setInterval(
      checkRewardPopup,
      1000
    );

  return () =>
    clearInterval(interval);

}, [loggedIn, role]);
  return (
    <div className="Navbar-main-outerbox">
      <nav className="Navbar-main">
        {!loggedIn && (
          <>
            <NavLink className="link3" to="/">
              User Dashboard
            </NavLink>
            <NavLink className="link2" to="/civiAlogin">
              Login
            </NavLink>
            <NavLink className="link1" to="/admin">
              Admin Login
            </NavLink>
          </>
        )}

        {loggedIn && role === "user" && (
          <>
            <NavLink className="link3" to="/">
              User Dashboard
            </NavLink>
            <NavLink className="link4" to="/wasteG">
              Waste Guidance
            </NavLink>
            <NavLink className="link5" to="/dustbinlocation">
              Dustbin Location
            </NavLink>
            <NavLink className="link6" to="/UserComplaints">
              User Complaints
            </NavLink>
            <NavLink className="link6" to="/UserProfile">
              User Profile
            </NavLink>
          </>
        )}

        {loggedIn && role === "admin" && (
          <>
            <NavLink className="link6" to="/admin/Counsellordashboard">
              Counsellor Dashboard
            </NavLink>
          </>
        )}
      </nav>
      <RewardPopup
        rewardType={rewardTypePopup}
        rewardAmount={rewardAmountPopup}
      />
    </div>
  );
}

export default Navbar;
