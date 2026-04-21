import "./CounsellorDashboard.css";
import DustbinMap from "../../Components/Map/DustbinMap";
import { useState,useEffect } from "react";
import {
  Leaf,
  RecycleIcon,
  Recycle,
  Trash2Icon,
  BookOpen,
  MapPin,
  Phone,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
const getColorFromName = (name) => {
  const colors = ["#00a01d"];

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
        objectFit: "cover",
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
        fontSize: "50px",
      }}
    >
      R
    </div>
  );
};
export default function CounsellorDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All Types");

  const options = ["All Types", "Dustbin", "Road", "Street Light"];
  const [openStatus, setOpenStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const statusOptions = ["All Status", "Pending", "Resolved"];
 const [complaints, setComplaints] = useState([
  {
    _id: 1,
    name: "Amit Sharma",
    issueType: "Dustbin",
    description: "overflowing dustbin",
    status: "Pending"
  }
]);
const handleStart = (id) => {
  setComplaints(prev =>
    prev.map(c =>
      c._id === id ? { ...c, status: "In Progress" } : c
    )
  );
};

const handleReject = (id) => {
  setComplaints(prev =>
    prev.map(c =>
      c._id === id ? { ...c, status: "Rejected" } : c
    )
  );
};
const handleWorkDone = (id) => {
  setComplaints(prev =>
    prev.map(c =>
      c._id === id ? { ...c, status: "Resolved" } : c
    )
  );
};
const filteredComplaints = complaints.filter((c) => {
  const typeMatch =
    selected === "All Types" ||
    c.issueType === selected;

  const statusMatch =
    selectedStatus === "All Status" ||
    c.status === selectedStatus;

  return typeMatch && statusMatch;
});

const handleAdminLogout = async () => {
  try {
    await fetch("http://192.168.1.99:8000/api/admin/logout", {
      method: "POST",
      credentials: "include"
    });

  
    localStorage.removeItem("admin");

  
    window.location.href = "/";
  } catch (err) {
    console.log("Logout error:", err);
  }
};
  return (
    <div className="CD-user-container">
      <div className="CD-user-head">
        <div className="CD-user-head-inline">
          <Avatar name={user?.fullName} profilePic={user?.profilePic} />
        </div>
        <button className="logout-btn" onClick={handleAdminLogout}>
    Logout
  </button>

        <div className="CD-user-subhead-inline">
          <h1 className="CD-user-title">Raghav Sharma</h1>
          <div className="CD-call">
            <MapPin className="CD-user-leaf" size={15} />
            <p className="CD-user-subtitle">
              Municipal Counselor - Central Zone
            </p>
          </div>
          <div className="CD-call">
            <Phone className="CD-user-leaf" size={14} />
            <p className="CD-user-subtitle">+91 98765 43210</p>
          </div>
        </div>
      </div>
      <div className="CD-user-main">
        <div className="CD-user-main2">
          <div className="CD-user-word1">
            <div className="complaint-numbering">
              <p>Total Complaints</p>
              <p>4</p>
            </div>
            <div className="CD-user-main2-div0">
              <MessageSquare className="CD-user-main2-div1" size={30} />
            </div>
          </div>
          <div className="CD-user-word2">
            <div className="complaint-numbering">
              <p>Pending</p>
              <p>4</p>
            </div>
            <div className="CD-user-main2-div001">
              <Recycle className="CD-user-main2-div1" size={30} />
            </div>
          </div>
          <div className="CD-user-word3">
            <div className="complaint-numbering">
              <p>Resolved</p>
              <p>4</p>
            </div>
            <div className="CD-user-main2-div002">
              <Leaf className="CD-user-main2-div1" size={30} />
            </div>
          </div>
        </div>
        <div className="CD-user-word3">
          <div className="filter-container">
            <label>Filter by Issue Type</label>

            <div className="dropdown">
              <div className="dropdown-header" onClick={() => setOpen(!open)}>
                {selected}
                <span className="arrow">
                  <ChevronDown />
                </span>
              </div>

              {open && (
                <div className="dropdown-list">
                  {options.map((item, index) => (
                    <div
                      key={index}
                      className={`dropdown-item ${
                        selected === item ? "active" : ""
                      }`}
                      onClick={() => {
                        setSelected(item);
                        setOpen(false);
                      }}
                    >
                      {item}
                      {selected === item && (
                        <span className="tick">selected</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="filter-container">
            <label>Filter by Status</label>

            <div className="dropdown">
              <div
                className="dropdown-header"
                onClick={() => setOpenStatus(!openStatus)}
              >
                {selectedStatus}
                <span className="arrow">
                  <ChevronDown />
                </span>
              </div>

              {openStatus && (
                <div className="dropdown-list">
                  {statusOptions.map((item, index) => (
                    <div
                      key={index}
                      className={`dropdown-item ${
                        selectedStatus === item ? "active" : ""
                      }`}
                      onClick={() => {
                        setSelectedStatus(item);
                        setOpenStatus(false);
                      }}
                    >
                      {item}
                      {selectedStatus === item && (
                        <span className="tick">selected</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <table className="complaint-table">
  <thead>
    <tr>
      <th>User Name</th>
      <th>Issue Type</th>
      <th>Description</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    {filteredComplaints.map((c, index) => (
      <tr key={c._id}>
        <td>{c.name}</td>

        <td className="issue-type">
          {c.issueType}
        </td>

        <td className="desc">{c.description}</td>

        <td>
          <span className={`status ${c.status?.toLowerCase().replace(" ", "-")}`}>
            {c.status}
          </span>
        </td>

        <td className="actions">
          {c.status === "Pending" && (
            <>
              <button className="btn start" onClick={() => handleStart(c._id)}>
  Start
</button>

<button className="btn reject" onClick={() => handleReject(c._id)}>
  Reject
</button>
            </>
          )}

         {c.status === "In Progress" && (
  <button
  className="btn done"
  onClick={() => handleWorkDone(c._id)}
>
  Work Done
</button>
)}

          {c.status === "Resolved" && <span>—</span>}
        </td>
      </tr>
    ))}
  </tbody>
</table>
      </div>
    </div>
  );
}
