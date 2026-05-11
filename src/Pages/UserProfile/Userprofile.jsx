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

import civiaidcoin from "../../assets/Dustbins/Civiaidcoin.png";

export default function UserProfile() {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSave = async () => {
    try {
      const response = await fetch(
        "http://civiaid-waste-management-system.onrender.com/api/auth/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            fullName: userData.fullName,
            phone: userData.phone,
            location: userData.location,
          }),
        },
      );

      const data = await response.json();

      console.log(data);

      if (data.success) {
        setIsEditing(false);
        alert("Profile updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {

  const fetchProfile = () => {

    fetch(
      "http://civiaid-waste-management-system.onrender.com/api/auth/profile",
      {
        credentials: "include"
      }
    )

    .then(res => res.json())

    .then(data => {

      setUserData(data);

    })

    .catch(err => {

      console.log(err);

    });

  };

  fetchProfile();

  const interval =
    setInterval(
      fetchProfile,
      3000
    );

  return () =>
    clearInterval(interval);

}, []);
  return (
    <div className="pf-main-wrapper">
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
        <div className="profile-icon-logout">
        <div className="coin-box">
                  <div className="coin-icon">
                    <img src={civiaidcoin} alt="coin" />
                  </div>
        
                  <span className="coin-text">
  {userData.coins}
</span>
                </div>
        <button className="pf-logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
        </div>
      </div>


      <div className="pf-grid-layout">
        <div className="pf-left-card">
          <div className="pf-profile-top">
            <div className="pf-avatar">{userData?.fullName?.charAt(0)}</div>

            <h2>{userData.fullName}</h2>

            <div className="pf-joined-row">
              <Calendar size={16} />
              <span>
                Joined{" "}
                {userData.joined
                  ? new Date(userData.joined).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : ""}
              </span>
            </div>
          </div>

          <div className="pf-stats-wrapper">
            <div className="pf-stat-card green-card">
              <div>
                <p>Waste Segregations</p>
                <h3>Times</h3>
              </div>

              <div className="pf-stat-icon green-icon">
                <Trash2 size={28} />
              </div>
            </div>

            <div className="pf-stat-card gold-card">
              <div>
                <p>Coins Earned</p>
                <h3></h3>
              </div>

              <div className="pf-stat-icon gold-icon">
                <Medal size={28} />
              </div>
            </div>
          </div>
        </div>

        <div className="pf-right-card">
          <div className="pf-info-card">
            <div className="pf-info-header">
              <h2>Personal Information</h2>

              <button
                className="pf-edit-btn"
                onClick={() => {
                  if (isEditing) {
                    handleSave();
                  } else {
                    setIsEditing(true);
                  }
                }}
              >
                <Pencil size={16} />
                {isEditing ? "Save Profile" : "Edit Profile"}
              </button>
            </div>

            <div className="pf-info-grid">
              <div className="pf-info-item">
                <label>
                  <User size={18} />
                  Full Name
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={userData.fullName || ""}
                    onChange={handleChange}
                    className="pf-info-box"
                  />
                ) : (
                  <div className="pf-info-box">{userData.fullName}</div>
                )}
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

                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={userData.phone || ""}
                    onChange={handleChange}
                    className="pf-info-box"
                  />
                ) : (
                  <div className="pf-info-box">{userData.phone}</div>
                )}
              </div>

              <div className="pf-info-item">
                <label>
                  <MapPin size={18} />
                  Location
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={userData.location || ""}
                    onChange={handleChange}
                    className="pf-info-box"
                  />
                ) : (
                  <div className="pf-info-box">{userData.location}</div>
                )}
              </div>
            </div>
          </div>
          <div className="pf-goal-card">
            <div className="pf-section-title">
              <h2> Weekly Goal Progress</h2>
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

                <span></span>
              </div>

              <div className="pf-mini-card green-mini">
                <div>
                  <p>This Week</p>
                  <h3>14 times</h3>
                </div>

                <span></span>
              </div>
            </div>
          </div>

          <div className="pf-history-card">
            <div className="pf-section-title">
              <h2> Recent Segregations</h2>
            </div>

            <div className="pf-history-list">
              <div className="pf-history-item active-item">
                <div className="pf-history-left">
                  <div className="pf-history-icon"><Trash2/></div>

                  <div>
                    <h3>3 segregations</h3>
                    <p>Wet Waste</p>
                  </div>
                </div>

                <div className="pf-history-right">
                  <h4>Mar 8</h4>
                  <span> +15 coins</span>
                </div>
              </div>

              <div className="pf-history-item">
                <div className="pf-history-left">
                  <div className="pf-history-icon"><Trash2/></div>

                  <div>
                    <h3>2 segregations</h3>
                    <p>Dry Waste</p>
                  </div>
                </div>

                <div className="pf-history-right">
                  <h4>Mar 7</h4>
                  <span> +10 coins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}