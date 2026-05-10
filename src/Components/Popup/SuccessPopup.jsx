import "./SuccessPopup.css";

export default function SuccessPopup({
  message,
  show,
}) {

  if (!show) return null;

  return (

    <div className="success-overlay">

      <div className="success-popup">

        <div className="success-icon">
          ✓
        </div>

        <h2>
          Complaint Submitted
        </h2>

        <p>
          {message}
        </p>

        

      </div>

    </div>
  );
}