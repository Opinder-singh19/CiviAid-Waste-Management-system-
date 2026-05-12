import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
// reward system 
function Layout({
  setRewardType
}) {

  const location = useLocation();

  const hideNavbar = false;

  return (
    <>
      {!hideNavbar && <Navbar
  setRewardType={
    setRewardType
  }
/>}  

      <div className="page-content">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;