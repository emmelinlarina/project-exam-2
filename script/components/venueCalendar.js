export function venueCalendar(venue, onDateChange) {
  const calendarContainer = document.getElementById("venue-calendar");

  let currentDate = new Date();
  let selectedCheckIn = null;
  let selectedCheckOut = null;

  function isBooked(date) {
    return venue.bookings?.some((booking) => {
      const bookingStart = new Date(booking.dateFrom);
      const bookingEnd = new Date(booking.dateTo);
      return date >= bookingStart && date < bookingEnd;
    });
  }

  function isInSelectedRange(date) {
    if (!selectedCheckIn || !selectedCheckOut) return false;

    return date > selectedCheckIn && date < selectedCheckOut;
  }

  function isRangeAvailable(startDate, endDate) {
    return !venue.bookings?.some((booking) => {
      const bookingStart = new Date(booking.dateFrom);
      const bookingEnd = new Date(booking.dateTo);

      return startDate < bookingEnd && endDate > bookingStart;
    });
  }

  function formatDate(date) {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthName = currentDate.toLocaleString("en-GB", {
      month: "long",
    });

    let daysHtml = "";

    for (let i = 0; i < firstDay; i++) {
      daysHtml += "<span class='empty-day'></span>";
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const booked = isBooked(date);
      const inSelectedRange = isInSelectedRange(date);

      const isCheckIn =
        selectedCheckIn &&
        date.toDateString() === selectedCheckIn.toDateString();

      const isCheckOut =
        selectedCheckOut &&
        date.toDateString() === selectedCheckOut.toDateString();

      const stateLabel = booked
        ? "Unavailable"
        : isCheckIn
          ? "Selected check-in"
          : isCheckOut
            ? "Selected check-out"
            : inSelectedRange
              ? "Selected range"
              : "Available";

      daysHtml += /*html*/ `
            <button
                type="button"
                class="calendar-day flex h-8 w-8 items-center justify-center rounded-full text-sm
                ${booked ? "bg-gray-light text-gray-400 cursor-not-allowed" : ""}
                ${inSelectedRange ? "bg-accent-cream" : ""}
                ${isCheckIn ? "bg-accent-blue text-white font-semibold" : ""}
                ${isCheckOut ? " border-2 border-accent-blue text-accent-blue font-semibold" : ""}
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"

                data-date="${date.toISOString()}"
                ${booked ? "disabled" : ""}
                aria-label="${date.toDateString()}, ${stateLabel}"
                aria-pressed="${isCheckIn || isCheckOut}"
            >
                ${day}
            </button>
            `;
    }

    calendarContainer.innerHTML = /*html*/ `
        <div>
            <div class="flex items-center justify-between">
                <button
                    type="button"
                    id="prev-month"
                    aria-label="Previous Month"
                    class="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-light
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                >
                    <i class="fa-solid fa-chevron-left"></i>
                </button>

                <h3 class="font-body text-base font-semibold" aria-live="polite">
                    ${monthName} ${year}
                </h3>

                <button
                    type="button"
                    id="next-month"
                    aria-label="Next Month"
                    class="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-light
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                >
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>

            <div class="mt-4 grid grid-cols-7 gap-1 text-center text-sm">
               <span>Sun</span>
               <span>Mon</span>
               <span>Tue</span>
               <span>Wed</span>
               <span>Thu</span>
               <span>Fri</span>
               <span>Sat</span>
            </div>

            <div class="mt-1 grid grid-cols-7 gap-1 text-center items-center justify-center">
                ${daysHtml}
            </div>

            <div class="mt-4 flex flex-wrap gap-x-4 gap-y-2 p-3 text-xs">
                <span class="flex items-center gap-2">
                    <span class="h-3 w-3 rounded-full bg-accent-blue"></span>
                    Check-in
                </span>
                <span class="flex items-center gap-2">
                    <span class="h-3 w-3 rounded-full border-2 border-accent-blue"></span>
                    Check-out
                </span>

                <span class="flex items-center gap-2">
                    <span class="h-3 w-3 rounded-full  bg-gray-light"></span>
                    Unavailable
                </span>
            </div>
        </div>
        `;

    document.getElementById("prev-month").addEventListener("click", () => {
      currentDate = new Date(year, month - 1, 1);
      renderCalendar();
    });

    document.getElementById("next-month").addEventListener("click", () => {
      currentDate = new Date(year, month + 1, 1);
      renderCalendar();
    });

    calendarContainer
      .querySelectorAll(".calendar-day:not(:disabled)")
      .forEach((button) => {
        button.addEventListener("click", () => {
          const selectedDate = new Date(button.dataset.date);

          if (!selectedCheckIn || selectedCheckOut) {
            selectedCheckIn = selectedDate;
            selectedCheckOut = null;
          } else if (selectedDate > selectedCheckIn) {
            if (isRangeAvailable(selectedCheckIn, selectedDate)) {
              selectedCheckOut = selectedDate;
            } else {
              selectedCheckIn = selectedDate;
              selectedCheckOut = null;
            }
          }

          updateSelectedDates();
          renderCalendar();
        });
      });
  }

  function updateSelectedDates() {
    const checkInElement = document.getElementById("selected-check-in");
    const checkOutElement = document.getElementById("selected-check-out");

    checkInElement.textContent = selectedCheckIn
      ? formatDate(selectedCheckIn)
      : "Select date";

    checkOutElement.textContent = selectedCheckOut
      ? formatDate(selectedCheckOut)
      : "Select date";

    if (onDateChange) {
      onDateChange({
        checkIn: selectedCheckIn,
        checkOut: selectedCheckOut,
      });
    }
  }

  renderCalendar();
}
