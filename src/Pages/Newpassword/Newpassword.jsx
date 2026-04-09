import { Mail, Lock, Leaf, RecycleIcon } from "lucide-react";
import "./Newpassword.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Newpassword() {

  const location = useLocation();
const navigate = useNavigate();
const email = location.state?.email || localStorage.getItem("resetEmail");

const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const handleResetPassword = async () => {

  if (!email) {
    alert("Session expired. Please try again.");
    navigate("/forgot-password");
    return;
  }

  if (!password || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await axios.post(
  "http://localhost:8000/api/auth/reset-password",
  { email, newPassword: password }
);

    if (res.data.success) {
     

      
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
       navigate("/civiAlogin");
      }, 500);
    } else {
      alert(res.data.message || "Error updating password");
    }

  } catch (err) {
    console.log(err);
    alert("Server error");
  }
};
  return (
    <div className="np-container">
      <div className="np-login-card">
        <div className="np-logo-container">
          <div className="np-logo-circle">
            <Lock className="np-recycle" size={45} />
          </div>
        </div>

        <h2 className="np-title">Create New Password</h2>
        <p className="np-subtitle">Enter a strong password for your account</p>
        <p className="displayemail">{email}</p>
        <div className="np-form-group1">
          <label>New Password</label>
          <div className="np-input-box1">
            <Mail className="np-icon" size={25} />
            <input type="password" placeholder="Enter your password" value={password}
             onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className="np-form-group1">
          <label>Confirm New Password</label>
          <div className="np-input-box1">
            <Lock className="np-icon" size={25} />
            <input type="password" placeholder="Enter your password again" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>
        </div>
        <button className="np-login-btn" onClick={handleResetPassword}><Lock className="np-btn-icon" size={15} />Reset Password</button>
        <hr className="np-divider" />
        <div className="np-footer-text">
          <div className="np-footer-leaf1">
            <Leaf className="np-footer-leaf" size={18} />
          </div>
          <div className="np-requirements">
            <h2>Password Requirements</h2>

            <p>• At least 8 characters</p>
            <p>• One uppercase letter (recommended)</p>
            <p>• One number (recommended)</p>
            <p>• One special character (recommended)</p>
          </div>
        </div>
        <div className="last-footer-text"> <RecycleIcon className="last-footer-leaf" size={13}/>EcoWaste • Secure Password Reset</div>
      </div>
    </div>
  );
}
