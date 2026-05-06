import "./Userprofile.css";
import handleLogout from "./Logout";

import {
  Leaf,
  LogOut,
  User,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Trash2,
  Medal,
  Pencil,
  Calendar,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const [userData, setUserData] = useState({});
  useEffect(() => {

  const fetchProfile = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/profile",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log(data);

      setUserData(data);

    } catch (error) {

      console.log(error);
    }
  };

  fetchProfile();

}, []);
  return (
    <div className="pf-main-wrapper">
      {/* TOP HEADER */}
      <div className="pf-navbar">
        <div className="pf-navbar-left">
          <Link to="/" className="pf-back-btn">
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>

          <div className="pf-heading-section">
            <div className="pf-title-row">
              <User size={38} className="pf-main-icon" />
              <h1>My Profile</h1>
            </div>

            <div className="pf-subtitle-row">
              <Leaf size={16} />
              <p>View and manage your personal information</p>
            </div>
          </div>
        </div>

        <button className="pf-logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* PROFILE CONTENT */}
      <div className="pf-grid-layout">
        {/* LEFT CARD */}
        <div className="pf-left-card">
          <div className="pf-profile-top">
            <div className="pf-avatar">
  {userData?.fullName?.charAt(0)}
</div>

            <h2>{userData.fullName}</h2>

            <div className="pf-joined-row">
              <Calendar size={16} />
              <span>Joined {userData.joined}</span>
            </div>
          </div>

          {/* STATS */}
          <div className="pf-stats-wrapper">
            <div className="pf-stat-card green-card">
              <div>
                <p>Waste Segregations</p>
                <h3>{userData.wasteSegregations} Times</h3>
              </div>

              <div className="pf-stat-icon green-icon">
                <Trash2 size={28} />
              </div>
            </div>

            <div className="pf-stat-card gold-card">
              <div>
                <p>Coins Earned</p>
                <h3>{userData.coins}</h3>
              </div>

              <div className="pf-stat-icon gold-icon">
                <Medal size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="pf-right-card">
          <div className="pf-info-card">
            <div className="pf-info-header">
              <h2>Personal Information</h2>

              <button className="pf-edit-btn">
                <Pencil size={16} />
                Edit Profile
              </button>
            </div>

            <div className="pf-info-grid">
              <div className="pf-info-item">
                <label>
                  <User size={18} />
                  Full Name
                </label>

                <div className="pf-info-box">
  {userData.fullName}
</div>
              </div>

              <div className="pf-info-item">
                <label>
                  <Mail size={18} />
                  Email Address
                </label>

                <div className="pf-info-box">{userData.email}</div>
              </div>

              <div className="pf-info-item">
                <label>
                  <Phone size={18} />
                  Phone Number
                </label>

                <div className="pf-info-box">{userData.phone}</div>
              </div>

              <div className="pf-info-item">
                <label>
                  <MapPin size={18} />
                  Location
                </label>

                <div className="pf-info-box">{userData.location}</div>
              </div>
            </div>
          </div>
          {/* WEEKLY GOAL SECTION */}
          <div className="pf-goal-card">
            <div className="pf-section-title">
              <h2>🎯 Weekly Goal Progress</h2>
            </div>

            <div className="pf-goal-header">
              <span>Current Week: 14 segregations</span>
              <span>Goal: 20 segregations</span>
            </div>

            <div className="pf-progress-bar">
              <div className="pf-progress-fill"></div>
            </div>

            <p className="pf-goal-text">
              6 more segregations to reach your goal
            </p>

            <div className="pf-goal-stats">
              <div className="pf-mini-card blue-mini">
                <div>
                  <p>Monthly Average</p>
                  <h3>18 times</h3>
                </div>

                <span>📈</span>
              </div>

              <div className="pf-mini-card green-mini">
                <div>
                  <p>This Week</p>
                  <h3>14 times</h3>
                </div>

                <span>🗑️</span>
              </div>
            </div>
          </div>

          {/* RECENT SEGREGATIONS */}
          <div className="pf-history-card">
            <div className="pf-section-title">
              <h2>📊 Recent Segregations</h2>
            </div>

            <div className="pf-history-list">
              <div className="pf-history-item active-item">
                <div className="pf-history-left">
                  <div className="pf-history-icon">🗑️</div>

                  <div>
                    <h3>3 segregations</h3>
                    <p>Wet Waste</p>
                  </div>
                </div>

                <div className="pf-history-right">
                  <h4>Mar 8</h4>
                  <span>🪙 +15 coins</span>
                </div>
              </div>

              <div className="pf-history-item">
                <div className="pf-history-left">
                  <div className="pf-history-icon">🗑️</div>

                  <div>
                    <h3>2 segregations</h3>
                    <p>Dry Waste</p>
                  </div>
                </div>

                <div className="pf-history-right">
                  <h4>Mar 7</h4>
                  <span>🪙 +10 coins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
