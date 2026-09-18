import { getProfileVenues } from "../api/venues.js";

export async function renderManagedVenues(profile) {
  if (!profile?.venueManager) return;

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

    console.log("Managed venues", venues);
  } catch (error) {
    console.error("Failed to load managed venues", error);
  }
}
