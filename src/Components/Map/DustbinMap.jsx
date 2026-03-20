import L from "leaflet";
import "leaflet/dist/leaflet.css";

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
const dustbinLocations = [
  {
    id: 1,
    lat: 30.85993,
    lng: 75.86046,
    type: "green",
  },
  {
    id: 2,
    lat: 30.86007,
    lng: 75.86052,
    type: "blue",
  },
  {
    id: 3,
    lat: 30.860056,
    lng: 75.86095,
    type: "green",
  },
  {
    id: 4,
    lat: 30.859911,
    lng: 75.86095,
    type: "blue",
  },
  {
    id: 5,
    lat: 30.859999,
    lng: 75.86112,
    type: "green",
  },
  {
    id: 6,
    lat: 30.85978,
    lng: 75.86112,
    type: "blue",
  },
  {
    id: 7,
    lat: 30.860799,
    lng: 75.861106,
    type: "green",
  },
  {
    id: 9,
    lat: 30.86041,
    lng: 75.860911,
    type: "blue",
  },
  {
    id: 10,
    lat: 30.860559,
    lng: 75.860911,
    type: "green",
  },
  {
    id: 8,
    lat: 30.86065,
    lng: 75.861106,
    type: "blue",
  },
];
function Routing({ userLocation, destination }) {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {

    if (!destination || !userLocation) return;

    // remove old route
    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }

    const routingControl = L.Routing.control({
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(destination[0], destination[1]),
      ],
      lineOptions: {
        styles: [{ color: "#2563eb", weight: 4 }],
      },
      addWaypoints: false,
      draggableWaypoints: false,
      routeWhileDragging: false,
      show: false,
      createMarker: () => null,
    }).addTo(map);

    routingRef.current = routingControl;

    routingControl.on("routesfound", (e) => {
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

  }, [destination]);

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
      duration: 1
    });

  }, []);   // run only once

  return null;
}
function FollowUser({ location, active }) {
  const map = useMap();

  useEffect(() => {
    if (!location || !active) return;

    map.panTo(location);

  }, [location]);

  return null;
}
export default function DustbinMap() {
  const location = useLocation();
  const binType = location?.state?.binType || "";
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState(null);
  const [zoomTarget, setZoomTarget] = useState(null);
  const [navigationActive, setNavigationActive] = useState(false);
  const [targetDustbin, setTargetDustbin] = useState(null);
  const [distanceTravelled, setDistanceTravelled] = useState(0);
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
  // ===============================
  // 📍 Get User Location
  // ===============================
// useEffect(() => {
//   const watchId = navigator.geolocation.watchPosition(
//     (position) => {
//       const newLocation = [
//         position.coords.latitude,
//         position.coords.longitude,
//       ];

//       setUserLocation(newLocation);
      
// if (targetDustbin) {

//   const distance = getDistance(
//     newLocation[0],
//     newLocation[1],
//     targetDustbin[0],
//     targetDustbin[1]
//   );

//   setDistanceTravelled(distance);

//   if (navigationActive) {
//     setRouteCoords(targetDustbin);
//   }

//   if (distance < 0.03 && navigationActive) {
//     alert(
//       `You reached the dustbin!\nDistance travelled: ${(distance * 1000).toFixed(0)} meters.\nPlease dispose garbage properly.`
//     );

//     setNavigationActive(false);
//     setTargetDustbin(null);
//     setRouteCoords(null);
//   }
// }
//     },
//     (error) => console.error(error),
// {
//   enableHighAccuracy: true,
//   maximumAge: 5000,
//   timeout: 20000
// }
//   );

//   return () => navigator.geolocation.clearWatch(watchId);
// }, [navigationActive, targetDustbin]);
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

      const res = await fetch("http://10.86.21.161:8000/phone-location");
      const data = await res.json();

      if (data.lat && data.lng) {
        setUserLocation([data.lat, data.lng]);
      }

    } catch (err) {
      console.log(err);
    }

  }, 1000);

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

  return distance <= 2; // 1 KM radius
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
        <FollowUser location={userLocation} active={navigationActive} />
        <ResizeMap />
        {zoomTarget && <ZoomToLocation target={zoomTarget} />}
        {/* Minimal Map Style */}
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        />

        {/* 🔵 USER LOCATION */}
        <CircleMarker
          center={userLocation}
          radius={8}
          pathOptions={{
            color: "white",
            weight: 3,
            fillColor: "#2563eb",
            fillOpacity: 1,
          }}
        >
          <Popup>You are here</Popup>
        </CircleMarker>

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
    setZoomTarget([bin.lat, bin.lng]);

    // reset previous route
    setTargetDustbin(null);
    setRouteCoords(null);
  },
}}
          >
            <Popup>
              <div style={{ textAlign: "center" }}>
                <strong>{bin.type.toUpperCase()} Dustbin</strong>
                <br />
                {targetDustbin?.[0] !== bin.lat && (
<button
  className="direction-btn"
  onClick={() => {
    setTargetDustbin([bin.lat, bin.lng]);
    setRouteCoords([bin.lat, bin.lng]);
    setZoomTarget([bin.lat, bin.lng]);
  }}
>
  Get Directions
</button>
)}
              </div>
            </Popup>
          </Marker>
        ))}
        {routeCoords && (
          <Routing userLocation={userLocation} destination={routeCoords} />
        )}
      </MapContainer>
      {targetDustbin && (
  <div className="nav-panel">

    {!navigationActive && (
      <button
        className="start-route"
        onClick={() => {
  setNavigationActive(true);
  setRouteCoords(targetDustbin);
  setZoomTarget(userLocation);
}}
      >
        Start Route
      </button>
    )}

    <button
      className="cancel-route"
      onClick={() => {
  setTargetDustbin(null);
  setRouteCoords(null);
  setNavigationActive(false);
  setDistanceTravelled(0);
  
}}
    >
      Cancel
    </button>

  </div>
)}
{targetDustbin && distanceTravelled > 0 && (
  <div className="nav-info">
    Distance remaining: {(distanceTravelled * 1000).toFixed(0)} m
  </div>
)}
    </div>
  );
}
