import { apiFetch } from "./api-fetch.js";

export async function getVenues() {
  return apiFetch("holidaze/venues");
}

export async function getVenue(id) {
  return apiFetch(`holidaze/venues/${id}`);
}

export function searchVenues(query) {
  return apiFetch(`holidaze/venues?search=${encodeURIComponent(query)}`);
}
