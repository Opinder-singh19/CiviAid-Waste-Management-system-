import "./Mycomplaints.css";
import {
  Leaf,
  MapPin,
  Trash2Icon,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Mycomplaint() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
  fetch("http://192.168.1.99:8000/api/auth/my-complaints", {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => setComplaints(data))
    .catch((err) => console.log(err));
}, []);

  return (
    <div className="uc-user-container">
      <div className="uc-user-head">
        <div>
          <div className="uc-user-head-inline">
            <MapPin className="uc-user-recycle" size={45} />
            <h1 className="uc-user-title">My Complaints</h1>
          </div>
        </div>
      </div>

      
        {complaints.map((c, index) => (
          <div className="UC-user-main2-inside-box1" key={index}>
            <div className="my-complaint1">
              <Trash2Icon className="my-complaint12" size={20} />
            </div>

            <div className="uc-mycomplants-outer">
              <div className="action-uc">
                <div className="CD-user-main2-uc">
                  {c.issueType
                     ? c.issueType.charAt(0).toUpperCase() + c.issueType.slice(1)
                          : "Dustbin"}
                </div>
                <div className="action-p-r">
                  {c.status || "Pending"}
                </div>
              </div>

              <p className="CD-user-main2-uc1">
                {c.description}
              </p>

              <p className="CD-user-main2-uc2">
                <Clock size={15} />
                {c.createdAt
                  ? new Date(c.createdAt).toLocaleString()
                  : "No date"}
              </p>
            </div>
          </div>
        ))}
      </div>
    
  );
}