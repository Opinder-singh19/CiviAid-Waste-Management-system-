const handleLogout = () => {

 fetch("http://civiaid-waste-management-system.onrender.com:8000/api/auth/logout", {
  credentials: "include"
})
 .then(res => res.json())
 .then(data => {

   if(data.message === "Logged out"){
     window.location.href="/civiAlogin";
   }

 });

};
export default handleLogout;