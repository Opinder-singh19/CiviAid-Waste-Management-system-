import "./Toast.css";

export default function Toast({

  show,
  message,
  type

}) {

  if (!show) return null;

  return (

    <div className={`toast ${type}`}>

      <div className="toast-icon">

        {type === "success"
          ? "✓"
          : type === "error"
          ? "✕"
          : "!"}

      </div>

      <div>

        <h4>

          {type === "success"
            ? "Success"
            : type === "error"
            ? "Error"
            : "Warning"}

        </h4>

        <p>
          {message}
        </p>

      </div>

    </div>
  );
}