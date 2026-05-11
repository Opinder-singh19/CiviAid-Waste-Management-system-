
const handleLogin = (

  email,
  password,

  setToastType,
  setToastMessage,
  setShowToast,
   navigate
) => {

  fetch(
    "https://civiaid-waste-management-system.onrender.com/api/auth/login",
    {

      method: "POST",

      headers: {
        "Content-Type":
        "application/json"
      },

      credentials: "include",

      body: JSON.stringify({
        email,
        password
      })
    }
  )

  .then(res => res.json())

  .then(data => {

if (
  data.message ===
  "Login success"
) {

  setToastType(
    "success"
  );

  setToastMessage(
    data.message
  );

  setShowToast(true);

  setTimeout(() => {

    navigate("/", {
    replace: true
  });

  }, 600);

}

else {

  setToastType(
    "error"
  );

  setToastMessage(
    data.message
  );

  setShowToast(true);

  setTimeout(() => {

    setShowToast(false);

  }, 1000);
}

  });

};

export default handleLogin;