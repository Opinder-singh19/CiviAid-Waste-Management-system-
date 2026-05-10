import { showReward }
from "../../Components/Rewards/rewardUtils";

const handleLogin = (
  email,
  password,
  navigate,
  setRewardType
) => {

 fetch("http://localhost:8000/api/auth/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    credentials: "include",

    body: JSON.stringify({
      email,
      password
    })
  })

  .then(res => res.json())

  .then(data => {

    if (data.rewardType) {

      showReward(
        setRewardType,
        data.rewardType
      );
    }

    if(data.message === "Login success"){

      navigate("/", {
        replace: true
      });

    }

  });
};

export default handleLogin;