import "./Rewards.css";
import { rewardMessages } from "./rewardData";

export default function RewardPopup({
  rewardType,
}) {
  if (!rewardType) return null;

  const reward = rewardMessages[rewardType];

  return (
    <div className="reward-popup">
      <div className="reward-icon">
  <img
    src={reward.image}
    alt="coin"
  />
</div>

      <div className="reward-content">
        <h2>{reward.title}</h2>

        <p>{reward.desc}</p>
      </div>
    </div>
  );
}