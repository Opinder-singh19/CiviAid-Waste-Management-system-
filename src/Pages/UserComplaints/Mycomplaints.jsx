import "./Mycomplaints.css";
import {
  Leaf,
  RecycleIcon,
  LogOut,
  Mail,
  Lock,
  Link,
  HistoryIcon,
  MapPin,
  Trash2Icon,
  ClockAlert,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";
import DustbinMapPicker from "../../Components/Map/DustbinMapPicker";
export default function Mycomplaint() {
  return (
    <div className="uc-user-container">
      <div className="uc-user-head">
        <div>
          <div className="uc-user-head-inline">
            <MapPin className="uc-user-recycle" size={45} />
            <h1 className="uc-user-title">Find Nearby Dustbins</h1>
          </div>
          <div className="uc-subhead-inline">
            <Leaf className="uc-user-leaf" size={18} />
            <p className="uc-user-subtitle">
              Locate eco-friendly waste disposal points near you
            </p>
          </div>
        </div>
      </div>
      <div className="uc-user-main">
        <div className="UC-user-main2-inside-box1">
          <div className="my-complaint1">
            <Trash2Icon className="my-complaint12" size={20} />
          </div>
          <div className="uc-mycomplants-outer">
            <div className="action-uc">
              <div className="CD-user-main2-uc">Dustbin</div>
              <div className="action-p-r">Pending</div>
            </div>

            <p className="CD-user-main2-uc1">
              Overflowing dustbin at Central Park needs immediate attention
            </p>
            <p className="CD-user-main2-uc2">
              {" "}
              <Clock size={15} />
              Apr 15, 2026
            </p>
          </div>
          {/* // Testing */}
        </div>
      </div>
    </div>
  );
}
