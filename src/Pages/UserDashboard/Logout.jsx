const handleLogout = () => {

 fetch("http://localhost:8000/logout",{
   credentials:"include"
 })
 .then(res => res.json())
 .then(data => {

   if(data.message === "Logged out"){
     window.location.href="/civiAlogin";
   }

 });

};
export default handleLogout;