import { Mail, Lock, Shield, ArrowLeft, RecycleIcon } from "lucide-react";
import { Link ,useNavigate} from "react-router-dom";
import "./Admin.css";
import { useState } from "react";
import AdminToast
from "../../Components/Popup/AdminToast";

export default function Admin() {
const [showToast,
setShowToast]
= useState(false);

const [toastMessage,
setToastMessage]
= useState("");
const [toastType,
setToastType]
= useState("success");
  const [Counselloremail,
setEmail] = useState("");
  const [password, setPassword] = useState("");
    const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const res = await fetch("http://localhost:8000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
  Counselloremail,
  password
})
      });

const data = await res.json();

if (
  data.message ===
  "Login success"
) {

  setToastType(
    "success"
  );

  setToastMessage(
    data.message
  );

  setShowToast(true);

  setTimeout(() => {

    navigate(
      "/admin/Counsellordashboard",
      {
        replace: true
      }
    );

  }, 1500);

}

else {

  setToastType(
    "error"
  );

  setToastMessage(
    data.message
  );

  setShowToast(true);

  setTimeout(() => {

    setShowToast(false);

  }, 3000);
}
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="A-Container">
      <div className="card">
        <Link to="/" className="Back-to-user">
          <ArrowLeft size={20} />
          <span> Back </span>
        </Link>

        <div className="icon-section">
          <div className="Main-icon">
            <Shield size={40} color="white" />
          </div>
          <div className="min-icon">
            <RecycleIcon size={20} />
          </div>
        </div>

        <h1>Counsellor Portal</h1>
        <p className="min-heading">CivicAid Management</p>

       
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Admin Email</label>
            <div className="input-box">
              <Mail size={18} />
              <input
                type="email"
                placeholder="xyz@gmail.com"
                value={Counselloremail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-box">
              <Lock size={18} />
              <input
                type="password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

        

          <button className="btn" type="submit">
            Access Admin Dashboard
          </button>
        </form>
     

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

        <p className="footer">CivicAid Admin Portal v2.0 • Secured</p>
      </div>
      <AdminToast

  show={showToast}

  message={toastMessage}

  type={toastType}

/>
    </div>
  );
}