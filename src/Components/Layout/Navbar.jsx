import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {

  const [role, setRole] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/auth/check-auth", {
  credentials: "include"
})
      .then(res => res.json())
      .then(data => {
        setLoggedIn(data.loggedIn);
        setRole(data.role);
      });
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
          </>
        )}

      
        {loggedIn && role === "admin" && (
          <>
            <NavLink className="link6" to="/B">Admin Dashboard</NavLink>
          </>
        )}

      </nav>
    </div>
  );
}

export default Navbar;