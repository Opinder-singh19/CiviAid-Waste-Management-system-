import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/civiAlogin" ||
    location.pathname === "/admin";

  return (
    <>
      {!hideNavbar && <Navbar />}  

      <div className="page-content">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;