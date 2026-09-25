import { getVenue } from "../api/venues.js";
import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";
import { venueCalendar } from "../components/venueCalendar.js";
import { bookingConfirmModal } from "../components/bookingConfirmModal.js";
import { createBooking } from "../api/bookings.js";
import { getProfile } from "../utils/storage.js";

renderHeader();
renderFooter();

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const venuePage = document.getElementById("venue");

async function loadVenue() {
  venuePage.innerHTML = `
    <p class="px-4 py-10 text-center" role="status">
    Loading venue...
    </p>
    `;

  try {
    const response = await getVenue(id);
    const venue = response.data;
    const fallbackImage = "./assets/images/fallback.jpg";
    const media = venue.media?.length
      ? venue.media
      : [{ url: fallbackImage, alt: venue.name }];

    venuePage.innerHTML = /*html*/ `
        <div class="px-4 py-6 md:px-8 lg:px-12">

            <div class="mx-auto max-w-5xl grid grid-cols-1 gap-8
                        md:grid-cols-2 md:gap-18 lg:grid-cols-5"
            >
            <div class="lg:col-span-3">

                <div>
                    <img
                        id="main-image"
                        src="${media?.[0]?.url}" 
                        alt="${media?.[0]?.alt || venue.name}" 
                        class="w-full h-60 object-cover sm:h-72 lg:h-80"
                        onerror="this.onerror=null;this.src='${fallbackImage}'"
                    />
                  

                 ${
                   media.length > 1
                     ? `
                    <div class="mt-1 grid grid-cols-3 gap-1">
                      ${media
                        .slice(0, 3)
                        .map(
                          (item, index) => `
                              <button 
                                type="button"
                                class="gallery-thumb h-28 overflow-hidden
                                       focus:outline-none focus:ring-2 
                                       focus:ring-offset-2 focus:ring-accent-blue"
                                data-images="${item.url}"
                                data-alt="${item.alt || venue.name}"
                                aria-label="View image ${index + 1}"
                                >
                                <img
                                  src="${item.url}"
                                  alt="${item.alt || venue.name}"
                                  class="w-full h-full object-cover
                                         transition-transform duration-300
                                         hover:scale-105"
                                  onerror="this.onerror=null;this.src='${fallbackImage}'"
                                />
                              </button>
                            `,
                        )
                        .join("")} 
                      
                    </div>
                    `
                     : ""
                 }
              </div>

              <!-- VENUE INFO --> 
                  <div class="mt-6">

                    <div class="flex flex-col gap-2 sm:flex-row  sm:items-start sm:gap-4 justify-between">

                      <div>
                          <h1 class="font-body text-2xl font-semibold">
                              ${venue.name}
                          </h1>                   
        
                            <p class="mt-2 text-sm ">
                                ★ ${venue.rating}
                            </p>
                        </div>

                        <p class="font-semibold text-secondary">
                            ${venue.price} $ / night
                        </p>
                    </div>

                    <div class="mt-2 flex flex-wrap items-center gap-4 text-sm">
                    <p>
                      <i class="fa-solid fa-location-dot mr-1"></i>
                        ${venue.location?.city || ""}
                        ${
                          venue.location?.country
                            ? `, ${venue.location?.country}`
                            : ""
                        }
                    </p>

                    <p>
                      <i class="fa-solid fa-user-group mr-1"></i>
                        Up to ${venue.maxGuests} guests
                    </p>
                    </div>

                    

                    

                    <div class="my-6 border-t border-gray-light pt-4">
                        <h2 class="font-body text-xl font-semibold">
                            Description
                        </h2>

                        <p class="mt-2 text-sm ">
                        ${venue.description}
                        </p>
                        
                        
                    </div>
                  

                    <div class="my-6 border-t border-gray-300 pt-4">
                        <h2 class="font-body text-xl font-semibold">
                            Amenities
                        </h2>

                        <div class="mt-3 flex flex-wrap gap-2">
                            ${
                              venue.meta?.wifi
                                ? `<span class="rounded-full bg-gray-light px-3 py-2 text-sm">
                                WiFi
                                    </span>`
                                : ""
                            }

                            ${
                              venue.meta?.parking
                                ? `<span class="rounded-full bg-gray-light px-3 py-2 text-sm">
                                Parking
                                    </span>`
                                : ""
                            }

                            ${
                              venue.meta?.breakfast
                                ? `<span class="rounded-full bg-gray-light px-3 py-2 text-sm">
                                Breakfast
                                    </span>`
                                : ""
                            }

                            ${
                              venue.meta?.pets
                                ? `<span class="rounded-full bg-gray-light px-3 py-2 text-sm">
                                Pets allowed
                                    </span>`
                                : ""
                            }
                    </div>
                    <div class="my-6 border-t border-gray-300 pt-4">
                    <p class="mt-2 text-sm font-bold">
                        ${venue.owner.name} is hosting
                    </p>
                          </div>
                </div>
            </div>
        </div>
        

        <!-- BOOKING CARD -->
            <aside 
              id="booking-card"
              class="max-w-sm mx-auto
                     rounded-3xl border-2 border-gray-light bg-white shadow-sm p-5
                     md:max-w-none 
                     md:sticky md:top-6 md:self-start
                     lg:col-span-2"
              >

              <h2 class="font-body text-xl font-semibold">
                  Availability
              </h2>

              <p class="mt-2 text-base font-semibold">
                  ${venue.price} $ / night
              </p>

              <div 
                  id="venue-calendar"
                  class="mt-4 rounded-2xl border-2 border-gray-light p-4"
            ></div>
        

            <div class="mt-4 grid grid-cols-2 gap-2">
                <div class="rounded-xl bg-gray-light p-3">
                    <p class="text-xs">Check in</p>
                    <p 
                    id="selected-check-in" 
                    class="text-sm font-semibold" 
                    aria-live="polite">
                        Select date
                    </p>
                </div>

                <div class="rounded-xl bg-gray-light p-3">
                    <p class="text-xs">Check out</p>
                    <p 
                    id="selected-check-out" 
                    class="text-sm font-semibold" 
                    aria-live="polite">
                        Select date
                    </p>
                </div>
            </div>

            <div class="mt-3 mb-3">
                <label
                for="booking-guests"
                class="mb-1 block text-xs font-medium"
                >
                Guests
                </label>

                <input 
                type="number" 
                id="booking-guests" 
                min="1" 
                max="${venue.maxGuests}"
                value="1"
                inputmode="numeric"
                class="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                />

                <p
                id="guest-error"
                class="mt-1 hidden text-xs text-status-error"
                aria-live="polite"
                ></p>
            </div>

            <button 
              id="reserve-button"
              type="button"
              class="col-span-2 rounded-full bg-primary text-white py-2 px-4 text-sm font-semibold hover:bg-primary-dark"
              >
              Book Now
            </button>

            <p 
            id="booking-message" 
            class="mt-3 text-sm"
            role="status"
            aria-live="polite">
        </p>
        </aside>

        ${bookingConfirmModal()}

      </div>                     
    </div>
        `;

    let selectedCheckIn = null;
    let selectedCheckOut = null;

    venueCalendar(venue, ({ checkIn, checkOut }) => {
      selectedCheckIn = checkIn;
      selectedCheckOut = checkOut;
    });

    const mainImageElement = document.getElementById("main-image");
    const galleryButtons = document.querySelectorAll(".gallery-thumb");

    galleryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        mainImageElement.src = button.dataset.images;
        mainImageElement.alt = button.dataset.alt;
      });
    });

    const guestInput = document.getElementById("booking-guests");
    const guestError = document.getElementById("guest-error");

    const reserveButton = document.getElementById("reserve-button");
    const bookingMessage = document.getElementById("booking-message");
    const profile = getProfile();

    const confirmModal = document.getElementById("booking-confirm-modal");
    const closeConfirmButton = document.getElementById("booking-confirm-close");

    const cancelConfirmButton = document.getElementById(
      "cancel-booking-confirm",
    );

    const confirmBookingButton = document.getElementById(
      "confirm-booking-button",
    );

    const confirmCheckIn = document.getElementById("confirm-checkin");
    const confirmCheckOut = document.getElementById("confirm-checkout");
    const confirmGuests = document.getElementById("confirm-guests");
    const confirmTotal = document.getElementById("confirm-total");

    function closeConfirmModal() {
      confirmModal.classList.add("hidden");
      confirmModal.classList.remove("flex");
      confirmModal.setAttribute("aria-hidden", "true");

      reserveButton.focus();
    }

    closeConfirmButton.addEventListener("click", closeConfirmModal);
    cancelConfirmButton.addEventListener("click", closeConfirmModal);

    if (!profile) {
      reserveButton.textContent = "Log in to book";
    }

    reserveButton.addEventListener("click", () => {
      if (!profile) {
        window.location.href = "./login.html";
        return;
      }
      const guests = Number(guestInput.value);

      if (!selectedCheckIn || !selectedCheckOut) {
        bookingMessage.textContent =
          "Please select check-in and check-out dates.";
        return;
      }

      if (guests < 1 || guests > venue.maxGuests) {
        bookingMessage.textContent = `Number of guests must be between 1 and ${venue.maxGuests}.`;
        return;
      }

      const nights = Math.round(
        (selectedCheckOut - selectedCheckIn) / (1000 * 60 * 60 * 24),
      );

      confirmCheckIn.textContent = selectedCheckIn.toLocaleDateString("en-GB");
      confirmCheckOut.textContent =
        selectedCheckOut.toLocaleDateString("en-GB");

      confirmGuests.textContent = guests;
      confirmTotal.textContent = `$${nights * venue.price}`;

      confirmModal.classList.remove("hidden");
      confirmModal.classList.add("flex");
      confirmModal.setAttribute("aria-hidden", "false");

      closeConfirmButton.focus();
    });

    confirmBookingButton.addEventListener("click", async () => {
      const guests = Number(guestInput.value);

      try {
        confirmBookingButton.disabled = true;
        confirmBookingButton.textContent = "Booking...";

        await createBooking({
          dateFrom: toBookingDate(selectedCheckIn),
          dateTo: toBookingDate(selectedCheckOut),
          guests: guests,
          venueId: venue.id,
        });

        closeConfirmModal();

        bookingMessage.textContent = "Booked!";
      } catch (error) {
        console.error("Booking failed:", error);
        bookingMessage.textContent = "Booking failed. Please try again.";
      } finally {
        confirmBookingButton.disabled = false;
        confirmBookingButton.textContent = "Confirm Booking";
      }
    });

    guestInput.addEventListener("input", () => {
      const guests = Number(guestInput.value);

      if (guestInput.value === "") {
        guestError.textContent = "";
        guestError.classList.add("hidden");
        return;
      }

      if (guests < 1) {
        guestError.textContent = "At least 1 guest is required.";
        guestError.classList.remove("hidden");
        return;
      }

      if (guests > venue.maxGuests) {
        guestError.textContent = `Maximum ${venue.maxGuests} guests allowed.`;
        guestError.classList.remove("hidden");
        return;
      }

      guestError.textContent = "";
      guestError.classList.add("hidden");
    });
  } catch (error) {
    console.error("Error loading venue:", error);

    venuePage.innerHTML = /*html*/ `
    <div 
        class="px-4 py-10 text-center" 
        role="alert"
        >
        <p class="font-semibold">
            Failed to load venue details.
        </p>

        <a
            href="./index.html"
            class="mt-3 inline-block text-sm text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
        >
            Go back to homepage
        </a>
    </div>
    `;
  }
}

function toBookingDate(date) {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  ).toISOString();
}

loadVenue();
