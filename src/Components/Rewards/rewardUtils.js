export const showReward = (
  type,
  amount = null
) => {

  localStorage.setItem(
    "rewardPopup",
    JSON.stringify({
      type,
      amount
    })
  );

};