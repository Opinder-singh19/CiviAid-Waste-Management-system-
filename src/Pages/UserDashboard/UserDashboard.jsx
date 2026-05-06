import "./UserDashboard.css";
import DustbinMap from "../../Components/Map/DustbinMap";
import {
  Leaf,
  RecycleIcon,
  LogOut,
  Trash2Icon,
  BookOpen,
  MapPin,
} from "lucide-react";

export default function Userdashboard() {
  return (
    <div className="user-container">
      <div className="user-head">
        <div>
          <div className="user-head-inline">
            <RecycleIcon className="user-recycle" size={45} />
            <h1 className="user-title">Welcome to CiviAid!</h1>
          </div>
          <div className="user-subhead-inline">
            <Leaf className="user-leaf" size={18} />
            <p className="user-subtitle">Together we can make our planet cleaner
            </p>
          </div>
        </div>
      </div>

      <div className="user-main">
       
        <div className="user-main1">
          <div className="user-main1-whole">
            <div className="user-main1-inner">
              <div className="user-dustbin-icon">
                <div className="dustbin-1">
                  <Trash2Icon className="trash1" size={30} />
                </div>
                <div className="dustbin-2">
                  <Trash2Icon className="trash2" size={30} />
                </div>
                <div className="dustbin-3">
                  <Trash2Icon className="trash3" size={30} />
                </div>
              </div>
              <div className="user-text">
                <h2 className="user-text1">Waste Segregation Matters!</h2>
                <p className="user-text2">
                  Green • Blue • Black - Know your bins
                </p>
              </div>
            </div>
            <RecycleIcon className="user-recycle1" size={70} />
          </div>
        </div>
        <div className="user-main2">
          <div className="user-main2-box1">
            <div className="user-main2-div0">
              <BookOpen className="user-main2-div1" size={50} />
            </div>
            <h2 className="user-main2-div2">Waste Guidance</h2>
            <p className="user-main2-div3">
              Learn proper waste segregation techniques
            </p>
            <div className="user-main2-div4">
              <span className="user-word1">Wet</span>
              <span className="user-word2">Dry</span>
              <span className="user-word3">Mixed</span>
            </div>
          </div>
          <div className="user-main2-box2">
            <div className="user-main2-div01">
              <MapPin className="user-main2-div1" size={50} />
            </div>
            <h2 className="user-main2-div02">Find Nearby Dustbins</h2>
            <p className="user-main2-div3">
              Locate the nearest eco-friendly disposal points
            </p>
            <div className="user-main2-div4">
              <span className="user-word01">
                <MapPin size={12} />
                Nearby Locations
              </span>
            </div>
          </div>
        </div>
        <div className="user-main3">
          <div className="user-main3-grid1">
            <Leaf className="main3-image1" size={22}/>
            <div className="grid-subdiv">
            <h1 className="grid-text">Reduce Waste</h1>
            <p className="grid-subtext">Use less , Save more</p>
            </div>
          </div>
          <div className="user-main3-grid2">
            <RecycleIcon className="main3-image2" size={22}/>
            <div className="grid-subdiv">
            <h1 className="grid-text">Recycle Waste</h1>
            <p className="grid-subtext">Segregate properly</p>
            </div>
          </div>
          <div className="user-main3-grid3">
            <Trash2Icon className="main3-image3" size={22}/>
            <div className="grid-subdiv">
            <h1 className="grid-text">Dispose Smart</h1>
            <p className="grid-subtext">Use correct bins</p>
            </div>
          </div>
        </div>
      
        <div className="user-map-section">
          <DustbinMap className="dustbin-main" />
        </div>
      </div>
    </div>
  );
}
