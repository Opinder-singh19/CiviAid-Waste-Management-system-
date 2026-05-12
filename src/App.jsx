import { useState } from "react";

import "./App.css";

import DustbinMap from "./Components/Map/DustbinMap";
import CivicALogin from "./Pages/Login/CivicAidLogin";
import Adminlogin from "./Pages/Admin/Admin";
import WasteG from "./Pages/WasteGuide/WasteG";

import RewardPopup from "./Components/Rewards/RewardPopup";

function App() {
  const [rewardType, setRewardType] =
    useState(null);

  return (
    <>
      <RewardPopup
        rewardType={rewardType}
      />

      <CivicALogin
        setRewardType={setRewardType}
      />

      <Adminlogin />

      <DustbinMap
        setRewardType={setRewardType}
      />

      <WasteG />
    </>
  );
}

export default App;