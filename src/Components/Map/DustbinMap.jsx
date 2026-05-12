import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { dustbinLocations } from "../../data/Dustbins";
window.L = L;
import { useEffect, useState, useMemo, useRef } from "react";
import "leaflet-routing-machine";

import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Marker,
  Popup,
} from "react-leaflet";
import { useMap } from "react-leaflet";
import { useLocation, useNavigate } from "react-router-dom";

function Routing({ userLocation, destination }) {
  const map = useMap();
  const routingRef = useRef(null);
  const hasFitBounds = useRef(false);

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

    let hasCentered = false;

    control.on("routesfound", (e) => {
      if (hasFitBounds.current) return;

      hasFitBounds.current = true;
      if (!userLocation) return;
      const route = e.routes[0];
      const bounds = L.latLngBounds(route.coordinates);

      map.fitBounds(bounds, {
        padding: [50, 50],
      });
    });

    return () => {
      hasFitBounds.current = false;
      if (routingRef.current) {
        map.removeControl(routingRef.current);
        routingRef.current = null;
      }
    };
  }, [
    destination,
    Math.round(userLocation?.[0] * 1000),
    Math.round(userLocation?.[1] * 1000),
  ]);
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
const createIdleUserIcon = () => {
  return L.divIcon({
    html: `
      <div style="
        width:18px;
        height:18px;
        background:#2563eb;
        border:4px solid white;
        border-radius:50%;
        box-shadow:0 0 12px rgba(37,99,235,0.5);
      "></div>
    `,
    className: "",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
};
const createDustbinIcon = (color, size = 28) => {
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
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

function ZoomToLocation({ target }) {
  const map = useMap();

  useEffect(() => {
    if (!target) return;

    map.flyTo(target, 17, {
      animate: true,
      duration: 1.2,
    });
  }, [target]);

  return null;
}
function FollowUser({ location, active }) {
  const map = useMap();

  useEffect(() => {
    if (!location || !active) return;

    map.panTo(location, {
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
        bottom: "20px",
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
        top: "5px",
        right: "5px",
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
          transform: `rotate(${heading}deg)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "18px",
            color: "red",
          }}
        >
          ▲
        </div>

        <div
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "10px",
          }}
        >
          N
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "10px",
          }}
        >
          S
        </div>
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "10px",
          }}
        >
          W
        </div>
        <div
          style={{
            position: "absolute",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "10px",
          }}
        >
          E
        </div>
      </div>
    </div>
  );
}
export default function DustbinMap({
  setSelectedDustbin,
  setRouteFromParent,
  setImageFromParent,
  isRouting,
  setIsRouting,
  onSelectLocation,
  focusedDustbin,
  setFocusedDustbin,
}) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPos, setSelectedPos] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [reachedDustbin, setReachedDustbin] = useState(false);

  const [proofImage, setProofImage] = useState(null);

  const [verifyLoading, setVerifyLoading] = useState(false);
  const searchLocation = async (text) => {
    setSearchText(text);

    if (text.length < 3) {
      setSearchResults([]);
      return;
    }

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${text}`,
    );

    const data = await res.json();
    setSearchResults(data);
  };
  const selectSearchLocation = (place) => {
    const lat = parseFloat(place.lat);
    const lng = parseFloat(place.lon);

    const pos = [lat, lng];

    setSelectedPos(pos);
    setSearchResults([]);
    setSearchText(place.display_name);
    setSelectedAddress(place.display_name);

    onSelectLocation({
      address,
      lat,
      lng,
    });
  };
  useEffect(() => {
    if (focusedDustbin) {
      setZoomTarget([focusedDustbin.lat, focusedDustbin.lng]);
    }
  }, [focusedDustbin]);
  useEffect(() => {
    if (!isRouting) {
      setTargetDustbin(null);
      setRouteCoords([]);
    }
  }, [isRouting]);
  const verifyDisposal = async () => {
    if (!proofImage) {
      alert("Upload proof image");

      return;
    }

    setVerifyLoading(true);

    const formData = new FormData();

    formData.append("image", proofImage);

    formData.append("dustbinName", currentDustbin.name);

    formData.append("distance", (distanceTravelled * 1000).toFixed(0));

    const res = await fetch(
      "http://localhost:8000/api/activity/verify",

      {
        method: "POST",

        credentials: "include",

        body: formData,
      },
    );

    const data = await res.json();

    alert(
      `${data.message}
    +${data.reward || 0}
    coins`,
    );

    setVerifyLoading(false);

    setReachedDustbin(false);

    setTargetDustbin(null);

    setRouteCoords(null);

    setNavigationActive(false);
  };
  const [heading, setHeading] = useState(0);
  const [autoFollow, setAutoFollow] = useState(true);
  const prevLocation = useRef(null);
  const [currentDustbin, setCurrentDustbin] = useState(null);
  const routeLocation = useLocation();
  const binType = routeLocation?.state?.binType || "";
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState(null);
  const [zoomTarget, setZoomTarget] = useState(null);
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
          bin.lng,
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
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

  const openDirections = (destLat, destLng) => {
    if (!userLocation) return;

    const origin = `${userLocation[0]},${userLocation[1]}`;
    const destination = `${destLat},${destLng}`;

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;

    window.open(url, "_blank");
  };

  useEffect(() => {
    if (!userLocation || !targetDustbin) return;

    const distance = getDistance(
      userLocation[0],
      userLocation[1],
      targetDustbin[0],
      targetDustbin[1],
    );

    setDistanceTravelled(distance);
    if (isRouting && !reachedDustbin) {
      setReachedDustbin(true);
      
      navigate(
        "/verify-disposal",

        {
          state: {
           dustbinName:
  dustbinLocations.find(
    (bin) =>
      bin.lat === targetDustbin[0] &&
      bin.lng === targetDustbin[1]
  )?.name || "Unknown Dustbin",

            distance: distance,
          },
        },
      );

    }
  }, [userLocation, targetDustbin]);
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setUserLocation((prev) => {
          if (!prev) return [lat, lng];

          const latDiff = Math.abs(lat - prev[0]);
          const lngDiff = Math.abs(lng - prev[1]);
          if (latDiff < 0.000001 && lngDiff < 0.000001) {
            return prev;
          }

          return [lat, lng];
        });
      },
      (err) => console.log(err),
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://localhost:8000/phone-location");
        const data = await res.json();

        if (data.lat && data.lng) {
          setUserLocation([data.lat, data.lng]);
          if (prevLocation.current) {
            const dx = data.lng - prevLocation.current[1];
            const dy = data.lat - prevLocation.current[0];

            const latDiff = Math.abs(dy);
            const lngDiff = Math.abs(dx);

            if (latDiff < 0.000001 && lngDiff < 0.000001) return;

            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            setHeading((prev) => prev + (angle - prev) * 0.2);
          }
          prevLocation.current = [data.lat, data.lng];

          if (!userLocation && data.lat && data.lng) {
            setUserLocation([data.lat, data.lng]);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  const nearbyBins = useMemo(() => {
    if (!userLocation) return [];

    return dustbinLocations.filter((bin) => {
      if (binType && bin.type !== binType) return false;

      const distance = getDistance(
        userLocation[0],
        userLocation[1],
        bin.lat,
        bin.lng,
      );

      return distance <= 2000;
    });
  }, [userLocation, binType]);

  if (!userLocation) {
    return <p>Getting your location...</p>;
  }
  function MapClickHandler({ onSelectLocation }) {
    const map = useMap();

    useEffect(() => {
      if (!onSelectLocation) return;

      const handleClick = async (e) => {

  const lat = e.latlng.lat;
  const lng = e.latlng.lng;

  try {

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );

    const data = await res.json();

    const address =
      data.display_name || `${lat}, ${lng}`;

    onSelectLocation({
      address,
      lat,
      lng,
    });

  }

  catch (err) {

    console.log(err);

    onSelectLocation({
      address: `${lat}, ${lng}`,
      lat,
      lng,
    });

  }

};

      map.on("click", handleClick);

      return () => map.off("click", handleClick);
    }, [map, onSelectLocation]);

    return null;
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
        {onSelectLocation && (
          <MapClickHandler onSelectLocation={onSelectLocation} />
        )}
        <Compass heading={heading} userLocation={userLocation} />
        <LocateButton userLocation={userLocation} />
        <FollowUser location={userLocation} active={isRouting} />
        <ResizeMap />
        {zoomTarget && <ZoomToLocation target={zoomTarget} />}
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={userLocation}
          icon={isRouting ? createUserIcon(heading) : createIdleUserIcon()}
        >
          <Popup>You are here</Popup>
        </Marker>

        {(focusedDustbin ? [focusedDustbin] : nearbyBins).map((bin) => (
          <Marker
            key={`${bin.id}-${binType}`}
            position={[bin.lat, bin.lng]}
            icon={createDustbinIcon(
              bin.type === "green"
                ? "#16a34a"
                : bin.type === "blue"
                  ? "#2563eb"
                  : "#000000",
              focusedDustbin?.id === bin.id ? 42 : 28,
            )}
            eventHandlers={{
              click: () => {
                if (!userLocation) return;

                const distance = getDistance(
                  userLocation[0],
                  userLocation[1],
                  bin.lat,
                  bin.lng,
                );

                setSelectedDustbin({
                  ...bin,
                  distance,
                });
                setCurrentDustbin(bin);
              },
            }}
          ></Marker>
        ))}
        {/* {routeCoords && (
          <Routing userLocation={userLocation} destination={routeCoords} />
        )} */}
      </MapContainer>
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
