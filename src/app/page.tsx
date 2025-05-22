import TimingsList from "./components/timingsList";
import SelectLocation from "./components/selectLocation";

export default function Home() {
  return (
    <div className="mt-10 items-center justify-items-center min-h-screen p-8 pb-20">
      <SelectLocation />
      <TimingsList />
    </div>
  );
}
