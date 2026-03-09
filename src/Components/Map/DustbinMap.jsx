import L from "leaflet";
import "leaflet/dist/leaflet.css";

// VERY IMPORTANT ↓
window.L = L;

import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useEffect, useState, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Marker,
  Popup,
} from "react-leaflet";
import { useMap } from "react-leaflet";

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

  useEffect(() => {
    if (!destination) return;

    const routingControl = L.Routing.control({
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
      createMarker: () => null,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [destination, map, userLocation]);

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
  const R = 1; // KM
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
  const iconSize = 30; // 🔥 smaller size
  const innerSize = 16;

  return new L.DivIcon({
    html: `
      <div style="
        width:${iconSize}px;
        height:${iconSize}px;
        background:${color};
        border-radius:10px;
        display:flex;
        align-items:center;
        justify-content:center;
        box-shadow:0 4px 10px rgba(0,0,0,0.18);
      ">
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          width="${innerSize}"
          height="${innerSize}"
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
    `,
    className: "",
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize / 2, iconSize / 2],
  });
};

function ZoomToLocation({ target }) {
  const map = useMap();

  useEffect(() => {
    if (!target) return;

    map.flyTo(target, 18, {
      duration: 1.2, // smooth animation
    });
  }, [target, map]);

  return null;
}
export default function DustbinMap() {
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState(null);
  const [zoomTarget, setZoomTarget] = useState(null);

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
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 10000,
      },
    );
  }, []);

  // ===============================
  // 🚀 Filter Bins Within 1KM
  // ===============================
  const nearbyBins = useMemo(() => {
    if (!userLocation) return [];

    return dustbinLocations.filter((bin) => {
      const distance = getDistance(
        userLocation[0],
        userLocation[1],
        bin.lat,
        bin.lng,
      );
      return distance <= 10000; // 1 KM radius only
    });
  }, [userLocation]);

  if (!userLocation) {
    return <p>Getting your location...</p>;
  }

  return (
    <div className="map-wrapper">
      <MapContainer
        center={userLocation}
        maxZoom={19}
        zoom={18}
        zoomControl={true}
        className="map-container"
      >
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
              },
            }}
          >
            <Popup>
              <div style={{ textAlign: "center" }}>
                <strong>{bin.type.toUpperCase()} Dustbin</strong>
                <br />
                <button
                  className="direction-btn"
                  onClick={() => {
                    setZoomTarget([bin.lat, bin.lng]);
                    setRouteCoords([bin.lat, bin.lng]);
                  }}
                >
                  Get Directions
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
        {routeCoords && (
          <Routing userLocation={userLocation} destination={routeCoords} />
        )}
      </MapContainer>
    </div>
  );
}
