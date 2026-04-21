import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {

  const location = useLocation();

  // 👇 hide navbar on login pages
  const hideNavbar =
    location.pathname === "/civiAlogin" ||
    location.pathname === "/admin";

  return (
    <>
      {!hideNavbar && <Navbar />}   {/* 🔥 FIX */}

      <div className="page-content">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;