import { ArrowLeft, RecycleIcon, Leaf, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import "./Dustbinlocation.css";
import DustbinMap from "../../Components/Map/DustbinMap";
import { useState } from "react";

function WasteG() {
  const [selected, setSelected] = useState("");
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
Locate eco-friendly waste disposal points near you</p>
          </div>
        </div>
      </div>
      <div className="Waste-main">
        <div className="Location-map-section">
                  <DustbinMap className="dustbin-main" />
                </div>

      </div>
    </div>
  );
}
export default WasteG;
