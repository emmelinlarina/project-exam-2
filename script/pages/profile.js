import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";
import { requireAuth } from "../utils/guard.js";
import { updateProfile } from "../api/profiles.js";
import { setProfile } from "../utils/storage.js";
import { getProfileBookings } from "../api/bookings.js";
import { renderManagedVenues } from "../components/managedVenues.js";

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
  return /*html*/ `
    <section
      class="rounded-3xl border-2 border-gray-light bg-white overflow-hidden"
    >
      <div class="relative h-48 bg-color-gray">
        <img
          id="profile-banner"
          src="${profile.banner?.url || ""}"
          alt="Profile Banner"
          class="w-full h-full object-cover "
        />

        <div class="absolute bottom-0 mb-2 left-6">
          <div
            class="w-24 h-24 sm:h-28 sm:w-28 rounded-full overflow-hidden border-4 border-white"
          >
            <img
              id="profile-picture"
              src="${profile.avatar?.url || ""}"
              alt="Profile Picture"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <div class="absolute right-6 top-4">
          <button
            id="editProfileButton"
            class="bg-accent-blue text-white border-2 border-accent-white px-5 py-2 rounded-full text-sm font-semibold transition hover:opacity-90"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div class="p-6 pb-6 pt-16 sm:px-8 sm:pb-8">
        <h1 class="text-2xl font-bold font-body">${profile.name || ""}</h1>

        <p class="mt-2 inline-block rounded-full bg-gray-light px-3 py-1 text-sm">
          ${profile.venueManager ? "Venue Manager" : "Customer"}
        </p>

        <p 
            id="profile-bio" 
            class="mt-4 max-w-2xl text-sm text-gray-600">${profile.bio || "No bio yet"}</p>
      </div>
    </section>

    ${
      !profile.venueManager
        ? `
    <section class="mt-8">
        <div class="mb-4">
            <h2 class="text-2xl font-bold">My Bookings</h2>
            <p class="text-sm text-gray-dark">
              Your upcoming stays
            </p>
        </div>

        <div
            id="bookingsContainer"
            class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        ></div>
    </section>
    `
        : `
    <section class="mt-8">
        <div class="mb-4 flex items-center justify-between">
        <div>
            <h2 class="text-2xl font-bold">Managed Venues</h2>
            <p class="text-sm text-gray-dark">
              Your venues
            </p>
        </div>

        <button
          type="button"
          id="createVenueButton"
          class="rounded-full bg-accent-blue px-5 py-2.5 text-sm font-semibold text-white"
        >
          Create Venue
        </button>
        </div>

        <div
            id="managedVenuesContainer"
            class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        ></div>
    </section>
    `
    }

    <div
      id="editProfileModal"
      class="fixed inset-0 z-50 hidden items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="editProfileTitle"
      aria-hidden="true"
    >
      <div
        class="w-full max-w-lg rounded-3xl border-2 border-gray-light bg-white p-6 shadow-xl"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 id="editProfileTitle" class="text-xl font-semibold">
              Edit Profile
            </h2>

            <p class="mt-1 text-sm text-gray-500">
              Update your avatar and banner
            </p>
          </div>

          <button
            id="closeEditProfile"
            type="button"
            class="flex h-12 w-12 text-3xl items-center justify-center rounded-full bg-color-gray transition hover:opacity-70"
            aria-label="Close edit profile"
          >
            &times;
          </button>
        </div>

        <form id="editProfileForm" class="mt-6">

        <label for="profileBio" class="flex flex-col gap-2">
          Bio
        </label>

        <textarea
          id="profileBio"
          name="profileBio"
          rows="4"
          placeholder="Tell us about yourself"
          class="mt-2 w-full rounded-2xl border-2 border-gray-light bg-white px-4 py-3 outline-none focus:border-accent-blue focus:ring focus:ring-accent-blue/30"
        >${profile.bio || ""}</textarea>


          <label for="avatarUrl" class="flex flex-col gap-2">
            Avatar URL
          </label>

          <input
            id="avatarUrl"
            type="url"
            name="avatarUrl"
            placeholder="Avatar URL"
            class="mt-2 w-full rounded-2xl border-2 border-gray-light bg-white px-4 py-3 outline-none focus:border-accent-blue focus:ring focus:ring-accent-blue/30"
          />

          <label for="bannerUrl" class="flex flex-col gap-2">
            Banner URL
          </label>

          <input
            id="bannerUrl"
            type="url"
            name="bannerUrl"
            placeholder="Banner URL"
            class="mt-2 w-full rounded-2xl border-2 border-gray-light bg-white px-4 py-3 outline-none focus:border-accent-blue focus:ring focus:ring-accent-blue/30"
          />
          <p
            id="editProfileMessage"
            class="mt-4 invisible min-h-9 w-fit rounded-xl px-4 py-2 font-medium text-white text-sm"
            role="status"
            aria-live="polite"
          ></p>

          <div class="mt-6 flex justify-end gap-2">
            <button
              type="button"
              id="cancelEditProfile"
              class="rounded-full border-2 border-gray-light bg-white px-5 py-2.5 text-sm font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              class="rounded-full border-2 border-gray-light bg-accent-blue px-5 py-2.5 text-sm font-semibold text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function mountProfile() {
  const mount = document.getElementById("profileMount");

  if (!mount || !auth) return;

  mount.innerHTML = renderProfile(auth.profile);
}

mountProfile();

if (auth?.profile?.venueManager) {
  renderManagedVenues(auth.profile);
}

const createVenueButton = document.getElementById("createVenueButton");

if (createVenueButton) {
  createVenueButton.addEventListener("click", () => {
    window.location.href = "./manage-venues.html";
  });
}

async function loadBookings() {
  if (!auth || auth.profile.venueManager) return;

  const bookingsContainer = document.getElementById("bookingsContainer");

  bookingsContainer.innerHTML = `
    <p class="col-span-full text-sm text-gray-dark">
    Loading bookings...
    </p>    
    `;

  try {
    const response = await getProfileBookings(auth.profile.name);
    const bookings = response.data;

    const today = new Date();

    const upcomingBookings = bookings
      .filter((booking) => new Date(booking.dateFrom) >= today)
      .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

    if (upcomingBookings.length === 0) {
      bookingsContainer.innerHTML = `
      <div class="col-span-full rounded-3xl border-2 border-gray-light bg-white p-8 text-center">
        <h3 class="text-lg font-semibold">No upcoming bookings</h3>
        <p class="mt-1 text-sm text-gray-dark">Your future stays will appear here.
        </p>
      </div>
      `;
      return;
    }

    bookingsContainer.innerHTML = upcomingBookings
      .map((booking) => renderBookingCard(booking))
      .join("");
  } catch (error) {
    console.error("Failed to load bookings:", error);

    bookingsContainer.innerHTML = `
    <div class="col-span-full rounded-3xl border-2 border-gray-light bg-white p-8 text-center">
    <h3 class="font-semibold">Failed to load bookings</h3>
      <p class="mt-1 text-sm text-gray-dark">
      Please try again later.
      </p>    
    </div>
    `;
  }
}

function renderBookingCard(booking) {
  const venue = booking.venue;

  const dateFrom = new Date(booking.dateFrom).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const dateTo = new Date(booking.dateTo).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return `
    <a 
     href="./venue.html?id=${venue?.id}" 
     class="overflow-hidden rounded-3xl border-2 border-gray-light bg-white transition hover:shadow-md">
        <img 
            src="${venue?.media?.[0]?.url || "assets/images/fallback.jpg"}" 
            alt="${venue?.media?.[0]?.alt || venue?.name || "Venue"}"
            class="w-full h-48 object-cover"
            onerror="this.onerror=null; this.src='assets/images/fallback.jpg';"
        />
        <div class="p-4">
            <h3 class="text-lg font-semibold">
            ${venue?.name}
            </h3>

            <p class="text-sm text-gray-600">
            ${dateFrom} - ${dateTo}
            </p>

            <p class="mt-1 text-sm text-gray-dark">
            ${booking.guests} ${booking.guests === 1 ? "guest" : "guests"}
            </p>
        </div>
    </a>
    `;
}

loadBookings();

const editProfileButton = document.getElementById("editProfileButton");
const editProfileModal = document.getElementById("editProfileModal");
const closeEditProfile = document.getElementById("closeEditProfile");
const cancelEditProfile = document.getElementById("cancelEditProfile");

const editProfileForm = document.getElementById("editProfileForm");
const avatarUrl = document.getElementById("avatarUrl");
const bannerUrl = document.getElementById("bannerUrl");
const editProfileMessage = document.getElementById("editProfileMessage");

function showEditProfileMessage(text, type = "error") {
  editProfileMessage.textContent = text;

  editProfileMessage.classList.remove(
    "invisible",
    "bg-status-error",
    "bg-status-success",
    "bg-status-info",
  );

  if (type === "success") {
    editProfileMessage.classList.add("bg-status-success");

    setTimeout(() => {
      editProfileMessage.classList.add("invisible");
      editProfileMessage.textContent = "";
    }, 3000);
  } else if (type === "info") {
    editProfileMessage.classList.add("bg-status-info");
  } else {
    editProfileMessage.classList.add("bg-status-error");
  }
}

const profileBio = document.getElementById("profileBio");

function openEditProfile() {
  editProfileMessage.textContent = "";
  editProfileMessage.classList.add("invisible");

  avatarUrl.value = auth.profile.avatar?.url || "";
  bannerUrl.value = auth.profile.banner?.url || "";
  profileBio.value = auth.profile.bio || "";

  editProfileModal.classList.remove("hidden");
  editProfileModal.classList.add("flex");
  editProfileModal.setAttribute("aria-hidden", "false");
}

function closeEditProfileModal() {
  if (editProfileModal.contains(document.activeElement)) {
    document.activeElement.blur();
  }

  editProfileModal.classList.add("hidden");
  editProfileModal.classList.remove("flex");
  editProfileModal.setAttribute("aria-hidden", "true");

  editProfileButton.focus();
}

editProfileButton.addEventListener("click", openEditProfile);
closeEditProfile.addEventListener("click", closeEditProfileModal);
cancelEditProfile.addEventListener("click", closeEditProfileModal);

editProfileForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const avatar = avatarUrl.value.trim() || auth.profile.avatar?.url || "";
  const banner = bannerUrl.value.trim() || auth.profile.banner?.url || "";
  const bio = profileBio.value.trim();

  showEditProfileMessage("Saving changes...", "info");

  try {
    await updateProfile(auth.profile.name, {
      bio,
      avatar: { url: avatar },
      banner: { url: banner },
    });

    showEditProfileMessage("Profile updated successfully!", "success");

    const updatedProfile = {
      ...auth.profile,
      bio,
      avatar: { url: avatar },
      banner: { url: banner },
    };

    setProfile(updatedProfile);
    auth.profile = updatedProfile;

    document.getElementById("profile-picture").src = avatar;
    document.getElementById("profile-banner").src = banner;
    document.getElementById("profile-bio").textContent = bio || "No bio yet";

    editProfileForm.reset();
    profileBio.value = bio;

    closeEditProfileModal();
  } catch (error) {
    console.error("Failed to update profile", error);

    showEditProfileMessage(
      error?.message || "Failed to update profile.",
      "error",
    );
  }
});
