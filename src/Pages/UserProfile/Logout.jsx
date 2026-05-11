const handleLogout = () => {

 fetch("http://civiaid-waste-management-system.onrender.com/api/auth/logout", {
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