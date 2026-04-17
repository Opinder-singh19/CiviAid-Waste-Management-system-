import "./CounsellorDashboard.css";
import DustbinMap from "../../Components/Map/DustbinMap";
import {Leaf,RecycleIcon,Trash2Icon,BookOpen,MapPin,Phone,} from "lucide-react";
const getColorFromName = (name) => {
  const colors = [
  "#00a01d"
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};
const Avatar = ({ name, profilePic }) => {
  const firstLetter = name?.charAt(0).toUpperCase();
  const bgColor = getColorFromName(name || "User");

  return profilePic ? (
    <img
      src={profilePic}
      alt="Profile"
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        objectFit: "cover"
      }}
    />
  ) : (
    <div
      style={{
        width: "70px",
        height: "70px",
        borderRadius: "50%",
        backgroundColor: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 500,
        fontSize: "50px"
      }}
    >
      R
    </div>
  );
};
export default function Userdashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
  return (
    
    
    <div className="CD-user-container">
      <div className="CD-user-head">
          <div className="CD-user-head-inline">
           <Avatar
  name={user?.fullName}
  profilePic={user?.profilePic}
/>
          </div>
          <div className="CD-user-subhead-inline">
            <h1 className="CD-user-title">Raghav Sharma</h1>
            <div className="CD-call"><MapPin className="CD-user-leaf" size={15} />
            <p className="CD-user-subtitle">
              Municipal Counselor - Central Zone
            </p>
            </div>
            <div className="CD-call"><Phone className="CD-user-leaf" size={14} />
            <p className="CD-user-subtitle">
             +91 98765 43210
            </p>
            </div>
          </div>
      </div>
      <div className="CD-user-main">
        <div className="CD-user-main2">
          <div className="CD-user-main2-box1">
            <div className="CD-user-main2-inside-box1">
            <div className="CD-user-main2-div0">
              <MapPin className="CD-user-main2-div1" size={30} />
            </div>
            <h2 className="CD-user-main2-div2">Your Coverage Area</h2>
            </div>
            <div className="CD-user-main2-div4">
              <span className="CD-user-word1">Central Park</span>
              <span className="CD-user-word1">Main Street</span>
              <span className="CD-user-word1">School Area</span>
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
