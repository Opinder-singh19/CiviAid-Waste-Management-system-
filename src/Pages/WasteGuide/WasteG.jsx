import { ArrowLeft, RecycleIcon, Leaf, Sparkles,Search } from "lucide-react";
import { Link } from "react-router-dom";
import "./WasteG.css";
import WasteDrop from "../../Components/Waste/WasteDrop";
import WasteC from "../../Components/Waste/WasteCard";
import wasteData from "../../data/wasteData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WasteG() {
  const navigate = useNavigate();
  
  const handleFindNearby = () => {
    if (!selected) {
      alert("Please select waste type");
      return;
    }
  
    navigate("/dustbinlocation", {
      state: { binType: selected }
    });
  };
const [selected, setSelected] = useState("");
const [query, setQuery] = useState("");
const [suggestions, setSuggestions] = useState([]);

const handleSearch = (value) => {
  setQuery(value);

  if (!value) {
    setSuggestions([]);
    return;
  }

  const results = wasteData.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );

  setSuggestions(results);
};
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
              Learn to segregate waste correctly for a sustainable future{" "}
            </p>
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
        <div className="input-type1">
          <div className="inner-input">
            <div className="introtype1">
              <div className="waste-type-intro">
                <Sparkles size={19} className="icontype"/>
                <div className="waste-type-intro">
                <p>Smart waste identifier</p>
                </div>
              </div>
              <div>
        <p className="place-holdicon1">Select a waste type above to view detailed guidance</p>
      </div>
            </div>
            <div className="drop-down1">
  <Search size={19} className="search-icon"/>

  <input
    type="text"
    placeholder="e.g., banana peel, plastic wrapper..."
    className="drop-down-inner1"
    value={query}
    onChange={(e)=>handleSearch(e.target.value)}
  />

  {suggestions.length > 0 && (
    <div className="suggestion-box">
      {suggestions.map((item,index)=>(
        <div
          key={index}
          className="suggestion-item"
          onClick={()=>{
            setSelected(item.bin)
            setQuery(item.name)
            setSuggestions([])
          }}
        >
          <span>{item.name}</span>

          <span className={`bin-label ${item.bin}`}>
            {item.bin === "green" && "Green Bin"}
            {item.bin === "blue" && "Blue Bin"}
            {item.bin === "black" && "Black Bin"}
          </span>
        </div>
      ))}
    </div>
  )}
</div>
          </div>
        </div>
        <div className="or-divider">
  <span>OR</span>
</div>
        <div className="w-container1">
          <WasteDrop selected={selected} setSelected={setSelected} />

          <WasteC type={selected} />
        </div>
        <div className="dustbin-btn-div">
        <button className="find-dustbin-btn" onClick={handleFindNearby}>
  Find Nearby Dustbins
</button>
</div>
      </div>

    </div>
  );
}
export default WasteG;