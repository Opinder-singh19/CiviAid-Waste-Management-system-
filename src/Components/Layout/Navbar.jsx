import { NavLink } from "react-router-dom";
import "./Navbar.css"

function Navbar() {
  return (
    <div className="Navbar-main-outerbox">
    <nav className="Navbar-main">
      <NavLink className="link2" to="/civiAlogin">Login</NavLink>
      <NavLink className="link1" to="/admin">Admin Login</NavLink>
      <NavLink className="link3" to="/">User Dashboard</NavLink>
      <NavLink className="link4" to="/wasteG">Waste Guidance</NavLink>
      <NavLink className="link5" to="/dustbinlocation">Dustbin Location</NavLink>
      <NavLink className="link6" to="/B">Admin Dashboard</NavLink>
    </nav>
    </div>
  );
}

export default Navbar;