"use client";
import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext<{
  lat: number | null;
  lng: number | null;
  setLatLng: (lat: number, lng: number) => void;
}>({
  lat: null,
  lng: null,
  setLatLng: (_lat: number, _lng: number) => {},
});

import { ReactNode } from "react";

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const setLatLng = (newLat: number, newLng: number) => {
    setLat(newLat);
    setLng(newLng);
  };
  const defaultCoords = { lat: 51.509865, lng: -0.118092 };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        (error) => {
          setLat(defaultCoords.lat);
          setLng(defaultCoords.lng);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <LocationContext.Provider value={{ lat, lng, setLatLng }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
