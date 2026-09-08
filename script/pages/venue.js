import { getVenue } from "../api/venues.js";
import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";
import { venueCalendar } from "../components/venueCalendar.js";

renderHeader();
renderFooter();

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const venuePage = document.getElementById("venue");

async function loadVenue() {
  try {
    const response = await getVenue(id);
    const venue = response.data;

    const mainImage = venue.media?.[0]?.url;
    const imageAlt = venue.media?.[0]?.alt || venue.name;

    venuePage.innerHTML = /*html*/ `
        <div class="px-4 py-6 md:px-8 lg:px-12">
            <div class="grid gap-8 lg:grid-cols-[2fr_1fr]">

                <div>
                    ${
                      mainImage
                        ? `
                        <img src="${mainImage}" 
                        alt="${imageAlt}" 
                        class="w-full h-80 rounded-3xl object-cover"
                        />
                        `
                        : `
                        <div class="h-80 w-full rounded-3xl bg-gray-light"></div>
                        `
                    }

                    <div class="mt-4 grid grid-cols-3 gap-2">
                        ${
                          venue.media
                            ?.slice(1, 4)
                            .map(
                              (media) => `
                                <img src="${media.url}" 
                                alt="${media.alt || venue.name}" 
                                class="w-full h-24 rounded-xl object-cover"
                                />
                            `,
                            )
                            .join("") || ""
                        }
                    </div>

                    <div class="mt-6">
                        <div class="flex items-start justify-between gap-4">
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

                        <p class="mt-2 text-sm ">
                            ${venue.location?.city || ""}
                            ${
                              venue.location?.country
                                ? `, ${venue.location?.country}`
                                : ""
                            }
                        </p>

                        <p class="mt-2 text-sm ">
                            Up to ${venue.maxGuests} guests
                        </p>

                        <p class="mt-2 text-sm ">
                            ${venue.owner.name} is hosting
                        </p>

                    <div class="my-6 border-t pt-4">
                        <h2 class="font-body text-xl font-semibold">
                            Description
                        </h2>

                        <p class="mt-2 text-sm ">
                        ${venue.description}
                        </p>
                    </div>

                    <div class="my-6 border-t pt-4">
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
                </div>
            </div>
        </div>
            <aside 
            id="booking-card"
            class="rounded-3xl border bg-white shadow-sm p-5 lg:sticky lg:top-6 lg:self-start"
            >
            <h2 class="font-body text-xl font-semibold">
                Availability
            </h2>

            <p class="mt-2 text-sm">
                ${venue.price} $ / night
            </p>

            <div 
                id="venue-calendar"
                class="mt-4 rounded-2xl border p-4"
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
        </aside>


    </div>
        `;

    venueCalendar(venue);

    const guestInput = document.getElementById("booking-guests");
    const guestError = document.getElementById("guest-error");

    guestInput.addEventListener("input", () => {
      let guests = Number(guestInput.value);

      if (!Number.isFinite(guests)) {
        guests = 1;
      }

      if (guests < 1) {
        guestInput.value = 1;
        guestError.textContent = "At least 1 guest is required.";
        guestError.classList.remove("hidden");
        return;
      }

      if (guests > venue.maxGuests) {
        guestInput.value = venue.maxGuests;
        guestError.textContent = `Maximum ${venue.maxGuests} guests allowed.`;
        guestError.classList.remove("hidden");
        return;
      }

      guestError.textContent = "";
      guestError.classList.add("hidden");
    });
  } catch (error) {
    console.error("Error loading venue:", error);
    venuePage.innerHTML = "<p>Failed to load venue details.</p>";
  }
}

loadVenue();
