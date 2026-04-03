import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";

export default function PanoramaViewer({ image }) {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!image) return;

    const viewer = new Viewer({
      container: viewerRef.current,
      panorama: image,
      navbar: ["zoom", "fullscreen"],
    });

    return () => viewer.destroy();
  }, [image]);

  return (
    <div
      ref={viewerRef}
      style={{
        width: "100%",
        height: "400px",
        background: "black"
      }}
    />
  );
}