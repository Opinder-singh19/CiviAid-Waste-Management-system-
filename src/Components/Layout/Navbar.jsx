import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar({
  setRewardType
}) {

  const [role, setRole] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

useEffect(() => {

  const checkAuth = () => {

    fetch(
      "http://localhost:8000/api/auth/check-auth",
      {
        credentials: "include"
      }
    )

    .then(res => res.json())

    .then(userData => {

      if (userData.loggedIn) {

        setLoggedIn(true);

        setRole("user");

        if (
          userData.pendingRewards?.length
        ) {

          const reward =
            userData.pendingRewards[0];

          setRewardType(reward);

          fetch(
            "http://localhost:8000/api/auth/clear-reward",
            {

              method: "POST",

              headers: {
                "Content-Type":
                "application/json"
              },

              credentials: "include",

              body: JSON.stringify({
                rewardType: reward
              })
            }
          );

          setTimeout(() => {

            setRewardType(null);

          }, 3000);
        }

      }

    });

  };

  checkAuth();

  const interval =
    setInterval(
      checkAuth,
      5000
    );

  return () =>
    clearInterval(interval);

}, []);

  return (
    <div className="Navbar-main-outerbox">
      <nav className="Navbar-main">

      

        {!loggedIn && (
          <>
          <NavLink className="link3" to="/">User Dashboard</NavLink>
            <NavLink className="link2" to="/civiAlogin">Login</NavLink>
            <NavLink className="link1" to="/admin">Admin Login</NavLink>
          </>
        )}

      
        {loggedIn && role === "user" && (
          <>
          <NavLink className="link3" to="/">User Dashboard</NavLink>
            <NavLink className="link4" to="/wasteG">Waste Guidance</NavLink>
            <NavLink className="link5" to="/dustbinlocation">Dustbin Location</NavLink>
            <NavLink className="link6" to="/UserComplaints">User Complaints</NavLink>
            <NavLink className="link6" to="/UserProfile">User Profile</NavLink>
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
    </div>
  );
}

export default Navbar;