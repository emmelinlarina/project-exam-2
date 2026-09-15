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
