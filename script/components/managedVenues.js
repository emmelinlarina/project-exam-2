import { getProfileVenues, deleteVenue } from "../api/venues.js";

export async function renderManagedVenues(profile) {
  if (!profile?.venueManager) return;

  const fallbackImage = "./assets/images/fallback.jpg";

  const container = document.getElementById("managedVenuesContainer");

  if (!container) return;

  container.innerHTML = `
    <p class="col-span-full text-sm text-gray-dark">
      Loading venues...
    </p>
  `;

  try {
    const response = await getProfileVenues(profile.name);
    const venues = response.data;

    if (venues.length === 0) {
      container.innerHTML = `
          <div class="col-span-full rounded-3xl border border-accent-brown bg-white p-8 text-center">
             <h3 class="text-lg font-semibold">
               You have no managed venues yet.
             </h3>
             <p class="mt-1 text-sm text-gray-dark">
               Start by creating a new venue.
             </p>
          </div>
        `;
    }

    if (venues.length > 0) {
      container.innerHTML = venues
        .map((venue) => {
          const image = venue.media?.[0]?.url || fallbackImage;

          const upcomingBookings =
            venue.bookings?.filter(
              (booking) => new Date(booking.dateFrom) > new Date(),
            ) || [];

          return `
              <article class="overflow-hidden rounded-3xl border border-accent-brown bg-white">
              <a href="./venue.html?id=${venue.id}" class="block">
                <img 
                  src="${image}" 
                  alt="${venue.name || ""}" 
                  class="w-full h-48 object-cover"
                  onerror="this.onerror=null;this.src='${fallbackImage}'"
                />

                <div class="p-5 text-gray-dark">

                  <h3 class="text-lg font-semibold">
                  ${venue.name}
                  </h3>

                  <p class="mt-1 text-sm ">
                  ${venue.location?.city}, ${venue.location?.country}
                  </p>

                  <p class="mt-3 flex items-center justify-between">
                  $${venue.price} per night
                  </p>

                  <p class="mt-3 text-sm text-gray-dark">
                  Max ${venue.maxGuests} guests
                  </p>

                </div>

                <div class="border-t border-accent-brown p-5 py-4">
                  <h4 class="font-semibold">
                    Upcoming Bookings
                  </h4>

                  ${
                    upcomingBookings.length === 0
                      ? `<p class="mt-2 text-sm text-gray-dark">No upcoming bookings.</p>`
                      : `<ul class="mt-2 text-sm text-gray-dark">
                        ${upcomingBookings
                          .map(
                            (booking) =>
                              `<li class="mb-2">
                                <p>
                                ${new Date(booking.dateFrom).toLocaleDateString()} - 
                                ${new Date(booking.dateTo).toLocaleDateString()}
                                </p>

                                <p>
                                ${booking.guests} guests${booking.guests === 1 ? "" : "s"}
                                </p>
                              </li>`,
                          )
                          .join("")}
                      </ul>`
                  }
                </div>
              </a>

              <div class="flex gap-2 px-5 pb-5">
              <a
                  href="./manage-venues.html?id=${venue.id}"
                  class="rounded-full border border-accent-brown px-4 py-2 text-sm font-semibold"
                >
                  Edit
                </a>

                <button
                  type="button"
                  data-delete-id="${venue.id}"
                  class="rounded-full border border-accent-brown px-4 py-2 text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
              </article>
            `;
        })
        .join("");
    }

    const deleteButtons = document.querySelectorAll("button[data-delete-id]");

    deleteButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        const venueId = button.getAttribute("data-delete-id");
        const venue = venues.find((venue) => venue.id === venueId);

        if (!venue) {
          alert("You are not authorized to delete this venue.");
          return;
        }

        if (venueId && confirm("Are you sure you want to delete this venue?")) {
          try {
            await deleteVenue(venueId);
            button.closest("article").remove();
            alert("Venue deleted successfully.");
          } catch (error) {
            console.error("Failed to delete venue", error);
            alert("Failed to delete venue. Please try again.");
          }
        }
      });
    });

    console.log("Managed venues", venues);
  } catch (error) {
    console.error("Failed to load managed venues", error);

    container.innerHTML = `
      <p class="col-span-full text-sm">
        Failed to load managed venues.
      </p>
        `;
  }
}
