import { apiFetch } from "./api-fetch.js";

export async function getVenues() {
  return apiFetch("holidaze/venues?_bookings=true");
}

export async function getVenue(id) {
  return apiFetch(`holidaze/venues/${id}?_bookings=true&_owner=true`);
}

export function searchVenues(query) {
  return apiFetch(`holidaze/venues/search?q=${encodeURIComponent(query)}`);
}

export function getProfileVenues(name) {
  return apiFetch(
    `holidaze/profiles/${encodeURIComponent(name)}/venues?_bookings=true`,
  );
}
