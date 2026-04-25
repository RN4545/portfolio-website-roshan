"use client";
import { useEffect, useState } from "react";

export default function NoiseOverlay() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show on non-touch (desktop) devices
    if (!window.matchMedia("(pointer: coarse)").matches) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return <div className="noise-overlay" />;
}