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
        <div className="different-dustbin">
          <div className="diff-head">Color-Coded Waste Segregation System </div>
          <div className="w-differnt">
            <div className="Green-bin">
              <div className="green-box"></div>

              <div className="about-green">
                <span className="wordG1">Green Bin</span>
                <span className="wordG2"> Wet/Organic Waste</span>
              </div>
            </div>

            <div className="blue-bin">
              <div className="blue-box"></div>
              <div className="about-blue">
                <span className="wordG1">Blue Bin</span>
                <span className="wordG2"> Dry/Recyclable Waste</span>
              </div>
            </div>

            <div className="black-bin">
              <div className="black-box"></div>
              <div className="about-black">
                <span className="wordG1">Black Bin</span>
                <span className="wordG2">Mixed/Reject Waste</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
export default WasteG;
