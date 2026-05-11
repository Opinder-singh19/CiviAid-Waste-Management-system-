import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
  window.onpopstate = function () {
    window.history.go(1);
  };

    fetch("https://civiaid-waste-management-system.onrender.com:8000/api/auth/check-auth", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(userData => {

        if (userData.loggedIn) {
          setLoggedIn(true);
          setLoading(false);
        } else {
          fetch("http://civiaid-waste-management-system.onrender.com:8000/api/admin/check-auth", {
            credentials: "include"
          })
            .then(res => res.json())
            .then(adminData => {
              setLoggedIn(adminData.loggedIn);
              setLoading(false);
            });
        }

      })
      .catch(() => {
        setLoggedIn(false);
        setLoading(false);
      });

  }, []);

  if (loading) return <div>Loading...</div>;

  if (!loggedIn) {
    return <Navigate to="/civiAlogin" replace />;
  }

  return children;
}