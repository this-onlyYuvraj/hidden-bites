"use client";
import { MapPin } from "lucide-react";

interface DirectionsButtonProps {
  destination: { lat: number; lng: number };
  label?: string;
}

export default function DirectionsButton({ destination, label }: DirectionsButtonProps) {
  const handleClick = async () => {
    let origin = "";

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          origin = `${latitude},${longitude}`;
          openMaps(origin);
        },
        () => {
          openMaps("");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      openMaps("");
    }
  };

  const openMaps = (origin: string) => {
    const { lat, lng } = destination;

    // Mobile app URL using geo scheme
    const geoUrl = origin
      ? `geo:${lat},${lng}?q=${lat},${lng}`
      : `geo:${lat},${lng}?q=${lat},${lng}`;


    const webUrl = origin
      ? `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${lat},${lng}`
      : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;


    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = geoUrl;

      setTimeout(() => {
        window.open(webUrl, "_blank");
      }, 500);
    } else {

      window.open(webUrl, "_blank");
    }
  };

  return (
    <span>
      <button
      onClick={handleClick}
      className="flex items-center bg-secondary text-secondary-foreground rounded-3xl w-38 gap-2 px-3 py-2 hover:cursor-pointer "
    >
      <MapPin size={18} />
      {label || "Get Directions"}
    </button>
    </span>
    
  );
}
