import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";
import { requireVenueManager } from "../utils/guard.js";
import { venueForm } from "../components/venueForm.js";
import { createVenue, getVenue, editVenue } from "../api/venues.js";

renderHeader();
renderFooter();

const profile = requireVenueManager();
const params = new URLSearchParams(window.location.search);
const venueId = params.get("id");
const isEditing = Boolean(venueId);

async function loadVenueEdit(form) {
  if (!isEditing) return;

  try {
    const response = await getVenue(venueId);
    const venue = response.data;
    if (venue.owner?.name !== profile.name) {
      window.location.href = "./profile.html";
      return;
    }

    form.elements.name.value = venue.name || "";
    form.elements.description.value = venue.description || "";
    form.elements.price.value = venue.price || "";
    form.elements.maxGuests.value = venue.maxGuests || "";
    form.elements.media.value = venue.media?.[0]?.url || "";

    form.elements.wifi.checked = venue.meta?.wifi || false;
    form.elements.parking.checked = venue.meta?.parking || false;
    form.elements.breakfast.checked = venue.meta?.breakfast || false;
    form.elements.pets.checked = venue.meta?.pets || false;

    form.elements.address.value = venue.location?.address || "";
    form.elements.city.value = venue.location?.city || "";
    form.elements.zip.value = venue.location?.zip || "";
    form.elements.country.value = venue.location?.country || "";
  } catch (error) {
    console.error("Failed to load venue", error);
  }
}

if (profile) {
  const mount = document.getElementById("manageVenuesMount");

  if (mount) {
    mount.innerHTML = /*html*/ `
            <section class="mx-auto max-w-3xl mt-6">
                <div class="mb-6">

                <h1 class="text-3xl font-bold">
                    ${isEditing ? "Edit Venue" : "Create a New Venue"}
                </h1>

                <p class="mt-1 text-sm text-gray-dark">
                    ${
                      isEditing
                        ? "Edit the details of your venue."
                        : "Add a new venue to Holidaze."
                    }
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

      function showVenueFormMessage(text, type = "error") {
        message.textContent = text;

        message.classList.remove(
          "invisible",
          "bg-status-error",
          "bg-status-success",
          "bg-status-info",
        );

        if (type === "success") {
          message.classList.add("bg-status-success");

          setTimeout(() => {
            message.classList.add("invisible");
            message.textContent = "";
          }, 3000);
        } else if (type === "info") {
          message.classList.add("bg-status-info");
        } else {
          message.classList.add("bg-status-error");
        }
      }

      const submitButton = form.querySelector('button[type="submit"]');

      if (isEditing) {
        submitButton.textContent = "Update Venue";
      }

      loadVenueEdit(form);

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
          if (isEditing) {
            showVenueFormMessage("Updating venue...", "info");
            await editVenue(venueId, venueData);
            showVenueFormMessage("Venue updated successfully!", "success");
          } else {
            showVenueFormMessage("Creating venue...", "info");
            await createVenue(venueData);
            showVenueFormMessage("Venue created successfully!", "success");
            form.reset();
          }
        } catch (error) {
          console.error("Failed to save venue:", error);
          showVenueFormMessage(
            error.message || "Failed to save venue. Please try again.",
            "error",
          );
        }
      });
    }
  }
}
