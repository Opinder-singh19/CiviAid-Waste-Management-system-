import "./Rewards.css";
import { rewardMessages } from "./rewardData";

import {
  CheckCircle2,
} from "lucide-react";

export default function RewardPopup({
  rewardType,
  rewardAmount,
}) {

  if (!rewardType) return null;

  const reward =
    rewardMessages[rewardType];

  if (!reward) return null;

  return (

    <div className="reward-toast">

      <div className="reward-left">

        <div className="reward-check">

          <CheckCircle2 size={20} />

        </div>

        <img
          src={reward.image}
          alt="coin"
          className="reward-coin"
        />

      </div>

      <div className="reward-info">

        <h3>
          {reward.title}
        </h3>

        <p>
          {reward.desc}
        </p>

      </div>

      <div className="reward-amount">

        +{
rewardAmount ||
reward.amount
}

      </div>

    </div>

  );
}