import {
  useLocation,
  useNavigate
}
from "react-router-dom";
import "./VerifyDisposal.css";

import {
  useState,
  useRef
}
from "react";
import Webcam
from "react-webcam";

export default function VerifyDisposal(){
const webcamRef = useRef(null);

const [cameraOpen,
setCameraOpen]
= useState(false);

const [image,
setImage]
= useState(null);
  const location =
  useLocation();

  const navigate =
  useNavigate();

  const {
    dustbinName,
    distance
  } = location.state;


  const verifyWaste =
  async () => {

    const formData =
    new FormData();

    formData.append(
      "image",
      image
    );

    formData.append(
      "dustbinName",
      dustbinName
    );

    formData.append(
      "distance",
      distance
    );

    const res =
    await fetch(

      "http://civiaid-waste-management-system.onrender.com/api/activity/verify",

      {

        method: "POST",

        credentials:
        "include",

        body: formData

      }

    );
const data =
await res.json();

console.log(
"Saving popup"
);

localStorage.setItem(

"rewardPopup",

JSON.stringify({

type:
"verification",

amount:
data.reward

})

);

navigate(
"/dustbinlocation"
);
  };

  return(

<div className="verify-page">

  <div className="verify-card">

    <h1 className="verify-title">
      Verify Disposal
    </h1>

    <p className="verify-sub">
      Upload proof to earn eco coins
    </p>

    <div className="verify-info">

      <div className="verify-row">

        <span>
          Dustbin
        </span>

        <strong>
          {dustbinName}
        </strong>

      </div>

      <div className="verify-row">

        <span>
          Distance
        </span>

        <strong>

          {(distance * 1000)
          .toFixed(0)} m

        </strong>

      </div>

    </div>

    <div className="upload-box">

  <div className="upload-icon">
    📸
  </div>

  <h3>
    Upload Disposal Proof
  </h3>

  <p>
    Take a clear photo near dustbin
  </p>

 <button

className="camera-btn"

type="button"

onClick={()=>
setCameraOpen(true)
}

>

📷 Open Camera

</button>

</div>
{cameraOpen && (

<div>

<Webcam

audio={false}

ref={webcamRef}

screenshotFormat=
"image/jpeg"

width={400}

videoConstraints={{
  facingMode: "user"
}}

/>

<button

type="button"

onClick={async()=>{

const imageSrc =

webcamRef.current
.getScreenshot();


if (!imageSrc) {

alert(
"Capture failed"
);

return;

}

const blob =

await fetch(imageSrc)
.then(r=>r.blob());

const file =

new File(
[blob],
"capture.jpg",
{
type:
"image/jpeg"
}
);

setImage(file);

setCameraOpen(false);

}}

>

Capture Photo

</button>

</div>

)}
{image && (

<img

src=
{URL.createObjectURL(image)}

width="200"

/>

)}
    <button

      className="verify-btn"

      onClick={verifyWaste}

      disabled={!image}

    >

      Verify & Earn Coins

    </button>

  </div>

</div>

);
}