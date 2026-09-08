export function venueCalendar(venue) {
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

      const isCheckIn =
        selectedCheckIn &&
        date.toDateString() === selectedCheckIn.toDateString();

      const isCheckOut =
        selectedCheckOut &&
        date.toDateString() === selectedCheckOut.toDateString();

      daysHtml += `
            <button
                type="button"
                class="calendar-day h-8 w-8 rounded-full text-sm
                ${booked ? "bg-gray-light text-gray-400 cursor-not-allowed" : ""}
                ${isCheckIn || isCheckOut ? "bg-accent-blue text-white" : ""}"
                data-date="${date.toISOString()}"
                ${booked ? "disabled" : ""}
                aria-label="${date.toDateString()}"
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
                    class="h-8 w-8"
                >
                    <i class="fa-solid fa-chevron-left"></i>
                </button>

                <h3 class="font-semibold">
                    ${monthName} ${year}
                </h3>

                <button
                    type="button"
                    id="next-month"
                    aria-label="Next Month"
                    class="h-8 w-8"
                >
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>

            <div class="mt-4 grid grid-cols-7 gap-1 text-center text-xs">
               <span>Sun</span>
               <span>Mon</span>
               <span>Tue</span>
               <span>Wed</span>
               <span>Thu</span>
               <span>Fri</span>
               <span>Sat</span>
            </div>

            <div class="mt-2 grid grid-cols-7 gap-1 text-center">
                ${daysHtml}
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
            selectedCheckOut = selectedDate;
          } else {
            selectedCheckIn = selectedDate;
            selectedCheckOut = null;
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
  }

  renderCalendar();
}
