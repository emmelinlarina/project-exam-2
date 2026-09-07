import { getVenue } from "../api/venues.js";
import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";

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
            Booking Card
            </aside>


    </div>
        `;
  } catch (error) {
    console.error("Error loading venue:", error);
    venuePage.innerHTML = "<p>Failed to load venue details.</p>";
  }
}

loadVenue();
