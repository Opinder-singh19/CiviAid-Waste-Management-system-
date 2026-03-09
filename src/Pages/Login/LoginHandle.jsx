const handleLogin = () => {

  fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data.message);
  });

};
export default handleLogin;