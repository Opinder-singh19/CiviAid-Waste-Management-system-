import { ArrowLeft ,RecycleIcon,User,Phone,Mail,MapPin,Lock} from "lucide-react";
import './signup.css'
function SignUp(){
return(
  <div className="sign-BackC">
  <div className="Sign-container">
    <div className="Sign-icon">
      <ArrowLeft  className="sign-icon" size={30}/>
    </div>
    <div className="Sign-Back">
      <span>Back </span>
    </div>

    <div className="SignMain-logo">
      <RecycleIcon  className="Sign-up-logo" size={25}/>

    </div>
  
      <p className="signup-title">Join EcoWaste</p>
      <p clssName="signup-subtitle">Create your account and start making a difference</p>

      <form className="signup-form">

      <div className="row">
        <div className="form-group">
          <label>Full Name</label>
          <div className="input-box">
            <User className="icon" size={18}/>
            <input type="text" placeholder="Enter your full name" />
          </div>
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <div className="input-box">
            <Phone className="icon" size={18}/>
            <input type="tel" placeholder="+91 12345 67890" />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Email Address</label>
        <div className="input-box">
          <Mail className="icon" size={18}/>
          <input type="email" placeholder="your.email@example.com" />
        </div>
      </div>

      <div className="form-group">
        <label>Location</label>
        <div className="input-box">
          <MapPin className="icon" size={18}/>
          <input type="text" placeholder="City, State" />
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          <label>Password</label>
          <div className="input-box">
            <Lock className="icon" size={18}/>
            <input type="password" placeholder="Create a strong password" />
          </div>
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <div className="input-box">
            <Lock className="icon" size={18}/>
            <input type="password" placeholder="Confirm your password" />
          </div>
        </div>
      </div>

      <button type="submit">Create Account</button>

    </form>

  </div>
</div>
)
}
export default SignUp