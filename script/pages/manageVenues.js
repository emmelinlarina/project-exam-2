import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";
import { requireVenueManager } from "../utils/guard.js";
import { venueForm } from "../components/venueForm.js";
import { createVenue } from "../api/venues.js";

renderHeader();
renderFooter();

const profile = requireVenueManager();

if (profile) {
  const mount = document.getElementById("manageVenuesMount");

  if (mount) {
    mount.innerHTML = /*html*/ `
            <section class="mx-auto max-w-3xl">
                <div class="mb-6">

                <h1 class="text-3xl font-bold">
                    Create a New Venue
                </h1>

                <p class="mt-1 text-sm text-gray-dark">
                    Add a new venue to Holidaze.
                </p>
                </div>

                <div id="createVenueFormContainer">
                </div>
            </section>
        `;

    const formContainer = document.getElementById("createVenueFormContainer");

    if (formContainer) {
      formContainer.innerHTML = venueForm();

      const form = document.getElementById("venueForm");
      const message = document.getElementById("venueFormMessage");

      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const venueData = {
          name: formData.get("name"),
          description: formData.get("description"),
          price: Number(formData.get("price")),
          maxGuests: Number(formData.get("maxGuests")),

          media: formData.get("media")
            ? [
                {
                  url: formData.get("media"),
                  alt: formData.get("name") || "",
                },
              ]
            : [],

          meta: {
            wifi: formData.has("wifi"),
            parking: formData.has("parking"),
            breakfast: formData.has("breakfast"),
            pets: formData.has("pets"),
          },

          location: {
            address: formData.get("address"),
            city: formData.get("city"),
            zip: formData.get("zip"),
            country: formData.get("country"),
          },
        };

        console.log("Venue data:", venueData);

        try {
          message.textContent = "Creating venue...";

          const response = await createVenue(venueData);

          message.textContent = "Venue created successfully!";
          form.reset();
        } catch (error) {
          console.error("Error creating venue:", error);
          message.textContent =
            error.message || "Failed to create venue. Please try again.";
        }
      });
    }
  }
}
