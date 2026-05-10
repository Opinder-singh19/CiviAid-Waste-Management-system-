import "./AdminToast.css";

export default function AdminToast({

  show,
  message,
  type

}) {

  if (!show) return null;

  return (

    <div className={`admin-toast ${type}`}>

      <div className="admin-toast-icon">

        {type === "success"
          ? "✓"
          : "!"}

      </div>

      <div>

        <h4>

          {type === "success"
            ? "Success"
            : "Error"}

        </h4>

        <p>
          {message}
        </p>

      </div>

    </div>
  );
}