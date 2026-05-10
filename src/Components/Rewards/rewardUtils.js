export const showReward = (
  setRewardType,
  type
) => {
  setRewardType(type);

  setTimeout(() => {
    setRewardType(null);
  }, 5000);
};