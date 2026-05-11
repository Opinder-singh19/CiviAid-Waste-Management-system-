import { Mail, Lock, Leaf, RecycleIcon } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";
import "./CivicA.css";
import {useState } from "react"
import handleLogin from "./LoginHandle";
import Toast
from "../../Components/Popup/Toast";
export default function CivicALogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast,
setShowToast]
= useState(false);

const [toastMessage,
setToastMessage]
= useState("");

const [toastType,
setToastType]
= useState("success");
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
        <div className="form-group1">
          <label>Email</label>
        <div className="input-box1">
          <Mail className="icon" size={25} />
          <input type="email" placeholder="Enter your email"
           onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        </div>
        <div className="form-group1">
          <label>Password</label>
        <div className="input-box1">
          <Lock className="icon" size={25} />
          <input type="password" placeholder="Enter your password" 
          onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        </div>
        <Link to="/forgotpassword" className="admin1">
          Forget Password?
        </Link>
        <button className="login-btn"  onClick={() => handleLogin(

  email,
  password,

  setToastType,
  setToastMessage,
  setShowToast,
  navigate

)}>Login to CivicAid</button>

        <Link to="/admin" className="admin">
          Admin Login
        </Link>
        <div className="signup-box">
          <p className="signup-text">Are you a new User ?</p>
          <Link to="/signUp" className="signup-btn1">
            Sign Up
          </Link>
        </div>

        <p className="footer-text"> <Leaf className="footer-leaf" size={13}/>Go Green • Segregate Right • Save Earth</p>
      </div>
      <RecycleIcon size={150}  className="bg-recycle"/>
      <RecycleIcon size={70}  className="bg-recycle1"/>
      <Leaf size={100}  className="bg-leaf1"/>
      <Toast

  show={showToast}

  message={toastMessage}

  type={toastType}

/>
    </div>
  );
}
