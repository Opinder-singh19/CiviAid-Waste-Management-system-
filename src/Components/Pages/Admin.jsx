import { Mail, Lock, Shield, ArrowLeft,RecycleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import "./Admin.css"
export default function Admin() {
  return (
   <div className="Container">
    <div className="card">
      <Link to="/" className="Back-to-user">
        <ArrowLeft size={20}/> 
        <span> Back  </span>
      </Link>
    
    <div className="icon-section">
      <div className="Main-icon">
        <Shield size={30} color="white"/>
      </div>
      <div className="min-icon">
        <RecycleIcon size={20}/>

      </div>

    </div>
    <h1>Admin Portal</h1>
    <p className="min-heading"> Secure CivicAid Management</p>
    <div className="secure">
      <Shield size={20}/>
      <span> Adminstrative Access</span>

    </div>
    <div className="input-group">
      <label >Admin Email</label>
      <div className="input-box">
        <Mail Size={18}/>
        <input type="Email"  placeholder="xyz@gmail.com"/>
         </div>
    </div>
    <div className="input-group">
      <label >Password</label>
      <div className="input-box">
        <Lock Size={18}/>
        <input type="password"  placeholder=" Admin password"/>
         </div>
    </div>

    <div className="input-group">
      <label >Admin Key</label>
      <div className="input-box">
        <Shield Size={18}/>
        <input type="text"  placeholder=" Enter key here"/>
         </div>
         
    </div>
    <button className="btn"> Access Adimin Dashboard </button>
    <div className="notice">
          <div className="notice-title">
            <Shield size={16} />
            Security Notice
          </div>
          <p>
            This is a secure administrative portal. All login attempts are
            monitored and logged for security purposes.
          </p>
        </div>

        <p className="footer">♻ EcoWaste Admin Portal v2.0 • Secured</p>

      


  </div>
</div>
   
  );
}