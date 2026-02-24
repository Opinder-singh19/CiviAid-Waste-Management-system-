import { Mail, Lock, Leaf,RecycleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import "./CivicA.css";

export default function CivicALogin() {
  return (
    <div className="container">
      <div className="login-card">

        <div className="logo-container">
          <div className="logo-circle">
            <RecycleIcon className="recycle" size={45} />
        </div> 
        </div>

        <h2 className="title">CivicAid</h2>
        <p className="subtitle">Sustainable Waste Management</p>

        <div className="dots">
          <span className="dotgreen"></span>
          <span className="dotblue"></span>
          <span className="dotblack"></span>
        </div>

        <div className="input-box">
          <Mail className="icon" size={25} />
          <input type="email" placeholder="Enter your email" />
        </div>

        <div className="input-box">
          <Lock className="icon" size={25} />
          <input type="password" placeholder="Enter your password" />
        </div>

        <button className="login-btn">
          Login to CivicAid
        </button>
         
        <button className="signup-btn">
          Sign Up
         </button>  

         <Link to="/admin" className="admin">
          Admin Login
       </Link>

      

        <p className="footer-text">
          Go Green • Segregate Right • Save Earth
        </p>

      </div>
    </div>
  );
}