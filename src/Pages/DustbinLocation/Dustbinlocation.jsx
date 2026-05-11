import { ArrowLeft, RecycleIcon, Leaf, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import "./Dustbinlocation.css";
import { Trash2Icon, Navigation } from "lucide-react";
import DustbinMap from "../../Components/Map/DustbinMap";
import { useState, useEffect, useMemo } from "react";
import { dustbinLocations } from "../../data/Dustbins";
import { useLocation } from "react-router-dom";
import civiaidcoin from "../../assets/Dustbins/Civiaidcoin.png";
import RewardPopup
from "../../Components/Rewards/RewardPopup";

import {
rewardMessages
}
from "../../Components/Rewards/rewardData";
function Dustbinlocation() {
  
  const [userData, setUserData] = useState({});
  useEffect(() => {

  const fetchProfile = () => {

    fetch(
      "http://civiaid-waste-management-system.onrender.com/api/auth/profile",
      {
        credentials: "include"
      }
    )

    .then(res => res.json())

    .then(data => {

      setUserData(data);

    })

    .catch(err => {

      console.log(err);

    });

  };

  fetchProfile();

  const interval =
    setInterval(
      fetchProfile,
      6000
    );

  return () =>
    clearInterval(interval);

}, []);
  const [distance, setDistance] = useState(0);
  const getTheme = (type) => {
    if (type === "green") {
      return {
        color: "#16a34a",
        bg: "#dcfce7",
      };
    } else {
      return {
        color: "#2563eb",
        bg: "#dbeafe",
      };
    }
  };
  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }

  const [selectedDustbin, setSelectedDustbin] = useState(null);
  const [focusDustbinOnMap, setFocusDustbinOnMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [startRoute, setStartRoute] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const theme = getTheme(selectedDustbin?.type);
  const location = useLocation();
  const [isRouting, setIsRouting] = useState(false);
  const [showReward,
setShowReward]
= useState(false);

const [rewardData,
setRewardData]
= useState(null);
  const binType = location.state?.binType || "";
  const sortedBins = useMemo(() => {
    if (!userLocation) return [];

    return dustbinLocations
      .filter((bin) => {
        if (!binType) return true;
        return bin.type === binType;
      })
      .map((bin) => ({
        ...bin,
        distance: getDistance(
          userLocation[0],
          userLocation[1],
          bin.lat,
          bin.lng,
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
  }, [userLocation, binType]);
  useEffect(() => {
    if (sortedBins.length > 0 && !selectedDustbin) {
      setSelectedDustbin(sortedBins[0]);
    }
  }, [sortedBins]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://civiaid-waste-management-system.onrender.com/phone-location");
        const data = await res.json();


        if (data.lat && data.lng) {
          setUserLocation([data.lat, data.lng]);
        }
      } catch (err) {
        console.log(" Fetch error:", err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  useEffect(()=>{

const reward =

localStorage.getItem(
"rewardPopup"
);

if(reward){

const parsed =

JSON.parse(reward);

setRewardData({

...rewardMessages[
  parsed.type
],

amount:
parsed.amount

});

setShowReward(true);

localStorage.removeItem(
"rewardPopup"
);

setTimeout(()=>{

setShowReward(false);

},3500);

}

},[]);
  const nearestBin = sortedBins[0];
  const otherBins = sortedBins.slice(1);
  return (
    <div className="w-container">
      <div className="Location-head">
        <div className="Location-head-inline">
          <Link to="/">
            <div className="back1-Dash">
              <div className="Arrow-icon">
                <ArrowLeft size={20} />
              </div>
              <div className="back1">
                <p>Back to Dashboard</p>
              </div>
            </div>
          </Link>

          <div className="top-title1">
            <MapPin className="Location-recycle" size={45} />
            <h1 className="Location-title">Find Nearby Dustbins</h1>
          </div>
          <div className="Location-subhead-inline">
            <Leaf className="Location-leaf" size={18} />
            <p className="Location-subtitle">
              Locate eco-friendly waste disposal points near you
            </p>
          </div>
        </div>
        <div className="coin-box">
          <div className="coin-icon">
            <img src={civiaidcoin} alt="coin" />
          </div>

          <span className="coin-text">{userData.coins}</span>
        </div>
      </div>
      <div className="Waste-main">
        <div className="Location-map-section">
          <DustbinMap
            className="dustbin-main"
            setSelectedDustbin={setSelectedDustbin}
            setRouteFromParent={setStartRoute}
            setImageFromParent={setShowImage}
            setDistanceFromParent={setDistance}
            isRouting={isRouting}
            setIsRouting={setIsRouting}
            focusedDustbin={focusDustbinOnMap}
            setFocusedDustbin={setFocusDustbinOnMap}
          />
          {selectedDustbin && startRoute && (
            <div className="route-panel">
              <div className="route-left">
                📍 Distance:{" "}
                {((selectedDustbin?.distance || 0) * 1000).toFixed(0)} m
              </div>

              <div className="route-actions">
                {!isRouting ? (
                  <button
                    className="start-btn"
                    onClick={() => {
                      if (startRoute && selectedDustbin) {
                        startRoute([selectedDustbin.lat, selectedDustbin.lng]);
                        setIsRouting(true); 
                      }
                    }}
                  >
                    Start
                  </button>
                ) : (
                  <button
                    className="cancel-btn"
                    onClick={() => {
                      setIsRouting(false);
                      setFocusDustbinOnMap(null);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          )}
          {selectedDustbin && (
            <div
              className="featured-bin"
              style={{
                border: `2px solid ${theme.color}`,
                background: theme.bg,
              }}
            >
              <div className="bin-left">
                <div
                  className="bin-icon"
                  style={{
                    background:
                      selectedDustbin.type === "green" ? "#16a34a" : "#2563eb",

                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <Trash2Icon size={22} color="white" />
                </div>

                <div>
                  <h2>{selectedDustbin.name || "Selected Dustbin"}</h2>
                  <p>{selectedDustbin.distance.toFixed(1)} km away</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="direction-btn"
                  onClick={() => {
                    setFocusDustbinOnMap(selectedDustbin);
                  }}
                >
                  <div className="get-direction">
                    <Navigation size={18} />
                    Show on Map
                  </div>
                </button>

                {selectedDustbin.image && (
                  <button
                    onClick={() =>
                      showImage && showImage(selectedDustbin.image)
                    }
                  >
                    View Image
                  </button>
                )}
              </div>
            </div>
          )}
          <h3 className="nearby-title">
            {binType
              ? `Nearby ${binType.toUpperCase()} Dustbins`
              : "All Nearby Eco-Points"}
          </h3>

          {otherBins.map((bin) => (
            <div
              key={bin.id}
              className="bin-card"
              style={{
                border:
                  selectedDustbin?.id === bin.id
                    ? `2px solid ${
                        bin.type === "green" ? "#16a34a" : "#2563eb"
                      }`
                    : "1px solid #ddd",
                background:
                  selectedDustbin?.id === bin.id
                    ? bin.type === "green"
                      ? "#dcfce7"
                      : "#dbeafe"
                    : "#fff",
              }}
              onClick={() => setSelectedDustbin(bin)}
            >
              <div className="bin-left">
                <div
                  className="bin-icon"
                  style={{
                    backgroundColor:
                      bin.type === "green" ? "#16a34a" : "#2563eb",
                    color: "white",
                    width: "45px",
                    height: "45px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10px",
                    flexShrink: 0,
                  }}
                >
                  <Trash2Icon size={22} />
                </div>

                <div>
                  <h4>{bin.name || `${bin.type.toUpperCase()} Dustbin`}</h4>
                  <p>{bin.distance.toFixed(1)} km</p>
                </div>
              </div>

              {selectedDustbin?.id === bin.id && (
                <span className="selected-tag">Selected</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <RewardPopup

show={true}

coins={10}

/>
    </div>
  );
}
export default Dustbinlocation;
