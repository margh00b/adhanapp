"use client";
import { useLocation } from "@/app/context/locationContext";
import { useState } from "react";

export default function SelectLocation() {
  const [input, setInput] = useState("");
  const { setLatLng } = useLocation();

  const handleSelect = async (address: string) => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    );
    const data = await res.json();

    if (data.status === "OK") {
      const { lat, lng } = data.results[0].geometry.location;
      setLatLng(lat, lng);
    }
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter address"
        className="w-full px-4 py-2 mb-4 rounded-md bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        className="w-full py-2 bg-gray-700 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors cursor-pointer"
        disabled={!input.trim()}
        onClick={() => handleSelect(input)}
      >
        Get Adhan Timings
      </button>
    </div>
  );
}
