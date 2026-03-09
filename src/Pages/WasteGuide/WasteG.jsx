import { ArrowLeft, RecycleIcon, Leaf, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import "./WasteG.css";
import WasteDrop from "../../Components/Waste/WasteDrop";
import WasteC from "../../Components/Waste/WasteCard";
import { useState } from "react";

function WasteG() {
  const [selected, setSelected] = useState("");
  return (
    <div className="w-container">

      <div className="Waste-head">
          <div className="Waste-head-inline">
      <Link to="/">
        <div className="back-Dash3">
          <div className="Arrow-icon">
            <ArrowLeft size={20} />
          </div>
          <div className="back">
            <p>Back to Dashboard</p>
          </div>
        </div>
      </Link>
        <div className="top-title2">
            <RecycleIcon className="Waste-recycle" size={45} />
            <h1 className="Waste-title">Waste Segregation Guidance</h1>
          </div>
          <div className="Waste-subhead-inline">
            <Leaf className="Waste-leaf" size={18} />
            <p className="Waste-subtitle">
Learn to segregate waste correctly for a sustainable future            </p>
          </div>
        </div>
      </div>
      <div className="Waste-main">
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

        <div className="w-container1">
          <input type="text" />
        </div>
        <div className="w-container1">
          <WasteDrop selected={selected} setSelected={setSelected} />

          <WasteC type={selected} />
        </div>
      </div>
    </div>
  );
}
export default WasteG;
