"use client";

import { useEffect, useState } from "react";
import { fetchTimings } from "../utils/fetchTimings";
import { timeConversion } from "../utils/timeConversion";
import { useLocation } from "../context/locationContext";

const TimingsList = () => {
  const { lat, lng } = useLocation();
  interface Prayer {
    name: string;
    time: string;
  }

  const [timings, setTimings] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mapSrc, setMapSrc] = useState(``);

  useEffect(() => {
    const fetchTimingsData = async () => {
      if (lat !== null && lng !== null) {
        try {
          setError("");
          setLoading(true);
          setMapSrc(
            `https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&center=${lat},${lng}&zoom=15&maptype=roadmap`
          );

          const data = await fetchTimings(lat, lng);
          const prayers = data?.multiDayTimings?.[0]?.prayers;

          if (Array.isArray(prayers)) {
            setTimings(prayers);
          } else {
            setError("No prayer timings found.");
          }
        } catch (error) {
          setError("Failed to load timings.");
          console.log(error);
        } finally {
          setLoading(false);
        }
      } else {
        setError("Location coordinates are not available.");
        setLoading(false);
        setTimings([]);
      }
    };

    fetchTimingsData();
  }, [lat, lng]);

  if (loading)
    return (
      <p className="text-center mt-6 text-gray-300">Loading prayer times...</p>
    );

  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  const sunrise = timings.find((t) => t.name === "Sunrise");
  const sunset = timings.find((t) => t.name === "Sunset");
  const prayers = timings.filter(
    (t) => t.name !== "Sunrise" && t.name !== "Sunset"
  );

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 rounded-xl shadow-lg text-gray-200 font-sans">
      <div className="w-full h-48 rounded-lg overflow-hidden mb-6 border-2 border-gray-700">
        <iframe
          title="Current Location Map"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          src={mapSrc}
          className="filter brightness-90"
        ></iframe>
      </div>

      <h2 className="text-3xl font-semibold mb-6 text-center tracking-wide">
        Today&apos;s Prayer Times
      </h2>

      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <ul>
          {sunrise && (
            <li className="flex justify-between items-center">
              <span>🌅 Sunrise</span>
              <span className="font-mono">
                {timeConversion(Number(sunrise.time))}
              </span>
            </li>
          )}
          {sunset && (
            <li className="flex justify-between items-center">
              <span>🌇 Sunset</span>
              <span className="font-mono">
                {timeConversion(Number(sunset.time))}
              </span>
            </li>
          )}
        </ul>
      </div>

      <ul className="space-y-3">
        {prayers.map((prayer) => (
          <li
            key={prayer.name}
            className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700 transition"
          >
            <span className="font-medium">{prayer.name}</span>
            <span className="font-mono">
              {timeConversion(Number(prayer.time))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimingsList;
