import { ArrowLeft ,RecycleIcon,User,Phone,Mail,MapPin,Lock} from "lucide-react";
import './signup.css'
import { Link } from "react-router-dom";
import handleSignup from "./Signuphandle"
function SignUp(){
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

  
      <h2 className="signup-title">Join CivicAid</h2>
      <p className="signup-subtitle">Create your account and start making a difference</p>


      <form className="signup-form" onSubmit={handleSignup}>
<div className="label-input1">
      <div className="signup-row">
        <div className="form-group">
          <label>Full Name</label>
          <div className="input-box">
            <User className="icon" size={18}/>
            <input type="text" placeholder="Enter your full name" required/>
          </div>
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <div className="input-box">
            <Phone className="icon" size={18}/>
            <input type="tel" placeholder="+91 12345 67890"  required/>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Email Address</label>
        <div className="input-box">
          <Mail className="icon" size={18}/>
          <input type="email" placeholder="your.email@example.com"  required/>
        </div>
      </div>

      <div className="form-group">
        <label>Location</label>
        <div className="input-box">
          <MapPin className="icon" size={18}/>
          <input type="text" placeholder="City, State" required />
        </div>
      </div>

      <div className="signup-row">
        <div className="form-group">
          <label>Password</label>
          <div className="input-box">
            <Lock className="icon" size={18}/>
            <input type="password" placeholder="Create a strong password"  required/>
          </div>
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <div className="input-box">
            <Lock className="icon" size={18}/>
            <input type="password" placeholder="Confirm your password" required />
          </div>
        </div>
      </div>
      <div className="checkbox-terms">
        <input type="checkbox"id="terms" required/>

        <label For="terms">
          I agree to the <Link>Terms of Service</Link> and
          <Link>Privacy Policy</Link>
        </label>
      </div>
</div>

      <button className="signup-btn" type="submit">Create Account</button>

    </form>

  </div>
</div>
)
}
export default SignUp