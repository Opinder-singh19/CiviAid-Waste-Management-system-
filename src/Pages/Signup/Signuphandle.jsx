import { showReward }
from "../../Components/Rewards/rewardUtils";
const handleSignup = (
  e,
  navigate,
  setRewardType
) => {

  e.preventDefault();

  const form = e.target;

  const data = {
    fullName: form[0].value,
    phone: form[1].value,
    email: form[2].value,
    location: form[3].value,
    password: form[4].value,
    confirmPassword: form[5].value
  };

 fetch("http://localhost:8000/api/auth/signup",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    credentials:"include",
    body:JSON.stringify(data)
  })
  .then(res=>res.json())
  .then(result => {
    console.log(result);

  if (result.rewardType) {

    showReward(
  result.rewardType
);

window.location.href = "/";

  }

  else {

    alert(result.message);

  }

})
};

export default handleSignup;