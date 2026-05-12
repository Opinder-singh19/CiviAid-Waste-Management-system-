import { ArrowLeft ,RecycleIcon,User,Phone,Mail,MapPin,Lock} from "lucide-react";
import './forgotpassword.css'
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react"; // to store values
import axios from "axios"; // to call backend

function Forgotpassword(){
 const [email, setEmail] = useState(""); 
const [otp, setOtp] = useState(""); 
const [showOtp, setShowOtp] = useState(false); 
const [isOtpVerified, setIsOtpVerified] = useState(false); 
const [message, setMessage] = useState(""); // ✅ ADD THIS
const navigate = useNavigate(); 


const handleSendOtp = async (e) => {
  e.preventDefault(); 

  try {
    await axios.post("http://localhost:8000/api/auth/forgot-password", { email });

    setShowOtp(true);

    setMessage("OTP sent to your email 📩");

    setTimeout(() => {
      setMessage("");
    }, 10000);

  } catch (err) {
    setMessage("Not Registered Email");

    setTimeout(() => {
      setMessage("");
    }, 5000);
  }
};


const handleVerifyOtp = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:8000/api/auth/verify-otp",
      { email, otp }
    );

    if (res.data.success) {
      

      setIsOtpVerified(true); 
      localStorage.setItem("resetEmail", email);

      navigate("/reset-password", { state: { email } });

    } else {
      setMessage(res.data.message || "Invalid OTP");

      setTimeout(() => {
        setMessage("");
      }, 5000);
    }

  } catch (err) {
    setMessage("Error verifying OTP");

    setTimeout(() => {
      setMessage("");
    }, 5000);
  }
};

return(
  <div className="sign-BackC">
  <div className="Sign-container">
    <div className="Sign-icon1">
    <Link to="/civiAlogin" className="Back-to-user">
      <ArrowLeft  className="sign-icon" size={20}/>
      <span className="back-text">Back </span>
      </Link>
    </div>
    <div className="logo-container">
          <div className="logo-circle">
            <RecycleIcon className="recycle" size={45} />
          </div>
        </div>

  
      <h2 className="signup-title">Forgot Password ?</h2>
      <p className="signup-subtitle">Create your account and start making a difference</p>


      <form className="signup-form">
  <div className="label-input1">

    <div className="form-group">
      <label>Email Address</label>
      <div className="input-box">
        <Mail className="icon" size={18}/>
        <input 
          type="email" 
          value={email} 
          placeholder="your.email@example.com"   
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
    </div>

    {showOtp && (
      <div className="form-group">
        <label>Enter OTP</label>
        <div className="input-box">
          <input 
            type="text" 
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.trim())}
          />
        </div>
      </div>
    )}

    <div className="checkbox-terms">
      <p>Enter the email associated with your account</p>
    </div>

  </div>

  {!showOtp ? (
    <button className="signup-btn" onClick={handleSendOtp}>
      Send OTP
    </button>
  ) : (
    <button type="button" className="signup-btn" onClick={handleVerifyOtp}>
      Verify OTP
    </button>
  )}

</form>
{message && (
  <div style={{
    position: "fixed",
    top: "20px",
    right: "600px",
    background: "#333",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    zIndex: 1000
  }}>
    {message}
  </div>
)}

  </div>
</div>
)
}
export default Forgotpassword;