const handleLogout = () => {

 fetch("http://192.168.1.99:8000/api/auth/logout", {
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