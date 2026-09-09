export function isVenueAvailable(venue, checkIn, checkOut) {
  if (!checkIn || !checkOut) {
    return true;
  }

  const selectedCheckIn = new Date(checkIn);
  const selectedCheckOut = new Date(checkOut);

  const bookings = venue.bookings || [];

  return !bookings.some((booking) => {
    const bookingStart = new Date(booking.dateFrom);
    const bookingEnd = new Date(booking.dateTo);

    return selectedCheckIn < bookingEnd && selectedCheckOut > bookingStart;
  });
}
