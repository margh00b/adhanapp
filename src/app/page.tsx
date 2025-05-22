import Image from "next/image";
import TimingsList from "./components/timingsList";
import SelectLocation from "./components/selectLocation";
import { LocationProvider } from "./context/locationContext";

export default function Home() {
  return (
    <div className="mt-10 items-center justify-items-center min-h-screen p-8 pb-20">
      <SelectLocation />
      <TimingsList />
    </div>
  );
}
