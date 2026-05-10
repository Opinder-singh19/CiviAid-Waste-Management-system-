import "./Mycomplaints.css";
import {
  Leaf,
  MapPin,
  Trash2Icon,
  Clock,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader,
 ArrowLeft
} from "lucide-react";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

export default function Mycomplaint() {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = () => {
    fetch("http://localhost:8000/api/auth/my-complaints", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setComplaints(sorted);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    fetchComplaints();

    const onFocus = () => fetchComplaints();
    window.addEventListener("focus", onFocus);

    return () => window.removeEventListener("focus", onFocus);
  }, []);

  useEffect(() => {
    fetchComplaints();

    const interval = setInterval(fetchComplaints, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="uc-user-container">
      <div className="mc-user-head">
          <Link to="/" className="complaint-back-btn">
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>
        <div>
          <div className="mc-user-head-inline">
            <MapPin className="uc-user-recycle" size={45} />
            <h1 className="uc-user-title">My Complaints</h1>
          </div>
        </div>
      </div>

      {complaints.map((c, index) => (
        <div className="UC-user-main2-inside-box1" key={c._id}>
          <div className="my-complaint1">
            {c.issueType === "dustbin" && (
              <Trash2Icon className="my-complaint12" size={20} />
            )}

            {c.issueType === "light" && (
              <Lightbulb className="my-complaint12" size={20} />
            )}

            {c.issueType === "other" && (
              <AlertCircle className="my-complaint12" size={20} />
            )}
          </div>

          <div className="uc-mycomplants-outer">
            <div className="action-uc">
              <div className="CD-user-main2-uc">
                {c.issueType
                  ? c.issueType.charAt(0).toUpperCase() + c.issueType.slice(1)
                  : "Dustbin"}
              </div>
              <div className={`action-p-r status-${c.status || "pending"}`}>
                {c.status === "Resolved" && <CheckCircle size={16} />}
                {c.status === "Rejected" && <XCircle size={16} />}
                {c.status === "In Progress" && <Loader size={16} />}
                {(!c.status || c.status === "Pending") && <Clock size={16} />}

                <span>{c.status || "Pending"}</span>
              </div>
            </div>

            <p className="CD-user-main2-uc1">{c.description}</p>

            <p className="CD-user-main2-uc2">
              <Clock size={15} />
              {c.createdAt ? new Date(c.createdAt).toLocaleString() : "No date"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
