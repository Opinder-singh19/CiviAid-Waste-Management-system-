import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import PanoramaViewer from "../Panorama/PanoramaViewer";
import { dustbinLocations } from "../../data/Dustbins";
// VERY IMPORTANT ↓
window.L = L;
import { useEffect, useState, useMemo, useRef } from "react";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import { useEffect, useState, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Marker,
  Popup,
  
} from "react-leaflet";
import { useMap } from "react-leaflet";
import { useLocation } from "react-router-dom";

// ===============================
// 🟢🔵 ASSIGN YOUR DUSTBINS HERE
// ===============================

function Routing({ userLocation, destination }) {
  const map = useMap();
  const routingRef = useRef(null);
 

useEffect(() => {
  if (!destination || !userLocation) return;

  if (routingRef.current) {
    map.removeControl(routingRef.current);
    routingRef.current = null;
  }

  const control = L.Routing.control({
    router: L.Routing.osrmv1({
      serviceUrl: "https://router.project-osrm.org/route/v1",
    }),
    waypoints: [
      L.latLng(userLocation[0], userLocation[1]),
      L.latLng(destination[0], destination[1]),
    ],
    lineOptions: {
      styles: [{ color: "#2563eb", weight: 5 }],
    },
    addWaypoints: false,
    draggableWaypoints: false,
    routeWhileDragging: false,
    show: false,
    createMarker: () => null,
  }).addTo(map);

  routingRef.current = control;

  // 🔥 AUTO ZOOM TO ROUTE
  control.on("routesfound", (e) => {
    const route = e.routes[0];
    const bounds = L.latLngBounds(route.coordinates);

    map.fitBounds(bounds, {
      padding: [50, 50],
    });
  });

  return () => {
    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }
  };

}, [userLocation, destination]);
  return null;
}
function ResizeMap() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);

  return null;
}

// ===============================
// 📏 Distance Calculator (Haversine)
// ===============================
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // KM
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// ===============================
// 🎨 Create Dustbin Icon
// ===============================
const createUserIcon = (heading = 0) => {
  return L.divIcon({
    html: `
      <div style="
        transform: rotate(${heading}deg);
        font-size: 24px;
      ">
        ➤
      </div>
    `,
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};
const createDustbinIcon = (color) => {
  const size = 28;
  const iconSize = 14;

  return new L.DivIcon({
    html: `
      <div style="
        position: relative;
        width:${size}px;
        height:${size}px;
        display:flex;
        flex-direction:column;
        align-items:center;
      ">
        
        <div style="
          width:${size}px;
          height:${size}px;
          background:${color};
          border-radius:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow:0 4px 10px rgba(0,0,0,0.25);
        ">
        
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            width="${iconSize}"
            height="${iconSize}"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6l-1 14H6L5 6"></path>
            <path d="M10 11v6"></path>
            <path d="M14 11v6"></path>
            <path d="M9 6V4h6v2"></path>
          </svg>

        </div>

        <div style="
          width:0;
          height:0;
          border-left:10px solid transparent;
          border-right:10px solid transparent;
          border-top:10px solid ${color};
          margin-top:-2px;
        "></div>

      </div>
    `,
    className: "",
    iconSize: [size, size + 10],
    iconAnchor: [size / 2, size + 10],
  });
};

function ZoomToLocation({ target }) {
  const map = useMap();

useEffect(() => {
  if (!target) return;

  map.flyTo(target, 17, {
    animate: true,
    duration: 1.2
  });

}, [target]); // ✅ FIX  // run only once

  return null;
}
function FollowUser({ location, active }) {
  const map = useMap();

  useEffect(() => {
    if (!location || !active) return;

    map.flyTo(location, map.getZoom(), {
      animate: true,
      duration: 0.8,
    });

  }, [location, active]);

  return null;
}
function LocateButton({ userLocation }) {
  const map = useMap();

  const handleClick = () => {
    if (!userLocation) return;

    map.flyTo(userLocation, 17, {
      animate: true,
      duration: 1.5,
    });
  };

  return (
<button
  onClick={handleClick}
  style={{
    position: "absolute",
    bottom: "100px",
    right: "20px",
    zIndex: 1000,
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "none",
    background: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="#2563eb"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="6" />
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
  </svg>
</button>
  );
}
function Compass({ heading }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        zIndex: 1000,
        width: "70px",
        height: "70px",
        borderRadius: "50%",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "50px",
          height: "50px",
          transform: `rotate(${heading}deg)`
        }}
      >
        {/* Arrow */}
        <div style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "18px",
          color: "red"
        }}>
          ▲
        </div>

        {/* Directions */}
        <div style={{ position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)", fontSize: "10px" }}>N</div>
        <div style={{ position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)", fontSize: "10px" }}>S</div>
        <div style={{ position: "absolute", left: "0", top: "50%", transform: "translateY(-50%)", fontSize: "10px" }}>W</div>
        <div style={{ position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)", fontSize: "10px" }}>E</div>
      </div>
    </div>
  );
}
export default function DustbinMap({
  setSelectedDustbin,
  setRouteFromParent,
  setImageFromParent,
  isRouting,   
  setIsRouting
}){
   useEffect(() => {
  if (!isRouting) {
    setTargetDustbin(null);
    setRouteCoords([]);
  }
}, [isRouting]);
  const [heading, setHeading] = useState(0);
const [autoFollow, setAutoFollow] = useState(true);
const prevLocation = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation();
  const binType = location?.state?.binType || "";
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState(null);
  const [zoomTarget, setZoomTarget] = useState(null);
  const [navigationActive, setNavigationActive] = useState(false);
  const [targetDustbin, setTargetDustbin] = useState(null);
  const [distanceTravelled, setDistanceTravelled] = useState(0);
  const sortedBins = useMemo(() => {
  if (!userLocation) return [];

  return dustbinLocations
    .map((bin) => ({
      ...bin,
      distance: getDistance(
        userLocation[0],
        userLocation[1],
        bin.lat,
        bin.lng
      ),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5); // optional
}, [userLocation]);
useEffect(() => {
  if (setRouteFromParent) {
    setRouteFromParent(() => (coords) => {
      setTargetDustbin(coords);
      setRouteCoords(coords);
      setZoomTarget(coords);
    });
  }

  if (setImageFromParent) {
    setImageFromParent(() => (img) => {
      setSelectedImage(img);
    });
  }

}, []);
  useEffect(() => {
  if (!userLocation) return;

  // zoom to the user area when map loads
  setZoomTarget(userLocation);

}, [userLocation]);

  const openDirections = (destLat, destLng) => {
    if (!userLocation) return;

    const origin = `${userLocation[0]},${userLocation[1]}`;
    const destination = `${destLat},${destLng}`;

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;

    window.open(url, "_blank");
  };
  // Get User Location
useEffect(() => {

  if (!userLocation || !targetDustbin) return;

  const distance = getDistance(
    userLocation[0],
    userLocation[1],
    targetDustbin[0],
    targetDustbin[1]
  );

  setDistanceTravelled(distance);

  if (distance < 0.01 && navigationActive) {
    alert(
      `You reached the dustbin!\nDistance travelled: ${(distance * 1000).toFixed(0)} meters.\nPlease dispose garbage properly.`
    );

    setNavigationActive(false);
    setTargetDustbin(null);
    setRouteCoords(null);
  }

}, [userLocation, targetDustbin, navigationActive]);
useEffect(() => {

  const interval = setInterval(async () => {

    try {

      const res = await fetch("http://192.168.1.99:8000/phone-location");
      const data = await res.json();

      if (data.lat && data.lng) {

        // 🔥 CALCULATE DIRECTION (heading)
        if (prevLocation.current) {
  const dx = data.lng - prevLocation.current[1];
  const dy = data.lat - prevLocation.current[0];

  const latDiff = Math.abs(dy);
  const lngDiff = Math.abs(dx);

  // ❌ ignore tiny movement
  if (latDiff < 0.00005 && lngDiff < 0.00005) return;

  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  setHeading(prev => prev + (angle - prev) * 0.2); // smooth
}

        // store current location for next calculation
        prevLocation.current = [data.lat, data.lng];

        // 🔥 OPTIMIZED LOCATION UPDATE
        setUserLocation(prev => {
  if (!prev) return [data.lat, data.lng];

  const latDiff = Math.abs(data.lat - prev[0]);
  const lngDiff = Math.abs(data.lng - prev[1]);

  // 🔥 Ignore tiny GPS noise
if (latDiff < 0.00005 && lngDiff < 0.00005) {
  return prev;
}

  return [data.lat, data.lng];
});

      }

    } catch (err) {
      console.log(err);
    }

  }, 2000);

  return () => clearInterval(interval);

}, []);

  // ===============================
  // 🚀 Filter Bins Within 1KM
  // ===============================
  const nearbyBins = useMemo(() => {
    if (!userLocation) return [];

return dustbinLocations.filter((bin) => {

  if (binType && bin.type !== binType) return false;

  const distance = getDistance(
    userLocation[0],
    userLocation[1],
    bin.lat,
    bin.lng
  );

  return distance <= 2000; // 1 KM radius
});
  }, [userLocation, binType]);

  if (!userLocation) {
    return <p>Getting your location...</p>;
  }

  return (
    <div className="map-wrapper">
      <MapContainer
        center={userLocation}
        zoom={14}
        maxZoom={18}
        zoomControl={true}
        className="map-container"
      >
<Compass heading={heading} userLocation={userLocation} />
        <LocateButton userLocation={userLocation} />
<FollowUser 
  location={userLocation} 
  active={autoFollow && !navigationActive} 
/>   
 <ResizeMap />
        {zoomTarget && <ZoomToLocation target={zoomTarget} />}
        {/* Minimal Map Style */}
        <TileLayer
  attribution="© OpenStreetMap"
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

        {/* 🔵 USER LOCATION */}
        <Marker
  position={userLocation}
  icon={createUserIcon(heading)}
>
  <Popup>You are here</Popup>
</Marker>

        {/* 🟢🔵 NEARBY DUSTBINS ONLY */}
        {nearbyBins.map((bin) => (
          <Marker
            key={bin.id}
            position={[bin.lat, bin.lng]}
            icon={createDustbinIcon(
              bin.type === "green" ? "#16a34a" : "#2563eb",
            )}
            eventHandlers={{
  click: () => {
    if (!userLocation) return;

    const distance = getDistance(
      userLocation[0],
      userLocation[1],
      bin.lat,
      bin.lng
    );

    setSelectedDustbin({
      ...bin,
      distance, // ✅ ADD THIS
    });
  },
}}
          >
          </Marker>
        ))}
        {routeCoords && (
          <Routing userLocation={userLocation} destination={routeCoords} />
        )}
      </MapContainer>
      <button
  onClick={() => setAutoFollow(!autoFollow)}
  style={{
    position: "absolute",
    bottom: "160px",
    right: "20px",
    zIndex: 1000,
    padding: "10px",
    background: autoFollow ? "#16a34a" : "#aaa",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  {autoFollow ? "Follow ON" : "Follow OFF"}
</button>
      {selectedImage && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.85)",
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {/* Close Button */}
    <button
      onClick={() => setSelectedImage(null)}
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        padding: "8px 14px",
        background: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Close ✖
    </button>

    {/* Image */}
    <img
      src={selectedImage}
      alt="Dustbin Location"
      style={{
        width: "80%",
        maxHeight: "80%",
        objectFit: "contain",
        borderRadius: "10px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      }}
    />
  </div>
)}
    </div>
  );
}
