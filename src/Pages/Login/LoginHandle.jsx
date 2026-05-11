
const handleLogin = (

  email,
  password,

  setToastType,
  setToastMessage,
  setShowToast

) => {

  fetch(
    "http://localhost:8000/api/auth/login",
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

    window.location.href =
    "/";

  }, 1500);

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

  }, 3000);
}

  });

};

export default handleLogin;