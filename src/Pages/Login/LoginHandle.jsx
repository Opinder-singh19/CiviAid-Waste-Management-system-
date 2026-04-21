import { useNavigate } from "react-router-dom";

const handleLogin = (email, password, navigate) => {

 fetch("http://192.168.1.99:8000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {

    if(data.message === "Login success"){
      navigate("/", { replace: true }); 
    }

  });
};

export default handleLogin;