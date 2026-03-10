import { ArrowLeft ,RecycleIcon,User,Phone,Mail,MapPin,Lock} from "lucide-react";
import './forgotpassword.css'
import { Link } from "react-router-dom";
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

  
      <h2 className="signup-title">Forgot Password ?</h2>
      <p className="signup-subtitle">Create your account and start making a difference</p>


      <form className="signup-form">
<div className="label-input1">

      <div className="form-group">
        <label>Email Address</label>
        <div className="input-box">
          <Mail className="icon" size={18}/>
          <input type="email" placeholder="your.email@example.com" />
        </div>
      </div>

      <div className="checkbox-terms">
        <p For="terms">
          Enter the email associated with your account
        </p>
      </div>
</div>

      <button className="signup-btn" type="submit">Create Account</button>

    </form>

  </div>
</div>
)
}
export default SignUp