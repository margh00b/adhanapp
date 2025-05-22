export async function fetchTimings(lat: number, lng: number) {
  const timingData = await fetch(
    `https://alislam.org/adhan/api/timings/day?lat=${lat}&lng=${lng}`
  );
  return timingData.json();
}
