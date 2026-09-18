import { apiFetch } from "./api-fetch.js";

export async function createBooking({ dateFrom, dateTo, guests, venueId }) {
  return apiFetch("holidaze/bookings", {
    method: "POST",
    body: JSON.stringify({
      dateFrom,
      dateTo,
      guests,
      venueId,
    }),
  });
}

export function getProfileBookings(name) {
  return apiFetch(
    `holidaze/profiles/${encodeURIComponent(name)}/bookings?_venue=true`,
  );
}
