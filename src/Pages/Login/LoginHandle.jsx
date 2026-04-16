const handleLogin = (email, password) => {

 fetch("http://192.168.1.99:8000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(res => res.json())
  .then(data => {

    console.log(data.message);

    if(data.message === "Login success"){
      window.location.href = "/";
    }

  });

};

export default handleLogin;