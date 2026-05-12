import "./Usercomplaint.css";
import { Link } from "react-router-dom";
import {
  Leaf,
  RecycleIcon,
  LogOut,
  Mail,
  Lock,
  HistoryIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import DustbinMapPicker from "../../Components/Map/DustbinMapPicker";
import SuccessPopup
from "../../Components/Popup/SuccessPopup";
export default function UserComplaints() {
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [showPopup,
setShowPopup]
= useState(false);

const [popupMessage,
setPopupMessage]
= useState("");

  const [location, setLocation] = useState({
    address: "",
    lat: null,
    lng: null,
  });
  const [counsellor, setCounsellor] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setLoadingLocation(false);

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const address = await getAddressFromCoords(lat, lng);

        setLocation({
          address,
          lat,
          lng,
        });

        setShowMap(false);
      },
      (error) => {
        setLoadingLocation(false);

        console.log("GPS Error:", error);

        setShowMap(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };

  useEffect(() => {
    setIssue("");
    setCounsellor("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log({
  issueType: issue,
  description,
  location,
  counsellor
});
      const res = await fetch("http://localhost:8000/api/auth/complaint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
  issueType: issue,
  description: description,
  location: location?.lat && location?.lng ? location : { lat: null, lng: null },
  counsellor: counsellor,
})
      });

      const data = await res.json();

setPopupMessage(
  data.Message
);

setShowPopup(true);
setIssue("");

setDescription("");

setCounsellor("");

setLocation({

address: "",

lat: null,

lng: null,

});
setTimeout(() => {

  setShowPopup(false);

}, 3000);


    } catch (err) {
      console.log(err);
      alert("Error submitting complaint");
    }
  };

  const getAddressFromCoords = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      );
      const data = await res.json();
      return data.display_name || "Selected Location";
    } catch (err) {
      return "Location Selected";
    }
  };
  return (
    <div className="uc-user-container">
      <div className="uc-user-head">
        <div>
          <div className="uc-user-head-inline">
            <RecycleIcon className="uc-user-recycle" size={45} />
            <h1 className="uc-user-title">Raise Complaint</h1>
          </div>
          <div className="uc-subhead-inline">
            <Leaf className="uc-user-leaf" size={18} />
            <p className="uc-user-subtitle">
              Submit your civic issue and we'll address it promptly
            </p>
          </div>
        </div>
        <div className="uc-user-logout">
          <Link to="/Mycomplaints" className="uc-user-logout-btn">
            <HistoryIcon size={20} color="green" />
            <span>My Complaints</span>
          </Link>
        </div>
      </div>
      <div className="uc-user-main">
        <form onSubmit={handleSubmit}>
          <div className="uc-form-group2">
            <label>Issue type</label>

            <div className="uc-input-box1">
              <select
                className="uc-select"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select issue
                </option>
                <option value="dustbin">Dustbin</option>
                <option value="light">Street Light</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="uc-form-group1">
            <label className="label-uc-div">Description</label>
            <div className="uc-input-box1">
              <input
                className="uc-input-box-inner"
                type="text"
                placeholder="Enter the description of the complaint"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="uc-form-group1">
            <label className="label-uc-div">Location</label>

            <div className="uc-input-box1">
              <input
                type="text"
                value={location.address}
                placeholder="Click to select location"
                readOnly
                onClick={() => setShowMap(true)}
                style={{ cursor: "pointer", color: "#2563eb" }}
              />
            </div>
          </div>
          <div className="uc-form-group1">
            <label className="label-uc-div">Select Counsellor</label>

            <div className="uc-input-box1">
              <select
                className="uc-select"
                value={counsellor}
                onChange={(e) => setCounsellor(e.target.value)}
                required
              >
                <option value="" disabled>
                  Choose counsellor
                </option>
                <option value="Raghav Sharma">
                  Raghav Sharma
                </option>
                <option value="Hardeep Singh">Hardeep Singh </option>
                <option value="Tarun Gupta">Tarun Gupta </option>
                <option value="Ravindar Sharma">
                  Ravindar Sharma 
                </option>
              </select>
            </div>
          </div>
          <button className="login-btn" type="submit">
            Submit complaints
          </button>
        </form>
      </div>
      {showMap && (
        <div className="map-modal">
          <div className="map-box">
            <button
              onClick={() => setShowMap(false)}
              style={{ marginBottom: "10px" }}
            >
              Close ✖
            </button>

            <DustbinMapPicker
              onSelectLocation={(loc) => {
                setLocation(loc);
                setShowMap(false);
              }}
            />
            <button
              onClick={getCurrentLocation}
              style={{
                marginBottom: "10px",
                padding: "8px 12px",
                background: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Use My Current Location
            </button>
          </div>
        </div>
      )}
      <SuccessPopup

  show={showPopup}

  message={popupMessage}

/>
    </div>
  );
}
