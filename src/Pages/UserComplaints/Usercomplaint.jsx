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
export default function UserComplaints() {
  const [issue, setIssue] = useState("");
  const [counsellor, setCounsellor] = useState("");
  const [location, setLocation] = useState({
  address: "",
  lat: null,
  lng: null
});
  const [showMap, setShowMap] = useState(false);
  const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const address = await getAddressFromCoords(lat, lng);

      setLocation({
  address,
  lat,
  lng
});
      setShowMap(false);
    },
    (error) => {
      alert("Permission denied or unable to get location");
      console.log(error);
    },
    {
      enableHighAccuracy: true,
    }
  );
};

  useEffect(() => {
    setIssue("");
    setCounsellor("");
  }, []);
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
        <form action="">
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
                <option value="light">Light</option>
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
                <option value="Raghav">Raghav Sharma(Ishar Nagar)</option>
                <option value="Hardeep">Hardeep Singh(Dugri)</option>
                <option value="Tarun">Tarun Gupta(Model Town)</option>
                <option value="Ravindar">Ravindar Sharma(Shimlapuri)</option>
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
    </div>
  );
}
