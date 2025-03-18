const KEY = "AIzaSyASh5WfOEaVTSJEvMF66lPJbLtr5DQhJKM";

export function getMapPreview(lat, lng) {
  const coords = lat + "," + lng;
  const google_url = `https://maps.googleapis.com/maps/api/staticmap?`;
  const center = "center=" + coords;
  const config = "&zoom=14&size=400x200&maptype=roadmap";
  const markers = "&markers=color:red%7Clabel:C%7C" + coords;
  const api_key = "&key=" + KEY;
  const url = google_url + center + config + markers + api_key;
  return url;
}

export async function getAddress(lat, lng) {
  const coords = lat + "," + lng;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords}&key=${KEY}`;

  const response = await fetch(url);

  if (!response.ok) throw new Error("Failed fetch");

  const data = await response.json();
  return data.results[0].formatted_address;
}
