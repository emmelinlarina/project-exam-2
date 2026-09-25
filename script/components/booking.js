import { bookingConfirmModal } from "../components/bookingConfirmModal.js";
import { venueCalendar } from "./venueCalendar.js";
import { createBooking } from "../api/bookings.js";
import { getProfile } from "../utils/storage.js";

export function renderBooking(venue) {
  return /*html*/ `
        <aside 
            id="booking-card"
            class="max-w-sm mx-auto
                    rounded-3xl border-2 border-gray-light bg-white shadow-sm p-5
                    md:max-w-none 
                    md:sticky md:top-6 md:self-start
                    lg:col-span-2"
            >
            <h2 class="font-body text-xl font-semibold">Availability</h2>

            <p class="mt-2 text-base font-semibold">
                ${venue.price} $ / night
            </p>

            <div 
                id="venue-calendar"
                class="mt-4 rounded-2xl border-2 border-gray-light p-4">
            </div>
    
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
                > Guests
            </label>

            <input 
                type="number" 
                id="booking-guests" 
                min="1" 
                max="${venue.maxGuests}"
                value="1"
                inputmode="numeric"
                class="w-full rounded-xl border px-3 py-2 text-sm 
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
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
            class="col-span-2 rounded-full bg-primary text-white 
                   py-2 px-4 text-sm font-semibold hover:bg-primary-dark"
            > Book Now
        </button>

        <p 
            id="booking-message" 
            class="mt-3 text-sm"
            role="status"
            aria-live="polite">
        </p>
    </aside>

    ${bookingConfirmModal()}
    `;
}

export function setupBooking(venue) {
  let selectedCheckIn = null;
  let selectedCheckOut = null;

  venueCalendar(venue, ({ checkIn, checkOut }) => {
    selectedCheckIn = checkIn;
    selectedCheckOut = checkOut;
  });

  const guestInput = document.getElementById("booking-guests");
  const guestError = document.getElementById("guest-error");

  const reserveButton = document.getElementById("reserve-button");
  const bookingMessage = document.getElementById("booking-message");
  const profile = getProfile();

  const confirmModal = document.getElementById("booking-confirm-modal");
  const closeConfirmButton = document.getElementById("booking-confirm-close");

  const cancelConfirmButton = document.getElementById("cancel-booking-confirm");

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
    confirmCheckOut.textContent = selectedCheckOut.toLocaleDateString("en-GB");

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
}

function toBookingDate(date) {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  ).toISOString();
}
