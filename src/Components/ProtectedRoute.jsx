import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

 const [loading, setLoading] = useState(true);
 const [loggedIn, setLoggedIn] = useState(false);

 useEffect(() => {

  fetch("http://localhost:8000/check-auth", {
    credentials: "include"
  })
  .then(res => res.json())
  .then(data => {

    setLoggedIn(data.loggedIn);
    setLoading(false);

  });

 }, []);

 if(loading){
   return <div>Loading...</div>;
 }

 if(!loggedIn){
   return <Navigate to="/civiAlogin" />;
 }

 return children;
}