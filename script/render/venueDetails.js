import { bookingConfirmModal } from "../components/bookingConfirmModal";

export function renderVenueDetails(venue) {
  const fallbackImage = "./assets/images/fallback.jpg";

  const media = venue.media?.length
    ? venue.media
    : [{ url: fallbackImage, alt: venue.name }];

  return `
     `;
}
