import { getVenue } from "../api/venues.js";
import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";
import { renderBooking, setupBooking } from "../components/booking.js";

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
        ${renderBooking(venue)}

      </div>                     
    </div>
        `;

    setupBooking(venue);

    const mainImageElement = document.getElementById("main-image");
    const galleryButtons = document.querySelectorAll(".gallery-thumb");

    galleryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        mainImageElement.src = button.dataset.images;
        mainImageElement.alt = button.dataset.alt;
      });
    });
  } catch (error) {
    console.error("Failed to load venue details:", error);

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
            class="mt-3 inline-block text-sm text-primary 
                   hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
        >
            Go back to homepage
        </a>
    </div>
    `;
  }
}

loadVenue();
