import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";
import { requireAuth } from "../utils/guard.js";

renderHeader();
renderFooter();

const auth = requireAuth();

if (auth) {
  const profile = auth.profile;
  const isVenueManager = profile.venueManager === true;

  console.log("Profile user", auth.profile);
  console.log("Is venue manager", isVenueManager);
}

function renderProfile(profile) {
  return `
        <section class="rounded-3xl border border-accent-brown bg-white overflow-hidden">
            <div class="relative h-36 bg-color-gray sm:h-44">
            <img 
                id="profile-banner"
                src="${profile.banner?.url || ""}"
                alt="Profile Banner"
                class="w-full h-full object-cover"
            />

            <div class="absolute bottom-0 left-6">
                <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                    <img 
                        id="profile-picture"
                        src="${profile.avatar?.url || ""}"
                        alt="Profile Picture"
                        class="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div class="absolute right-6 top-4">
                <button class="bg-accent-blue text-white px-4 py-2 rounded-lg">
                    Edit Profile
                </button>
            </div>
            </div>

            <div class="p-6 pb-6 pt-14">
                <h1 class="text-2xl font-bold">
                ${profile.name || ""}
                </h1>

                <p class="mt-1 text-sm text-gray-500">
                ${profile.venueManager ? "Venue Manager" : "Customer"}
                </p>

                <p class="text-gray-600">
                ${profile.bio || "No bio yet"}
                </p>
            </div>
        </section>
    `;
}

function mountProfile() {
  const mount = document.getElementById("profileMount");

  if (!mount || !auth) return;

  mount.innerHTML = renderProfile(auth.profile);
}

mountProfile();
